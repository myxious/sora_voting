const Hapi = require("hapi");
const inert = require("inert");
const config = require("../config");
const controllers = require("../controllers");
const routes = require("./routes");
const dbInit = require("../db");

const server = Hapi.server({
  port: config.port,
  host: "localhost",
  routes: { files: { relativeTo: config.statics } },
});

// Custom unsuccessfull response with json scheme { success: boolean, data: any, message: string }
server.ext("onPreResponse", (request, h) => {
  const { response } = request;

  if (response.isBoom && response.output && response.output.payload) {
    response.output.payload = {
      success: false,
      message: response.output.payload.message,
    };
  }

  return h.continue;
});

const init = async () => {
  try {
    // Database initialization
    const db = await dbInit();

    // Add authentication scheme, credential will be availabe as 'request.auth.credentials'
    await server.auth.scheme("custom", controllers.auth(db));
    await server.auth.strategy("default", "custom");

    // Add static files serve plugin
    await server.register(inert);

    // Starting server
    await server.start();

    // Registering routes
    routes(db).forEach(route => server.route(route));

    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error(`Server started unsuccessfully: ${err}`);
  }
};

module.exports = init;
