import { useEffect, useState } from 'react';
import { colors, documentSchema, newComparison, newRow, splitPassages, type Comparison, type SavedComparison, type Summary } from '../shared/document';
import { GraphPreview } from './GraphPreview';

async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`/api${path}`, { method, ...(body === undefined ? {} : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `Request failed (${response.status}).` }));
    throw new Error(error.message);
  }
  return response.status === 204 ? undefined as T : response.json();
}

function move<T>(items: T[], from: number, to: number): T[] {
  const result = [...items];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

export function App() {
  const [document, setDocument] = useState<Comparison>(newComparison);
  const [baseline, setBaseline] = useState(() => JSON.stringify(document));
  const [revision, setRevision] = useState(0);
  const [library, setLibrary] = useState<Summary[]>([]);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'rows' | 'passages'>('passages');
  const [split, setSplit] = useState<Comparison | null>(null);
  const [preview, setPreview] = useState<{ document: Comparison; rowId: string; sequence: number } | null>(null);
  const [previewRow, setPreviewRow] = useState(document.rows[0].id);
  const dirty = JSON.stringify(document) !== baseline;

  async function refreshLibrary() { setLibrary(await request<Summary[]>('/parallels')); }
  useEffect(() => { void refreshLibrary().catch((error: Error) => setError(error.message)); }, []);
  useEffect(() => {
    const leave = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', leave);
    return () => window.removeEventListener('beforeunload', leave);
  }, [dirty]);

  function load(document: Comparison, revision: number) {
    setDocument(document); setBaseline(JSON.stringify(document)); setRevision(revision);
    setError(''); setSplit(null); setPreview(null); setPreviewRow(document.rows[0].id);
    setMode(document.rows.length === 1 ? 'passages' : 'rows');
  }
  const mayLeave = () => !dirty || window.confirm('Discard the unsaved changes in this comparison?');
  async function open(id: string) {
    if (!mayLeave()) return;
    setBusy(true);
    try { const saved = await request<SavedComparison>(`/parallels/${id}`); load(saved.document, saved.revision); }
    catch (error) { setError((error as Error).message); }
    finally { setBusy(false); }
  }
  async function save() {
    const validation = documentSchema.safeParse(document);
    if (!validation.success) { setError(validation.error.issues.map((issue) => issue.message).join('\n')); return; }
    setBusy(true); setError('');
    try {
      const saved = revision === 0
        ? await request<SavedComparison>('/parallels', 'POST', document)
        : await request<SavedComparison>(`/parallels/${document.id}`, 'PUT', { document, expectedRevision: revision });
      setRevision(saved.revision); setBaseline(JSON.stringify(document));
      await refreshLibrary();
    } catch (error) { setError((error as Error).message); }
    finally { setBusy(false); }
  }
  async function removeComparison() {
    if (!window.confirm(`Delete “${document.title}” and its saved passages?`)) return;
    setBusy(true);
    try { await request(`/parallels/${document.id}`, 'DELETE', { expectedRevision: revision }); load(newComparison(), 0); await refreshLibrary(); }
    catch (error) { setError((error as Error).message); }
    finally { setBusy(false); }
  }
  function editCell(rowId: string, sourceId: string, change: Partial<Comparison['rows'][number]['cells'][number]>) {
    setDocument((document) => ({ ...document, rows: document.rows.map((row) => row.id === rowId
      ? { ...row, cells: row.cells.map((cell) => cell.sourceId === sourceId ? { ...cell, ...change } : cell) } : row) }));
  }
  function addSource() {
    const source = { id: crypto.randomUUID(), label: `Source ${document.sources.length + 1}`, language: 'und', direction: 'ltr' as const, color: colors[document.sources.length % colors.length] };
    setDocument({ ...document, sources: [...document.sources, source], rows: document.rows.map((row) => ({ ...row, cells: [...row.cells, { sourceId: source.id, text: '', reference: '' }] })) });
  }
  function removeSource(sourceId: string) {
    if (!window.confirm('Remove this source and its text from every row?')) return;
    const sources = document.sources.filter((source) => source.id !== sourceId);
    setDocument({ ...document, sources, rows: document.rows.map((row) => ({ ...row, cells: row.cells.filter((cell) => cell.sourceId !== sourceId) })),
      settings: { ...document.settings, hiddenSourceIds: document.settings.hiddenSourceIds.filter((id) => id !== sourceId),
        mainSourceId: document.settings.mainSourceId === sourceId ? sources[0].id : document.settings.mainSourceId } });
  }
  function showPreview(rowId = previewRow) {
    setPreviewRow(rowId);
    setPreview({ document: structuredClone(document), rowId, sequence: (preview?.sequence ?? 0) + 1 });
  }
  function prepareSplit() {
    try { setSplit(splitPassages(document)); setError(''); }
    catch (error) { setError((error as Error).message); }
  }
  const visibleLibrary = library.filter((item) => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const previewStale = preview && JSON.stringify(preview.document) !== JSON.stringify(document);

  return <div className="app-shell">
    <aside className="sidebar" inert={split !== null}>
      <div className="brand"><span className="brand-mark">T</span><div><strong>TRAViz</strong><span>Parallel texts</span></div></div>
      <button className="primary new-button" disabled={busy} onClick={() => { if (mayLeave()) load(newComparison(), 0); }}>＋ New comparison</button>
      <div className="library-heading"><h2>Your library</h2><span>{library.length}</span></div>
      <label className="search"><span className="sr-only">Search comparisons</span><input placeholder="Find a comparison…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <nav aria-label="Saved comparisons" className="library">
        {visibleLibrary.map((item) => <button key={item.id} disabled={busy} className={item.id === document.id ? 'library-item selected' : 'library-item'} onClick={() => void open(item.id)}>
          <strong>{item.title}</strong><span>{item.sourceCount} sources · {item.rowCount} {item.rowCount === 1 ? 'row' : 'rows'}</span>
        </button>)}
        {visibleLibrary.length === 0 && <p className="empty-library">{library.length ? 'No matching comparisons.' : 'A place for your parallels. Save your first comparison to keep it here.'}</p>}
      </nav>
      <div className="sidebar-footer"><span className="local-dot" /> Local workspace<p>Your texts stay on this computer.</p></div>
    </aside>

    <main inert={split !== null}>
      <header className="topbar"><span>WORKSPACE / COMPARISON</span><div><span className={`save-state ${dirty ? 'unsaved' : ''}`} role="status">{busy ? 'Working…' : dirty ? 'Unsaved changes' : revision ? 'Saved locally' : 'New draft'}</span><button className="primary" disabled={busy || (!dirty && revision > 0)} onClick={() => void save()}>Save comparison</button></div></header>
      {error && <div role="alert" className="error">{error}<button aria-label="Dismiss error" onClick={() => setError('')}>×</button></div>}
      <fieldset disabled={busy} className="workspace">
        <section className="intro">
          <p className="eyebrow">READ SIDE BY SIDE. SEE WHAT CONNECTS.</p>
          <label><span className="sr-only">Comparison title</span><input className="title-input" aria-label="Comparison title" value={document.title} maxLength={300} onChange={(event) => setDocument({ ...document, title: event.target.value })} /></label>
          <textarea className="notes" aria-label="Comparison notes" placeholder="Add a note about these passages…" rows={2} value={document.notes} onChange={(event) => setDocument({ ...document, notes: event.target.value })} />
          <div className="document-meta"><span>{document.sources.length} sources</span><span>{document.rows.length} parallel {document.rows.length === 1 ? 'row' : 'rows'}</span>{revision > 0 && <button className="text-button danger" onClick={() => void removeComparison()}>Delete comparison</button>}</div>
        </section>

        <section className="panel editor-panel" aria-labelledby="passages-heading">
          <div className="panel-heading"><div><p className="eyebrow">01 / TEXTS</p><h2 id="passages-heading">Bring the passages together</h2></div><button disabled={document.sources.length >= 12} onClick={addSource}>＋ Add source</button></div>
          <div className="editor-toolbar"><div className="tabs" aria-label="Entry mode"><button aria-pressed={mode === 'passages'} disabled={document.rows.length > 1} onClick={() => setMode('passages')}>Whole passages</button><button aria-pressed={mode === 'rows'} onClick={() => setMode('rows')}>Parallel rows</button></div>
            {document.rows.length === 1 && <button className="text-button" onClick={prepareSplit}>Split on line breaks ↗</button>}
          </div>
          <p className="editor-hint">{mode === 'passages' ? 'Paste a passage for each source. Compare it as one block, or split it into rows.' : 'Each row groups corresponding passages. References can be different for every source.'}</p>
          <div className="grid-scroll">
            <div className="text-grid" style={{ gridTemplateColumns: `80px repeat(${document.sources.length}, minmax(260px, 1fr))` }}>
              <div className="grid-corner">SOURCES</div>
              {document.sources.map((source, index) => <div className="source-header" key={source.id} style={{ borderTopColor: source.color }}>
                <label><span className="sr-only">Source {index + 1} label</span><input aria-label={`Source ${index + 1} label`} value={source.label} maxLength={200} onChange={(event) => setDocument({ ...document, sources: document.sources.map((item) => item.id === source.id ? { ...item, label: event.target.value } : item) })} /></label>
                <div className="source-options"><select aria-label={`Source ${index + 1} direction`} value={source.direction} onChange={(event) => setDocument({ ...document, sources: document.sources.map((item) => item.id === source.id ? { ...item, direction: event.target.value as 'rtl' | 'ltr' } : item) })}><option value="ltr">Left to right</option><option value="rtl">Right to left</option></select>
                  <button className="icon-button" aria-label={`Move source ${index + 1} left`} disabled={index === 0} onClick={() => setDocument({ ...document, sources: move(document.sources, index, index - 1) })}>←</button>
                  <button className="icon-button" aria-label={`Move source ${index + 1} right`} disabled={index === document.sources.length - 1} onClick={() => setDocument({ ...document, sources: move(document.sources, index, index + 1) })}>→</button>
                  <button className="icon-button" aria-label={`Remove source ${index + 1}`} disabled={document.sources.length === 1} onClick={() => removeSource(source.id)}>×</button>
                </div>
              </div>)}
              {document.rows.map((row, rowIndex) => <RowEditor key={row.id} document={document} rowIndex={rowIndex} editCell={editCell} setDocument={setDocument} showPreview={showPreview} removeRow={() => {
                if (!window.confirm('Remove this row and its text?')) return;
                const rows = document.rows.filter((item) => item.id !== row.id);
                setDocument({ ...document, rows });
                if (previewRow === row.id) { setPreviewRow(rows[0].id); setPreview(null); }
              }} />)}
            </div>
          </div>
          <div className="editor-footer"><button className="text-button" disabled={document.rows.length >= 100} onClick={() => { setDocument({ ...document, rows: [...document.rows, newRow(document.sources)] }); setMode('rows'); }}>＋ Add parallel row</button><span>Original text is preserved when saved.</span></div>
        </section>

        <section className="panel preview-panel" aria-labelledby="preview-heading">
          <div className="panel-heading"><div><p className="eyebrow">02 / ALIGNMENT</p><h2 id="preview-heading">Follow the shared words</h2></div><button className="primary" onClick={() => showPreview()}>Update preview</button></div>
          <div className="preview-options">
            <label>Row <select aria-label="Preview row" value={previewRow} onChange={(event) => showPreview(event.target.value)}>{document.rows.map((row, index) => <option key={row.id} value={row.id}>{index + 1}</option>)}</select></label>
            <label>Main branch <select value={document.settings.mainSourceId} onChange={(event) => setDocument({ ...document, settings: { ...document.settings, mainSourceId: event.target.value } })}>{document.sources.map((source) => <option key={source.id} value={source.id}>{source.label}</option>)}</select></label>
            <label><input type="checkbox" checked={document.settings.rtl} onChange={(event) => setDocument({ ...document, settings: { ...document.settings, rtl: event.target.checked } })} /> Hebrew / RTL graph</label>
            <label><input type="checkbox" checked={document.settings.normalize} onChange={(event) => setDocument({ ...document, settings: { ...document.settings, normalize: event.target.checked } })} /> Ignore case and punctuation</label>
          </div>
          <div className="legend">{document.sources.map((source) => <label key={source.id}><input type="checkbox" checked={!document.settings.hiddenSourceIds.includes(source.id)} onChange={(event) => setDocument({ ...document, settings: { ...document.settings, hiddenSourceIds: event.target.checked ? document.settings.hiddenSourceIds.filter((id) => id !== source.id) : [...document.settings.hiddenSourceIds, source.id] } })} /><i style={{ background: source.color }} />{source.label}</label>)}</div>
          {previewStale && <p className="preview-notice">The text or settings have changed. Update the preview to see them.</p>}
          {preview ? <GraphPreview key={preview.sequence} document={preview.document} rowId={preview.rowId} /> : <div className="preview-empty"><div className="alignment-symbol">∥</div><h3>Different passages. A common thread.</h3><p>Add your texts above, then update the preview to explore their alignment.</p></div>}
        </section>
        <footer className="workspace-footer"><a href="http://traviz.vizcovery.org" target="_blank" rel="noreferrer">Text alignment by TRAViz · Stefan Jänicke</a><span>A local workspace for close reading.</span></footer>
      </fieldset>
    </main>
    {split && <div className="modal-backdrop" onKeyDown={(event) => { if (event.key === 'Escape') setSplit(null); }}><section role="dialog" aria-modal="true" aria-labelledby="split-title" className="split-dialog"><h2 id="split-title">Review the proposed rows</h2><p>{split.rows.length} rows from line breaks. Empty lines remain empty; shorter sources get missing cells. You can adjust the rows after applying.</p>
      <div className="split-table"><table><thead><tr><th>Row</th>{split.sources.map((source) => <th key={source.id}>{source.label}</th>)}</tr></thead><tbody>{split.rows.map((row, index) => <tr key={row.id}><th>{index + 1}</th>{row.cells.map((cell) => <td key={cell.sourceId} dir={split.sources.find((source) => source.id === cell.sourceId)?.direction}>{cell.text === null ? <em>Missing</em> : cell.text === '' ? <em>Empty</em> : cell.text}</td>)}</tr>)}</tbody></table></div>
      <p className="muted">An exact copy of each original passage is kept with this comparison.</p><div className="dialog-actions"><button autoFocus onClick={() => setSplit(null)}>Cancel</button><button className="primary" onClick={() => { setDocument(split); setPreviewRow(split.rows[0].id); setPreview(null); setMode('rows'); setSplit(null); }}>Apply rows</button></div>
    </section></div>}
  </div>;
}

function RowEditor({ document, rowIndex, editCell, setDocument, showPreview, removeRow }: {
  document: Comparison; rowIndex: number;
  editCell: (rowId: string, sourceId: string, change: { text?: string | null; reference?: string }) => void;
  setDocument: (document: Comparison) => void; showPreview: (rowId: string) => void; removeRow: () => void;
}) {
  const row = document.rows[rowIndex];
  return <>
    <div className="row-heading"><span>{String(rowIndex + 1).padStart(2, '0')}</span><button className="text-button" aria-label={`Preview row ${rowIndex + 1}`} onClick={() => showPreview(row.id)}>View</button><div>
      <button className="icon-button" aria-label={`Move row ${rowIndex + 1} up`} disabled={rowIndex === 0} onClick={() => setDocument({ ...document, rows: move(document.rows, rowIndex, rowIndex - 1) })}>↑</button>
      <button className="icon-button" aria-label={`Move row ${rowIndex + 1} down`} disabled={rowIndex === document.rows.length - 1} onClick={() => setDocument({ ...document, rows: move(document.rows, rowIndex, rowIndex + 1) })}>↓</button>
    </div><button className="icon-button" aria-label={`Remove row ${rowIndex + 1}`} disabled={document.rows.length === 1} onClick={removeRow}>×</button></div>
    {document.sources.map((source, sourceIndex) => {
      const cell = row.cells.find((cell) => cell.sourceId === source.id)!;
      return <div className={`text-cell ${cell.text === null ? 'missing' : ''}`} key={source.id}>
        <input className="reference" aria-label={`Row ${rowIndex + 1} source ${sourceIndex + 1} reference`} placeholder="Reference, e.g. Psalm 14:1" value={cell.reference} onChange={(event) => editCell(row.id, source.id, { reference: event.target.value })} />
        <textarea aria-label={`Row ${rowIndex + 1} source ${sourceIndex + 1} text`} dir={source.direction} placeholder={cell.text === null ? 'No corresponding passage' : 'Enter or paste passage…'} disabled={cell.text === null} value={cell.text ?? ''} maxLength={20_000} onChange={(event) => editCell(row.id, source.id, { text: event.target.value })} rows={6} />
        <div className="cell-footer"><label><input type="checkbox" checked={cell.text === null} onChange={(event) => {
          if (event.target.checked && cell.text && !window.confirm('Replace this passage with a missing cell?')) return;
          editCell(row.id, source.id, { text: event.target.checked ? null : '' });
        }} /> Missing passage</label><span>{cell.text?.length ?? 0} characters</span></div>
      </div>;
    })}
  </>;
}
