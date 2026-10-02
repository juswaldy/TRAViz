# TRAViz repository instructions

## Product and scope

Build a local, single-user web app for entering, storing, editing, and visualizing
textual parallels using the existing TRAViz engine. Both row editing and
whole-passage entry, optional splitting into rows, and offline Bible collection
lookup belong in the first version. Use React/TypeScript, Node, and SQLite. Read
[the app plan](docs/APP_PLAN.md) before implementation; it distinguishes confirmed
requirements from proposals.
The initial setup request covers instructions, skills, and planning. Implement app
features when requested, and update the plan as decisions and milestones change.

## Repository map

- `js/`: editable TRAViz sources, including configuration, alignment, and rendering.
- `lib/`: bundled browser dependencies and the legacy Java compressor.
- `traviz.js`, `traviz-min.js`: generated bundles, not primary editing targets.
- `Rakefile`: legacy bundle build. Its compression command appends output; inspect
  it before rebuilding and avoid repeated append-based builds.
- `test/`: hand-authored browser demos and datasets, not an automated test suite.
- `index.html`: existing demo index. Keep its links working.
- `docs/`: app plan and evidence about the existing data.
- `skills/`: repository workflow skills routed below.
- `app/`: proposed home of the new app; not scaffolded yet.

## Repository skills

Read only the skill relevant to the current task, in addition to this file:

| Task | Skill |
| --- | --- |
| Schema, persistence, migrations, lookup, imports, exports | [parallel-data](skills/parallel-data/SKILL.md) |
| Entry forms, row editing, whole-passage entry, editor state | [parallel-editor](skills/parallel-editor/SKILL.md) |
| Graph preview, TRAViz adapter, renderer changes | [traviz-integration](skills/traviz-integration/SKILL.md) |

These paths are loaded through these instructions; do not assume `skills/` is a
native skill-discovery directory. `.agents/` is read-only in the setup workspace.

## Implementation constraints

- Keep original text intact in persistence and exports, including Hebrew marks,
  Greek diacritics, punctuation, whitespace, and embedded reference labels.
  Alignment transformations operate on derived values.
- Support more than two sources, stable source and row IDs, explicit ordering,
  and the difference between a missing passage and an explicitly empty string.
- Treat entered text and source labels as plain text. The old renderer has HTML
  insertion paths; resolve those at the renderer boundary before accepting user
  content in a preview. Do not execute imported JavaScript.
- Save the comparison to a real backend database. Browser storage alone does not
  satisfy persistence. Save related records atomically and surface write failures.
- Passage lookup inserts editable text snapshots with edition/reference/version
  provenance. Collection updates must not silently change saved comparisons.
- Serve the app's runtime assets and passage lookup locally. After installation,
  the application must work without a network connection.
- Keep the new app separate from the existing demos. Change engine sources when
  integration requires it; document and verify any generated bundle update.
- Retain upstream attribution and license information. Do not silently replace
  the repository license or redistribute additional text/font assets.

## Commands and verification

To serve existing demos from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. No app package manifest or automated test command
exists at initialization; do not claim `npm test` or a backend is available.
When scaffolding the app, document actual install, dev, build, migration, and test
commands in its README and update this section.

For app work, verify the affected behavior: Unicode and missing-cell round trips,
atomic saves and restart persistence, row/source reordering, stale-save handling,
and Hebrew/Greek/English browser previews. Add focused tests with the features
they verify. For documentation-only work, check links and `git diff --check`.
