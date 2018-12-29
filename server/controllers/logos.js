const SQL = require("sql-template-strings");
const success = require("./utils/success");
const unhandledError = require("./utils/unhandledError");

// Returning list of all logos with current user votes
const logosGet = db => async request => {
  try {
    const { invite } = request.auth.credentials;
    const data = await db.all(SQL`
      SELECT name, image_name, positive_vote, negative_vote FROM logos
      LEFT JOIN votes
      ON votes.invite = ${invite} AND votes.logo_name = logos.name
    `);

    return success(data);
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = logosGet;
