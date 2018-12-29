const path = require("path");

module.exports = {
  port: 3001,
  dbPath: path.join(__dirname, "../database.sqlite"),
  statics: path.join(__dirname, "../static"),
};
