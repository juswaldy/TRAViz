import { resolve } from 'node:path';
import { createApp } from './app.js';
import { Store } from './store.js';

const app = await createApp(new Store(process.env.TRAVIZ_DATABASE ?? resolve('data/parallels.sqlite')), resolve('dist/client'));
await app.listen({ host: '127.0.0.1', port: 3001 });
console.log('TRAViz is available at http://127.0.0.1:3001');
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => void app.close());
