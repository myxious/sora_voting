const SQL = require("sql-template-strings");

const base = db => async (request, h) => {
  const data = await db.all(SQL`SELECT * FROM Users`);
  console.log(data);
  return `Hello, world, ${data.join()}`;
};

module.exports = base;
