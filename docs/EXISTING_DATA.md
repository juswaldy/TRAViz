# Existing TRAViz data and integration notes

The current repo is a browser library and a collection of static demos. There is
no backend, package manifest, database, or automated test suite. These notes record
the evidence behind the proposed app model; the app is not implemented yet.

## Representative examples

| Example | What it demonstrates |
| --- | --- |
| [Basic](../test/basic/basic.html) | A single graph receives five `{edition, text}` objects. |
| [Psalm 14 and Psalm 53](../test/bible-hebrew/data/ps14-ps53.js) | Two Hebrew sources, multiple corresponding rows, Hebrew punctuation. |
| [Paul's conversion](../test/bible-greek/data/conversion.js) | Three Greek sources, explicitly empty strings, and shorter rows lacking trailing source cells. |
| [Hebrews and LXX](../test/bible-greek/data/hebrews.js) | References differ by source and row; some are embedded directly in passage strings. |
| [Betzalel](../test/bible-hebrew/data/betzalel.js) | Longer passages and English labels mixed with Hebrew text. |
| [Numbers 7](../test/bible-hebrew/data/num7.js) and [maqaf variant](../test/bible-hebrew/data/num7-maqaf.js) | Alternate treatment of Hebrew word boundaries. |
| [English translations](../test/bible-nwt/data.js) | Five editions of the same passage, arranged across multiple rows. |
| [Canonical paths](../test/canonical/data.js), [trams](../test/trams/data.js), [city tunnel](../test/citytunnel/data.js) | Other demo formats; these need separate mappings if included in import scope. |

## Bible dataset mapping

Most Bible data files assign JavaScript globals. They are not JSON documents.

| Existing value | Proposed app meaning |
| --- | --- |
| `bibleEditions[j]` | Source display label at position `j`; it may name a passage or an edition. |
| `editionIds[j]` | Legacy short label; retain separately from a new stable source ID. |
| `bibleVerses[i][j]` | Passage text for source `j` in parallel row `i`. |
| An absent trailing cell | Missing passage, distinct from a present cell containing `""`. |
| `fromPassage`, `toPassage` | Optional display headings; not reliable structured Bible reference fields. |
| `connectionType`, `fontSizeMin` | Optional graph settings with explicit defaults where absent. |
| HTML page title and script paths | Comparison title, dataset provenance, and viewer association. |

Do not infer a verse number from a row index. One row can compare different books,
verses, or ranges. Do not strip apparent reference prefixes from imported text;
preserve the string and let the user add or correct structured reference fields.

The [Hebrew viewer](../test/bible-hebrew/BibleViz.js) and
[Greek viewer](../test/bible-greek/BibleViz.js) create one TRAViz graph per row.
They track visible sources and colors. The Hebrew viewer sets `rtl: true` and both
use the font name `SBL BibLit`. A font declaration alone does not supply a font.
Viewer configuration therefore matters in addition to the dataset globals.

## Renderer boundary

[TRAViz](../js/TRAViz.js) accepts `align([{edition, text}, ...])`, followed by
`visualize()`. `setColorMap()` associates colors with edition keys. Edition strings
are also used as lookup keys, so duplicate display labels need unambiguous internal
keys or adapter validation rather than relying on labels as database IDs.

[Configuration](../js/TRAVizConfig.js) includes `normalize`, `rtl`, `lineBreaks`,
`connectionType`, and `splitAndMerge`. The default is `normalize: true`.
[Normalization](../js/TRAVizAligner.js) first parses the sentence through jQuery
HTML, then optionally lowercases and removes selected punctuation; whitespace is
also transformed. Turning normalization off does not make this path plain text.

`js/TRAViz.js` also inserts token text through `.html()` and constructs tooltip
HTML from edition labels and tokens. A new app must handle each affected sink;
escaping only its form inputs or only the first normalization call is insufficient.
Preserve stored text while making rendering safe and verify literal markup in a
browser. A React wrapper by itself does not fix the legacy renderer's HTML sinks.

Graph node positions and IDs are derived output. Persist source text, row grouping,
and selected settings first. If persistent manual word merges/splits are requested,
design versioned constraints tied to stable text/token identities instead of
storing transient graph node IDs.

## Legacy build

[Rakefile](../Rakefile) concatenates jQuery, qTip, Raphael, and the files in `js/`
into `traviz.js`; compression uses the bundled YUI jar. Its compressed output uses
shell append redirection. Do not assume repeated builds produce a clean bundle.
The future app can load the ordered source scripts during the integration spike,
but its production assets will need a reproducible build or verified bundle.
