import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const app = fileURLToPath(new URL('..', import.meta.url));
const root = resolve(app, '..');
const output = resolve(app, 'public/generated');
const files = ['lib/jquery.min.js', 'lib/jquery.qtip.min.js', 'lib/raphael.js',
  'js/TRAVizConnection.js', 'js/TRAVizGraph.js', 'js/TRAVizAligner.js', 'js/TRAViz.js', 'js/TRAVizConfig.js'];
await mkdir(output, { recursive: true });
const parts = await Promise.all(files.map((file) => readFile(resolve(root, file), 'utf8')));
await writeFile(resolve(output, 'traviz.js'), parts.join('\n').replaceAll('REPLACEME-REPLACEME', 'traviz'));
await cp(resolve(root, 'traviz.css'), resolve(output, 'traviz.css'));
await cp(resolve(root, 'images'), resolve(output, 'images'), { recursive: true });
await cp(resolve(app, 'src/frame'), output, { recursive: true });
console.log('Built local TRAViz assets from sources.');
