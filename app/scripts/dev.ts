import { resolve } from 'node:path';
import { createServer } from 'vite';
import { createApp } from '../src/server/app.js';
import { Store } from '../src/server/store.js';

const api = await createApp(new Store(process.env.TRAVIZ_DATABASE ?? resolve('data/parallels.sqlite')));
await api.listen({ host: '127.0.0.1', port: 3001 });
const client = await createServer();
await client.listen();
client.printUrls();
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, async () => { await client.close(); await api.close(); });
