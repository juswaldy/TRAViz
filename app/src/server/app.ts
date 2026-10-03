import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { z } from 'zod';
import { documentSchema } from '../shared/document.js';
import { Store, StoreError } from './store.js';

export async function createApp(store: Store, clientRoot?: string) {
  const app = Fastify({ bodyLimit: 4 * 1024 * 1024 });
  app.addHook('onRequest', async (request, reply) => {
    const host = request.headers.host ?? '';
    if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host)) return reply.code(403).send({ message: 'Local requests only.' });
    if (request.headers.origin && !/^http:\/\/(127\.0\.0\.1|localhost):(3001|5173)$/.test(request.headers.origin)) {
      return reply.code(403).send({ message: 'Origin not allowed.' });
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method) && !/^application\/json(?:;|$)/i.test(request.headers['content-type'] ?? '')) {
      return reply.code(415).send({ message: 'Writes require application/json.' });
    }
  });
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof z.ZodError) return reply.code(400).send({ message: error.issues.map((issue) => `${issue.path.join('.') || 'Comparison'}: ${issue.message}`).join('\n') });
    if (error instanceof StoreError) return reply.code(error.statusCode).send({ message: error.message });
    const status = (error as { statusCode?: number }).statusCode;
    if (status && status >= 400 && status < 500) return reply.code(status).send({ message: (error as Error).message });
    app.log.error(error);
    return reply.code(500).send({ message: 'The operation failed. Your local draft has not been discarded.' });
  });
  app.get('/api/health', async () => ({ status: 'ok' }));
  app.get('/api/parallels', async (request) => {
    const { q } = z.object({ q: z.string().max(300).default('') }).parse(request.query);
    return store.list(q);
  });
  app.post('/api/parallels', async (request, reply) => {
    const document = documentSchema.parse(request.body);
    return reply.code(201).send(store.save(document, 0));
  });
  app.get('/api/parallels/:id', async (request) => store.get(z.object({ id: z.uuid() }).parse(request.params).id));
  app.put('/api/parallels/:id', async (request) => {
    const { id } = z.object({ id: z.uuid() }).parse(request.params);
    const { document, expectedRevision } = z.object({ document: documentSchema, expectedRevision: z.int().positive() }).parse(request.body);
    if (document.id !== id) throw new StoreError(400, 'Document ID does not match the URL.');
    store.get(id);
    return store.save(document, expectedRevision);
  });
  app.delete('/api/parallels/:id', async (request, reply) => {
    const { id } = z.object({ id: z.uuid() }).parse(request.params);
    const { expectedRevision } = z.object({ expectedRevision: z.int().positive() }).parse(request.body);
    store.delete(id, expectedRevision);
    return reply.code(204).send();
  });
  if (clientRoot) await app.register(fastifyStatic, { root: clientRoot });
  app.addHook('onClose', async () => store.close());
  return app;
}
