# TRAViz
Text Re-use Alignment Visualization

By Stefan Jänicke.

## Introduction

One of the substantial tasks in the ﬁeld of textual criticism is called collation, which is the cautious comparison of various editions of one and the same text. The traditional approach of a humanities scholar is to put the texts of several editions next to each other and mark the differences among the textual entities (e.g., sentences, sections, chapters). Since this is an extremely laborious approach many Digital Humanities projects investigate tools that support the humanities scholars with computational methods.

TRAViz is a JavaScript library that was developed within the Digital Humanities project eTRACES (http://etraces.e-humanities.net/). It generates visualizations for Text Variant Graphs that show the variations between different editions of texts. TRAViz supports the collation task by providing methods to:
* align various editions of a text
* visualize the alignment
* improve the readability for Text Variant Graphs compared to other approaches
* interact with the graph to discover how individual editions disseminate

## License

TRAViz is licensed under the latest Version of the Fair Academic License (FAL). 

FAL for TRAViz: http://www.traviz.vizcovery.org/source.html

More information about FAL can be found under http://www.vizcovery.org/fal.html.

## Homepage

http://www.traviz.vizcovery.org/

## Parallel text app

This repository is being prepared for a local, single-user app for entering and
keeping textual parallels in a backend, with both row editing and whole-passage
entry plus offline Hebrew Bible, Greek NT, and LXX lookup. The selected stack is
React/TypeScript, Node, and SQLite. The app is planned; the current runnable code
is the original demos.

- [App plan and open decisions](docs/APP_PLAN.md)
- [Existing examples and data model evidence](docs/EXISTING_DATA.md)
- [Repository agent instructions](AGENTS.md)

The instructions route agents to three focused skills:
[parallel data](skills/parallel-data/SKILL.md),
[parallel editor](skills/parallel-editor/SKILL.md), and
[TRAViz integration](skills/traviz-integration/SKILL.md).
They live in `skills/` because `.agents/` is read-only in the setup workspace.
They are read through `AGENTS.md`, rather than automatically discovered from that
directory. Native Codex skill discovery uses `.agents/skills`, as described in the
[official skills documentation](https://learn.chatgpt.com/docs/build-skills).

To view the existing examples, run from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open [the demo index](http://127.0.0.1:8000/). The `test/` directory contains
browser examples, not an automated test runner.
