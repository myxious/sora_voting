const SQL = require("sql-template-strings");
const { success, unsuccess } = require("./utils/answer");
const unhandledError = require("./utils/unhandledError");

/**
 * Defines cancel vote for logo
 * @param {Object} db - Database instance
 */
const cancelVote = db => async request => {
  try {
    const { logo_name } = request.params;
    const { invite } = request.auth.credentials;

    const votes = await db.get(
      SQL`SELECT positive_vote, negative_vote FROM Votes
        WHERE invite = ${invite} AND logo_name = ${logo_name}`,
    );

    if (!votes) {
      return unsuccess("Vote record not found");
    }

    const { positive_vote, negative_vote } = votes;

    await db.run(
      SQL`UPDATE Users
            SET positive_votes = positive_votes + ${positive_vote || "0"},
                negative_votes = negative_votes + ${negative_vote || "0"}
            WHERE invite = ${invite}`,
    );

    await db.run(
      SQL`DELETE FROM Votes
            WHERE invite = ${invite} AND logo_name = ${logo_name}`,
    );

    return success();
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = cancelVote;
