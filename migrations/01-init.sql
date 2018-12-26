--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Users (
  invite TEXT PRIMARY KEY,
  positive_votes INTEGER NOT NULL,
  negative_votes INTEGER NOT NULL
);

CREATE TABLE Logos (
  name TEXT PRIMARY KEY,
  image_name TEXT
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Users;
DROP TABLE Logos;