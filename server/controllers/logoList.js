const SQL = require("sql-template-strings");
const { success } = require("./utils/answer");
const unhandledError = require("./utils/unhandledError");

/**
 * Returns list of all logos with current user votes
 * @param {Object} db - Database instance
 */
const logoList = db => async request => {
  try {
    const { invite } = request.auth.credentials;
    const data = await db.all(SQL`
      SELECT name, image_name, positive_vote, negative_vote FROM logos
      LEFT JOIN votes
      ON votes.invite = ${invite} AND votes.logo_name = logos.name
      ORDER BY name
    `);

    return success(data);
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = logoList;
