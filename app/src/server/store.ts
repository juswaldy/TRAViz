import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { documentSchema, type Comparison, type SavedComparison, type Source, type Row, type Summary } from '../shared/document.js';

export class StoreError extends Error {
  constructor(public statusCode: number, message: string) { super(message); }
}

export class Store {
  private db: DatabaseSync;
  constructor(filename: string, migrations = resolve('migrations')) {
    if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true });
    this.db = new DatabaseSync(filename);
    this.db.exec('PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL;');
    this.db.exec('CREATE TABLE IF NOT EXISTS migrations (name TEXT PRIMARY KEY) STRICT');
    for (const name of readdirSync(migrations).filter((name) => name.endsWith('.sql')).sort()) {
      if (this.db.prepare('SELECT name FROM migrations WHERE name = ?').get(name)) continue;
      this.transaction(() => {
        this.db.exec(readFileSync(resolve(migrations, name), 'utf8'));
        this.db.prepare('INSERT INTO migrations (name) VALUES (?)').run(name);
      });
    }
  }
  close() { this.db.close(); }
  private transaction<T>(operation: () => T): T {
    this.db.exec('BEGIN IMMEDIATE');
    try { const result = operation(); this.db.exec('COMMIT'); return result; }
    catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  list(query = ''): Summary[] {
    return this.db.prepare(`SELECT c.id, c.title, c.updated_at AS updatedAt,
      (SELECT count(*) FROM sources WHERE comparison_id = c.id) AS sourceCount,
      (SELECT count(*) FROM parallel_rows WHERE comparison_id = c.id) AS rowCount
      FROM comparisons c WHERE instr(lower(c.title), lower(?)) > 0 ORDER BY c.updated_at DESC LIMIT 200`).all(query) as Summary[];
  }
  get(id: string): SavedComparison {
    const record = this.db.prepare('SELECT * FROM comparisons WHERE id = ?').get(id);
    if (!record) throw new StoreError(404, 'Comparison not found.');
    const sources = this.db.prepare('SELECT id, label, language, direction, color FROM sources WHERE comparison_id = ? ORDER BY position').all(id) as Source[];
    const rows = this.db.prepare('SELECT id, label FROM parallel_rows WHERE comparison_id = ? ORDER BY position').all(id).map((row) => ({
      ...row,
      cells: this.db.prepare(`SELECT c.source_id AS sourceId, c.text, c.reference FROM cells c
        JOIN sources s ON s.comparison_id = c.comparison_id AND s.id = c.source_id
        WHERE c.comparison_id = ? AND c.row_id = ? ORDER BY s.position`).all(id, row.id),
    })) as Row[];
    return { document: documentSchema.parse({ id, title: record.title, notes: record.notes, sources, rows,
      settings: JSON.parse(record.settings as string), snapshots: JSON.parse(record.snapshots as string) }),
      revision: Number(record.revision), createdAt: record.created_at as string, updatedAt: record.updated_at as string };
  }
  save(input: Comparison, expectedRevision: number): SavedComparison {
    const document = documentSchema.parse(input);
    return this.transaction(() => {
      const existing = this.db.prepare('SELECT revision FROM comparisons WHERE id = ?').get(document.id);
      if ((existing ? Number(existing.revision) : 0) !== expectedRevision) {
        throw new StoreError(409, 'This comparison changed in another tab. Your draft is preserved; reopen the saved version to resolve the conflict.');
      }
      if (existing) {
        const previous = this.get(document.id).document.snapshots;
        if (JSON.stringify(document.snapshots.slice(0, previous.length)) !== JSON.stringify(previous)) {
          throw new StoreError(400, 'Original entry snapshots cannot be changed or removed.');
        }
      }
      const now = new Date().toISOString();
      this.db.prepare(`INSERT INTO comparisons (id, title, notes, settings, snapshots, revision, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET
        title=excluded.title, notes=excluded.notes, settings=excluded.settings, snapshots=excluded.snapshots,
        revision=excluded.revision, updated_at=excluded.updated_at`).run(
        document.id, document.title, document.notes, JSON.stringify(document.settings), JSON.stringify(document.snapshots), expectedRevision + 1, now, now);
      this.db.prepare('DELETE FROM parallel_rows WHERE comparison_id = ?').run(document.id);
      this.db.prepare('DELETE FROM sources WHERE comparison_id = ?').run(document.id);
      const sourceInsert = this.db.prepare('INSERT INTO sources VALUES (?, ?, ?, ?, ?, ?, ?)');
      document.sources.forEach((source, position) => sourceInsert.run(document.id, source.id, position, source.label, source.language, source.direction, source.color));
      const rowInsert = this.db.prepare('INSERT INTO parallel_rows VALUES (?, ?, ?, ?)');
      const cellInsert = this.db.prepare('INSERT INTO cells VALUES (?, ?, ?, ?, ?)');
      document.rows.forEach((row, position) => {
        rowInsert.run(document.id, row.id, position, row.label);
        row.cells.forEach((cell) => cellInsert.run(document.id, row.id, cell.sourceId, cell.text, cell.reference));
      });
      return this.get(document.id);
    });
  }
  delete(id: string, expectedRevision: number) {
    this.transaction(() => {
      const existing = this.get(id);
      if (existing.revision !== expectedRevision) throw new StoreError(409, 'The saved comparison changed. Reopen it before deleting.');
      this.db.prepare('DELETE FROM comparisons WHERE id = ?').run(id);
    });
  }
}
