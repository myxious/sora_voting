const base = require("./base");

module.exports = {
  base,
  hello: db => req => `Hello ${req.params.name}`,
};
