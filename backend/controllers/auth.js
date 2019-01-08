const Boom = require("boom");
const SQL = require("sql-template-strings");
const unhandledError = require("./utils/unhandledError");

/**
 * Returns auth validator function for HAPI auth scheme
 * @param {Object} db - Database instance
 */
const validate = db => () => ({
  authenticate: async (request, h) => {
    try {
      const { authorization } = request.headers;
      if (!authorization) {
        throw Boom.unauthorized();
      }

      const invite = await db.get(SQL`
            SELECT invite FROM users 
            WHERE invite = ${authorization}`);

      if (!invite) {
        throw Boom.unauthorized();
      }

      return h.authenticated({ credentials: invite });
    } catch (err) {
      return unhandledError(err);
    }
  },
});

module.exports = validate;
