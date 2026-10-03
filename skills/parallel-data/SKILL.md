---
name: parallel-data
description: Design and implement TRAViz comparison persistence, offline Bible collection lookup, schema migrations, and lossless parallel-text imports or exports. Use for backend and data work, not graph layout or editor styling.
---

# Parallel data

Read [the app plan](../../docs/APP_PLAN.md) for accepted scope and
[existing data](../../docs/EXISTING_DATA.md) for the mapping to legacy examples.
Follow the stack actually present when implementation begins; a proposal in the
plan is not an installed dependency.

## Model the comparison

Use stable IDs for a comparison, ordered sources, and ordered parallel rows. A
source can identify a passage, witness, or translation; avoid a schema requiring
every source to be a Bible edition. Keep optional references on individual cells
because corresponding rows can compare different verses and books.

Keep missing cells distinct from explicitly empty text. Preserve original Unicode
strings; no trimming, punctuation removal, mark stripping, or normalization at
the persistence boundary. Derive any search/alignment representation separately.
Store only selected serializable graph settings, not arbitrary renderer objects.

Save a comparison and its children in one transaction. Enforce unique source/row
positions and one cell per source-row pair within the comparison. Check that cell
IDs belong to that comparison. Preserve stable IDs during reordering, and use a
revision precondition so a stale browser tab cannot silently overwrite changes.

## Import and export

Inventory the selected files before designing the importer. Bible fixtures,
canonical paths, and tram data are different formats. Use a literal-only parser
for allowlisted legacy variable declarations; reject executable expressions,
unexpected assignments, and malformed shapes. Do not use `eval`, dynamic import,
`Function`, or a VM as an upload parser.

For Bible fixtures, map column order from `bibleEditions` and `editionIds` and keep
row order from `bibleVerses`. Report label-count mismatches and rows with excess
cells. Map absent trailing cells to missing values, never shift them to another
source. Preserve `""` and reference-like prefixes exactly. Read title/direction
from an explicit import manifest or viewer association, not a guess from text.

Produce a reviewable import report before saving; a failed import must not leave
half a comparison. Retain the source path and an import fingerprint so repeating
an import can be recognized without overwriting subsequent user edits. Export a
versioned JSON document preserving source/row order, cell states, text, and settings.

## Collection lookup

Use the editions and sources recorded in the plan, distinguishing recommendations
from user-selected editions. Index each installed collection with its own book
identities, aliases, ordering, verse/part labels, and versification. Do not assume
LXX and Hebrew references share numbering. Return unresolved or incomplete ranges
explicitly. Inserting a lookup result creates a text snapshot and stores edition,
reference, and version provenance; collection updates must not mutate saved
comparisons. Inspect the actual source format, reconstruction rules, and attribution
when implementing each importer, and verify lookup with networking disabled.

## Verify the changed behavior

Use representative Hebrew, Greek, and English fixtures. Check save/reload/restart
and export/reimport fidelity, missing versus empty cells, references, reordering,
transaction rollback, invalid imports, and stale revision rejection as applicable.
Database files and local exports are user data, not committed fixtures. Validate
backup/restore through the database's supported mechanism when that feature lands.
