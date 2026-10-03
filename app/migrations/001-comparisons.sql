CREATE TABLE comparisons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  notes TEXT NOT NULL,
  settings TEXT NOT NULL,
  snapshots TEXT NOT NULL,
  revision INTEGER NOT NULL CHECK (revision > 0),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE sources (
  comparison_id TEXT NOT NULL REFERENCES comparisons(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  label TEXT NOT NULL,
  language TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('ltr', 'rtl')),
  color TEXT NOT NULL,
  PRIMARY KEY (comparison_id, id),
  UNIQUE (comparison_id, position)
) STRICT;

CREATE TABLE parallel_rows (
  comparison_id TEXT NOT NULL REFERENCES comparisons(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  label TEXT NOT NULL,
  PRIMARY KEY (comparison_id, id),
  UNIQUE (comparison_id, position)
) STRICT;

CREATE TABLE cells (
  comparison_id TEXT NOT NULL,
  row_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  text TEXT,
  reference TEXT NOT NULL,
  PRIMARY KEY (comparison_id, row_id, source_id),
  FOREIGN KEY (comparison_id, row_id) REFERENCES parallel_rows(comparison_id, id) ON DELETE CASCADE,
  FOREIGN KEY (comparison_id, source_id) REFERENCES sources(comparison_id, id) ON DELETE CASCADE
) STRICT;
