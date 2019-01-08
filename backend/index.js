const init = require("./hapi");

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
