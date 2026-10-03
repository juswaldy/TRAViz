import { z } from 'zod';

const id = z.uuid();
const sourceSchema = z.object({
  id, label: z.string().min(1).max(200), language: z.string().max(40),
  direction: z.enum(['ltr', 'rtl']), color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});
const rowSchema = z.object({
  id, label: z.string().max(200),
  cells: z.array(z.object({ sourceId: id, text: z.string().max(20_000).nullable(), reference: z.string().max(300) })).max(12),
});
export const documentSchema = z.object({
  id, title: z.string().min(1).max(300), notes: z.string().max(10_000),
  sources: z.array(sourceSchema).min(1).max(12),
  rows: z.array(rowSchema).min(1).max(100),
  settings: z.object({ rtl: z.boolean(), normalize: z.boolean(), mainSourceId: id, hiddenSourceIds: z.array(id).max(12) }),
  snapshots: z.array(z.object({ sourceId: id, text: z.string().max(20_000), createdAt: z.iso.datetime() })).max(120),
}).superRefine((document, context) => {
  const sources = new Set(document.sources.map((source) => source.id));
  const fail = (message: string) => context.addIssue({ code: 'custom', message });
  if (sources.size !== document.sources.length) fail('Source IDs must be unique.');
  if (new Set(document.rows.map((row) => row.id)).size !== document.rows.length) fail('Row IDs must be unique.');
  if (!sources.has(document.settings.mainSourceId)) fail('The main branch must belong to this comparison.');
  if (new Set(document.settings.hiddenSourceIds).size !== document.settings.hiddenSourceIds.length ||
      document.settings.hiddenSourceIds.some((sourceId) => !sources.has(sourceId))) fail('Hidden sources must be unique members of this comparison.');
  for (const row of document.rows) {
    const cells = new Set(row.cells.map((cell) => cell.sourceId));
    if (cells.size !== sources.size || cells.size !== row.cells.length || [...cells].some((sourceId) => !sources.has(sourceId))) {
      fail('Each row must contain exactly one cell for every source.');
    }
  }
  if (document.rows.reduce((total, row) => total + row.cells.reduce((sum, cell) => sum + (cell.text?.length ?? 0), 0), 0) > 200_000) {
    fail('A comparison can contain at most 200,000 text characters.');
  }
});

export type Comparison = z.infer<typeof documentSchema>;
export type Source = Comparison['sources'][number];
export type Row = Comparison['rows'][number];
export type SavedComparison = { document: Comparison; revision: number; createdAt: string; updatedAt: string };
export type Summary = { id: string; title: string; updatedAt: string; sourceCount: number; rowCount: number };
export const colors = ['#28645b', '#a44c39', '#555ea1', '#946b17', '#7a487f', '#276a97'];

export function newRow(sources: Source[]): Row {
  return { id: crypto.randomUUID(), label: '', cells: sources.map((source) => ({ sourceId: source.id, text: '', reference: '' })) };
}

export function newComparison(): Comparison {
  const sources: Source[] = [0, 1].map((index) => ({
    id: crypto.randomUUID(), label: `Source ${index + 1}`, language: 'und', direction: 'ltr', color: colors[index],
  }));
  return { id: crypto.randomUUID(), title: 'Untitled comparison', notes: '', sources,
    rows: [newRow(sources)], settings: { rtl: false, normalize: false, mainSourceId: sources[0].id, hiddenSourceIds: [] }, snapshots: [] };
}

// Splitting is explicit. The exact original strings (including separators) remain
// available in immutable snapshots; missing cells never shift another source.
export function splitPassages(document: Comparison): Comparison {
  if (document.rows.length !== 1) throw new Error('Split whole passages before adding more rows.');
  const cells = document.rows[0].cells;
  const parts = cells.map((cell) => cell.text === null ? [] : cell.text.split(/\r\n|\n|\r/));
  const count = Math.max(1, ...parts.map((part) => part.length));
  if (count > 100) throw new Error('Split into at most 100 rows at a time.');
  const createdAt = new Date().toISOString();
  return documentSchema.parse({ ...document,
    snapshots: [...document.snapshots, ...cells.filter((cell) => cell.text !== null).map((cell) => ({ sourceId: cell.sourceId, text: cell.text!, createdAt }))],
    rows: Array.from({ length: count }, (_, position) => ({ id: crypto.randomUUID(), label: '',
      cells: cells.map((cell, index) => ({ ...cell, text: parts[index][position] ?? null })),
    })),
  });
}
