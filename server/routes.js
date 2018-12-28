const Joi = require("joi");
const cts = require("./controllers");

module.exports = db => [
  {
    method: "POST",
    path: "/login",
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
    path: "/user_data",
    handler: cts.userData(db),
    options: { auth: "default" },
  },
  {
    method: "GET",
    path: "/logos",
    handler: cts.logos(db),
    options: { auth: "default" },
  },
  {
    method: ["POST", "PUT"],
    path: "/vote",
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
