const sqlite = require("sqlite");
const config = require("../config");

async function dbInit() {
  const db = await sqlite.open(config.dbPath, { Promise });
  await db.migrate();

  return db;
}

module.exports = dbInit;
