const SQL = require("sql-template-strings");
const Boom = require("boom");
const { success } = require("./utils/answer");
const unhandledError = require("./utils/unhandledError");

// Returns current user data
const base = db => async request => {
  try {
    const { invite } = request.auth.credentials;

    const userData = await db.get(SQL`
      SELECT * FROM Users
      WHERE invite = ${invite}
    `);

    if (!userData) {
      throw Boom.notFound();
    }

    return success(userData);
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = base;
