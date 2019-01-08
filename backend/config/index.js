const path = require("path");

const dev = {
  host: "localhost",
  port: 3001
};

const prod = {
  host: "0.0.0.0",
  port: 9000
};

const common = {
  dbPath: path.join(__dirname, "../data/database.sqlite"),
  migrationsPath: path.join(__dirname, "../migrations"),
  statics: path.join(__dirname, "../static")
};

function getConfig() {
  if (process.env.NODE_ENV === "development") {
    return {
      ...dev,
      ...common
    };
  }

  return {
    ...prod,
    ...common
  };
}

module.exports = getConfig();
