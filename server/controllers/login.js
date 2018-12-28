const SQL = require("sql-template-strings");
const Boom = require("boom");
const success = require("./utils/success");
const unhandledError = require("./utils/unhandledError");

const login = db => async request => {
  try {
    const { invite } = request.payload;

    const userData = await db.get(SQL`
        SELECT * FROM Users
        WHERE invite = ${invite}
      `);

    if (!userData) {
      throw Boom.unauthorized();
    }

    return success(userData);
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = login;
