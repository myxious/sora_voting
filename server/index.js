const Hapi = require("hapi");
const sqlite = require("sqlite");
const config = require("./config");
const routes = require("./routes");

const server = Hapi.server({
  port: config.port,
  host: "localhost",
});

const init = async () => {
  try {
    const [db] = await Promise.all([
      sqlite.open(config.dbPath, { Promise }),
      server.start(),
    ]);

    await db.migrate();

    routes(db).forEach(route => server.route(route));
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error(`Server started unsuccessfully: ${err}`);
  }
};

server.ext("onPreResponse", (request, reply) => {
  const { response } = request;

  if (response.isBoom && response.output && response.output.payload) {
    response.output.payload = {
      success: false,
      message: response.output.payload.message,
    };
  }

  return reply.continue;
});

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
