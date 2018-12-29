const Joi = require("joi");
const config = require("../config");
const cts = require("../controllers");

// TODO: make a good abstration for front routes
const frontendIndexHandler = (request, h) => h.file("index.html");
const frontendRoutes = [
  {
    method: "GET",
    path: "/login",
    handler: frontendIndexHandler,
  },
];

module.exports = db => [
  ...frontendRoutes,
  {
    method: "GET",
    path: "/{statics*}",
    handler: {
      directory: {
        path: config.statics,
        index: ["index.html"],
      },
    },
  },
  {
    method: "POST",
    path: "/api/login",
    handler: cts.login(db),
    options: {
      validate: {
        payload: {
          invite: Joi.string(),
        },
      },
    },
  },
  {
    method: "GET",
    path: "/api/user_data",
    handler: cts.userData(db),
    options: { auth: "default" },
  },
  {
    method: "GET",
    path: "/api/logos",
    handler: cts.logos(db),
    options: { auth: "default" },
  },
  {
    method: ["POST", "PUT"],
    path: "/api/vote",
    handler: cts.vote(db),
    options: {
      auth: "default",
      validate: {
        payload: {
          logo_name: Joi.string(),
          vote: Joi.number()
            .min(-4)
            .max(4),
        },
      },
    },
  },
];
