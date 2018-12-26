const Joi = require("joi");
const cts = require("./controllers");

module.exports = db => [
  {
    method: "GET",
    path: "/",
    handler: cts.base(db),
  },
  {
    method: "GET",
    path: "/hello/{name}",
    handler: cts.hello(db),
    options: {
      validate: {
        params: {
          name: Joi.string()
            .min(3)
            .max(10),
        },
      },
    },
  },
];
