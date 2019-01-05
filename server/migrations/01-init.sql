--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Users (
  invite TEXT PRIMARY KEY,
  positive_votes INTEGER NOT NULL DEFAULT 4,
  negative_votes INTEGER NOT NULL DEFAULT 4,
  CHECK(
    positive_votes >= 0 AND positive_votes <= 4 AND
    negative_votes >= 0 AND negative_votes <= 4
  )
);

CREATE TABLE Logos (
  name TEXT PRIMARY KEY,
  image_name TEXT
);

CREATE TABLE Votes (
  logo_name TEXT,
  invite TEXT,
  positive_vote INTEGER,
  negative_vote INTEGER,
  PRIMARY KEY (logo_name, invite),
  FOREIGN KEY (logo_name) REFERENCES Logos (name),
  FOREIGN KEY (invite) REFERENCES Users (invite),
  CHECK(positive_vote > 0 AND positive_vote <= 4 AND negative_vote > 0 AND negative_vote <= 4)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Users;
DROP TABLE Logos;
DROP TABLE Votes;