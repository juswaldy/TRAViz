---
name: traviz-integration
description: Integrate the existing TRAViz browser engine into the new app, including graph previews, text safety, source identity, RTL, and renderer lifecycle. Use when changing the adapter or legacy rendering code.
---

# TRAViz integration

Read [existing data and renderer notes](../../docs/EXISTING_DATA.md) and the relevant
milestone in [the app plan](../../docs/APP_PLAN.md). Inspect `js/TRAViz.js`,
`js/TRAVizAligner.js`, `js/TRAVizConfig.js`, and the relevant `test/` viewer before
relying on a renderer behavior.

## Integration boundary

Keep the old imperative renderer behind a small browser-only adapter with an
explicit mount/update/dispose lifecycle. Create a unique container per visible
row; map cells to `align([{edition, text}, ...])`, set stable source colors, then
visualize. The framework should not also manage the renderer's internal DOM.
Verify resize, remount, and navigation behavior rather than assuming a destructor
exists. Load bundled dependencies once in the established order.

Use an unambiguous key per source: TRAViz uses edition strings in maps. Keep display
labels separate if necessary and make main-branch selection refer to the stable
source ID. Do not accidentally renumber visible sources when some cells are absent.
Skip missing/empty passages for alignment as defined by the adapter contract, while
retaining their cells in the editor. Display sensible zero- and one-passage states.

Hebrew graphs require explicit RTL configuration; CSS direction on the outer app
alone is insufficient. Preserve the exact persisted text and derive renderer input.
Make normalization a visible, reproducible setting. The existing default removes
case and selected punctuation, so do not silently apply it to storage or exports.

## Text handling and generated assets

The aligner parses input as HTML even with normalization disabled. The renderer
also uses `.html()` and string-built tooltips for labels/tokens. Inspect and replace
or safely handle each relevant sink with plain-text semantics. A single initial
escape does not establish safety across parsing and later reinsertion. Verify
literal angle brackets, ampersands, and markup-like labels/text without code
execution or lost characters.

Make engine fixes in `js/`. The root bundles are generated and the legacy Rake
compression task appends output. Choose and document a reproducible asset path;
never let development exercise fixed sources while production ships an old bundle.
Preserve upstream attribution and the existing demo entrypoints.

Set `splitAndMerge: false` until persistent manual corrections are in scope and have
a storage design. Persist raw text, row boundaries, and selected settings; a saved
graph's transient vertex IDs are not durable annotation anchors.

## Verification

Use Hebrew Psalm 14/53, Greek conversion, and English translation fixtures for
relevant browser checks. Check stable colors and main branch after source toggles,
empty/missing cells, literal markup, normalization choices, narrow/wide layouts,
repeat mounts, and cleanup. Exercise the assets that production will actually load.
