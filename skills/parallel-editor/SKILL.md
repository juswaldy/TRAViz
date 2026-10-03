---
name: parallel-editor
description: Build the TRAViz parallel-text editor with source columns, passage rows, whole-passage entry, offline passage lookup, and reliable save states. Use for authoring workflows and UI behavior, not general library maintenance.
---

# Parallel editor

Read [the app plan](../../docs/APP_PLAN.md) before choosing behavior. The confirmed
first version is a local app for one user and includes row editing, whole-passage
entry with optional line splitting, and offline Bible lookup. Read
[existing data](../../docs/EXISTING_DATA.md) when a UI choice depends on the demos.

## Authoring behavior

Represent a comparison as editable metadata, ordered source columns, and ordered
parallel rows. Each cell holds its own optional reference and plain text or an
explicit missing state. A row is a correspondence chosen by the user, not a
requirement that all sources use the same verse number.

Whole-passage entry and the row grid must edit the same document model. Keep pasted
text verbatim. Any splitting/grouping operation needs a preview, editable results,
and a way to cancel without replacing current work. Avoid treating line number as
proof that two passages correspond. Distinguish automatic token alignment within a
graph from automatic identification of matching passages, which is separate scope.

Lookup presents the edition, resolved reference, passage, and provenance before
insertion. Insert an editable snapshot into the same cell model; do not bind a
saved cell to mutable collection content. Keep unavailable editions, unresolved
references, and incomplete ranges visible without discarding the current draft.

Keep source/row identity stable while reordering. Expose missing-versus-empty state
without making users understand a database representation. Source labels can be
human-friendly while stable IDs handle storage and rendering identity.

## Editing and preview

Use direction per source/cell and a deliberate direction for each graph. Hebrew
content must not reverse the surrounding app navigation; Greek/English labels and
references need to remain readable alongside RTL text. Provide keyboard-accessible
row/source operations and labeled text fields. Do not use color as the only way to
identify a source. On narrow screens allow a source-focused editing view or useful
horizontal scrolling rather than shrinking scholarly text to fit.

Show unsaved, saving, saved, and failed states accurately. A successful graph preview
does not imply a successful database save. Keep the draft after validation/network
errors and expose stale-save conflicts. If autosave is introduced, serialize or
version requests so older responses cannot mark newer edits as saved.

Update the preview deliberately or with a measured debounce, not on every keystroke
through an expensive alignment. Let users select visible sources and a main branch
without losing text in hidden sources. Disable transient graph editing unless the
plan explicitly includes persistent alignment corrections.

## Verify the changed behavior

Exercise creation, both entry modes, source/row reordering, a missing cell, save and
reload, failed saves, and keyboard use as relevant. Include a Hebrew example with
mixed-direction labels and a Greek example with diacritics. Check that preview
updates do not leak duplicate graphs or event handlers. Test the persistence
contract through the backend when the task changes save behavior.
