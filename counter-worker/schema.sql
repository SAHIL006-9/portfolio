CREATE TABLE IF NOT EXISTS counters (
  id TEXT PRIMARY KEY,
  value INTEGER NOT NULL
);

INSERT OR IGNORE INTO counters (id, value)
VALUES ('portfolio', 240);
