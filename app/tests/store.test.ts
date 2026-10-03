import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { newComparison, splitPassages } from '../src/shared/document.js';
import { Store } from '../src/server/store.js';
import { createApp } from '../src/server/app.js';

test('Unicode, missing cells, order, and settings survive a database restart', () => {
  const directory = mkdtempSync(join(tmpdir(), 'traviz-store-'));
  const filename = join(directory, 'test.sqlite');
  let store = new Store(filename);
  try {
    const document = newComparison();
    document.title = 'Psalm 14 / Greek quotation';
    document.rows[0].cells[0] = { ...document.rows[0].cells[0], text: '  בְּרֵאשִׁית ־ ׃\nλόγος & <word>  ', reference: 'Psalm 14:1' };
    document.rows[0].cells[1].text = null;
    document.settings.rtl = true;
    const first = store.save(document, 0);
    assert.equal(first.revision, 1);
    document.sources.reverse();
    document.rows[0].cells.reverse();
    document.rows.push({ id: crypto.randomUUID(), label: 'Empty cells', cells: document.sources.map((source) => ({ sourceId: source.id, text: '', reference: '' })) });
    const second = store.save(document, 1);
    assert.equal(second.revision, 2);
    store.close();
    store = new Store(filename);
    assert.deepEqual(store.get(document.id).document, document);
    assert.equal(store.list('Psalm')[0].rowCount, 2);
    assert.throws(() => store.save({ ...document, title: 'Stale' }, 1), /changed in another tab/);
    assert.equal(store.get(document.id).document.title, document.title);
    assert.throws(() => store.delete(document.id, 1), /changed/);
    store.delete(document.id, 2);
    assert.equal(store.list().length, 0);
  } finally { store.close(); rmSync(directory, { recursive: true }); }
});

test('a failure during child insertion rolls back the whole document and revision', () => {
  const directory = mkdtempSync(join(tmpdir(), 'traviz-rollback-'));
  const filename = join(directory, 'test.sqlite');
  const store = new Store(filename);
  const connection = new DatabaseSync(filename);
  try {
    const document = newComparison();
    const saved = store.save(document, 0);
    connection.exec(`CREATE TRIGGER reject_test_cell BEFORE INSERT ON cells
      WHEN NEW.reference = 'FAIL' BEGIN SELECT RAISE(ABORT, 'simulated write failure'); END;`);
    document.title = 'Must roll back';
    document.rows[0].cells[1].reference = 'FAIL';
    assert.throws(() => store.save(document, 1), /simulated write failure/);
    assert.deepEqual(store.get(document.id), saved);
    assert.throws(() => connection.prepare('INSERT INTO cells VALUES (?, ?, ?, ?, ?)').run(document.id, document.rows[0].id, crypto.randomUUID(), 'bad', ''), /FOREIGN KEY/);
  } finally { connection.close(); store.close(); rmSync(directory, { recursive: true }); }
});

test('line splitting preserves empty lines, missing cells, references, and exact originals', () => {
  const document = newComparison();
  document.rows[0].cells[0].text = 'שָׁלוֹם\r\n\r\nλόγος\n';
  document.rows[0].cells[0].reference = 'A range';
  document.rows[0].cells[1].text = 'one';
  const split = splitPassages(document);
  assert.equal(split.rows.length, 4);
  assert.deepEqual(split.rows.map((row) => row.cells[0].text), ['שָׁלוֹם', '', 'λόγος', '']);
  assert.deepEqual(split.rows.map((row) => row.cells[1].text), ['one', null, null, null]);
  assert.equal(split.snapshots[0].text, document.rows[0].cells[0].text);
  assert.ok(split.rows.every((row) => row.cells[0].reference === 'A range'));
  assert.equal(document.rows.length, 1);
  const store = new Store(':memory:');
  try {
    store.save(split, 0);
    assert.throws(() => store.save({ ...split, snapshots: [] }, 1), /cannot be changed/);
  } finally { store.close(); }
});

test('API validates identities, handles revisions, and rejects nonlocal browser writes', async () => {
  const app = await createApp(new Store(':memory:'));
  try {
    const document = newComparison();
    const invalid = structuredClone(document);
    invalid.rows[0].cells[0].sourceId = crypto.randomUUID();
    assert.equal((await app.inject({ method: 'POST', url: '/api/parallels', payload: invalid })).statusCode, 400);
    assert.deepEqual((await app.inject('/api/parallels')).json(), []);
    assert.equal((await app.inject({ method: 'POST', url: '/api/parallels', payload: document, headers: { origin: 'https://unrelated.example' } })).statusCode, 403);
    assert.equal((await app.inject({ method: 'GET', url: '/api/parallels', headers: { host: 'attacker.example' } })).statusCode, 403);
    assert.equal((await app.inject({ method: 'POST', url: '/api/parallels', headers: { 'content-type': 'text/plain' }, payload: '{}' })).statusCode, 415);
    const created = await app.inject({ method: 'POST', url: '/api/parallels', payload: document });
    assert.equal(created.statusCode, 201);
    assert.equal(created.json().revision, 1);
    assert.equal((await app.inject({ method: 'POST', url: '/api/parallels', payload: document })).statusCode, 409);
    const updated = await app.inject({ method: 'PUT', url: `/api/parallels/${document.id}`, payload: { document, expectedRevision: 1 } });
    assert.equal(updated.statusCode, 200);
    assert.equal(updated.json().revision, 2);
    assert.equal((await app.inject({ method: 'PUT', url: `/api/parallels/${document.id}`, payload: { document, expectedRevision: 1 } })).statusCode, 409);
    assert.equal((await app.inject({ method: 'DELETE', url: `/api/parallels/${document.id}`, payload: { expectedRevision: 2 } })).statusCode, 204);
    assert.equal((await app.inject(`/api/parallels/${document.id}`)).statusCode, 404);
  } finally { await app.close(); }
});
