# TRAViz parallel text workspace

This first implementation runs a React editor and a Node/SQLite backend on your
computer. You can enter whole passages, split them into parallel rows, edit and
reorder sources/rows, preview TRAViz alignments, and save/reopen comparisons.
Offline Bible collection lookup and the legacy dataset importer are planned but
not implemented yet. See [the app plan](../docs/APP_PLAN.md) for the remaining work.

## Start locally

Use Node **24.14 or newer within the Node 24 series** and npm. From this directory:

```sh
npm ci
npm run build
npm start
```

Open <http://127.0.0.1:3001>. The server binds only to the loopback interface. All
runtime assets are local; no external service is needed for editing or previewing.
The first install needs access to npm. Node 24 currently prints an experimental
warning for its built-in SQLite driver; this implementation uses that driver to
avoid a separate native database package.

For development:

```sh
npm run dev
```

Open <http://127.0.0.1:5173>. This command starts both Vite and the API. Ports 5173
and 3001 must be available. Stop with Ctrl+C. Run commands from `app/`, or use
`npm --prefix app run ...` from the repository root.

## Storage and editing

The default database is `app/data/parallels.sqlite`, created automatically. Set
`TRAVIZ_DATABASE` to use another path. Numbered migrations in `migrations/` apply
transactionally at startup. Original Hebrew/Greek text, whitespace, references,
row/source identity, missing versus empty cells, and selected settings are retained.

Save is explicit. Failed saves keep the current draft; revision checks reject a
stale tab. Before reopening after a conflict, copy any draft changes you need to
keep: this version has no conflict-merge UI or draft export. Unsaved edits are not
durable across closing the browser. Deletion is permanent after confirmation.

Whole-passage entry starts with one row. Splitting on line breaks previews the
result and keeps exact original strings in immutable entry snapshots. Shorter
sources receive missing cells rather than shifting their text. Row mode is the
editable document after splitting; recombining rows into a whole passage is not
implemented yet.

Back up by stopping the app cleanly and copying the **entire** `data/` directory
to a separate location. Restore with the app stopped, retaining all files from the
same backup. A supported online backup/export command is a later milestone. Do
not copy just the main database file from a running app and omit its WAL journal.

## Alignment preview

The preview shows one selected row at a time. Use **Update preview** after text,
source visibility, direction, or main-branch changes. A notice identifies stale
previews. RTL graph layout is separate from source input direction. Case and
punctuation normalization changes only the derived graph input, never saved text.

The first version accepts at most 12 sources, 100 rows, 20,000 characters per cell,
and 200,000 passage characters per comparison. The preview limits each selected
row to 600 words across its visible sources; longer texts can still be saved.
These are initial bounds, not benchmarked performance guarantees. Blank or missing
passages are omitted from alignment; a single populated source displays plain text.

`npm run assets` deterministically concatenates the ordered legacy sources into
ignored `public/generated/` assets. Development and production both use this output.
The frame isolates TRAViz's global state and tooltip lifecycle. Plain-text input
mode disables legacy HTML/merge-marker parsing, and tooltip/measurement insertion
escapes or uses text nodes. Upstream notices and the visual TRAViz credit remain.
Hover highlights are inserted behind the text so native tooltip clicks survive
modern browsers' pointer/mouse event sequence.
The checked-in root `traviz.js` and `traviz-min.js` are unchanged legacy releases;
the new app does not load them.

## Verification

```sh
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:browser
```

The browser installation is a one-time test-tool setup, not an app runtime
dependency. A preinstalled compatible Chromium can be selected through
`PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

Tests cover database restart persistence, atomic rollback, source/cell validation,
revision conflicts, original split snapshots, save/reload and failed-save UI,
Hebrew/Greek/English rendering, literal markup, and narrow-screen overflow.
Browser tests start the production server with a separate database in the system
temporary directory, so they do not touch your normal library. They require port
3001 to be free. Screenshots and test output are ignored by Git.
