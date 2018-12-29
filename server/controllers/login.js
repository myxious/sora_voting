const SQL = require("sql-template-strings");
const success = require("./utils/success");
const unsuccess = require("./utils/unsuccess");
const unhandledError = require("./utils/unhandledError");

const login = db => async request => {
  try {
    const { invite } = request.payload;

    const userData = await db.get(SQL`
        SELECT * FROM Users
        WHERE invite = ${invite}
      `);

    if (!userData) {
      return unsuccess("Invite code is incorrect");
    }

    return success(userData);
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = login;
