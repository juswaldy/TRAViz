import { useState } from 'react';
import type { Comparison } from '../shared/document';

export function GraphPreview({ document, rowId }: { document: Comparison; rowId: string }) {
  const [height, setHeight] = useState(360);
  return <iframe title="TRAViz alignment" src="/generated/preview.html" style={{ height }} onLoad={(event) => {
    const frame = event.currentTarget;
    const win = frame.contentWindow as Window & { renderComparison?: (input: unknown) => void };
    const row = document.rows.find((row) => row.id === rowId);
    if (!row || !win.renderComparison) return;
    win.renderComparison({ ...document.settings,
      sources: document.sources.filter((source) => !document.settings.hiddenSourceIds.includes(source.id))
        .map((source) => ({ ...source, text: row.cells.find((cell) => cell.sourceId === source.id)?.text ?? null })),
    });
    requestAnimationFrame(() => setHeight(Math.min(900, Math.max(260, win.document.body.scrollHeight + 30))));
  }} />;
}
