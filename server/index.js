const Hapi = require("hapi");
const sqlite = require("sqlite");
const config = require("./config");
const controllers = require("./controllers");
const routes = require("./routes");

const server = Hapi.server({
  port: config.port,
  host: "localhost",
});

const init = async () => {
  try {
    // Database initialization
    const db = await sqlite.open(config.dbPath, { Promise });

    await db.migrate();

    // Add authentication scheme, credential will be availabe as 'request.auth.credentials'
    await server.auth.scheme("custom", controllers.auth(db));
    await server.auth.strategy("default", "custom");

    // Starting server
    await server.start();

    // Registering routes
    routes(db).forEach(route => server.route(route));

    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error(`Server started unsuccessfully: ${err}`);
  }
};

// Custom unsuccessfull response with scheme { success: boolean, data: any, message: string }
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
