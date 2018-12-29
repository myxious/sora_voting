const Boom = require("boom");
const SQL = require("sql-template-strings");
const success = require("./utils/success");
const unsuccess = require("./utils/unsuccess");
const unhandledError = require("./utils/unhandledError");
// DANGER: you are entering into bad code zone

// TODO: refactor all this crap to something not such dumb
const post = async (request, db) => {
  try {
    const { logo_name, vote } = request.payload;
    const { invite } = request.auth.credentials;

    // TODO: fix bad queries below (change SQlite to something better?)
    if (vote > 0) {
      await db.run(
        SQL`INSERT INTO votes (logo_name, invite, positive_vote, negative_vote)
            VALUES (${logo_name}, ${invite}, ${vote}, null)`,
      );
      await db.run(
        SQL`UPDATE users
              SET positive_votes = positive_votes - ${vote}
              WHERE invite = ${invite}`,
      );
    } else {
      await db.run(
        SQL`INSERT INTO votes (logo_name, invite, positive_vote, negative_vote)
            VALUES (${logo_name}, ${invite}, null, ${Math.abs(vote)})`,
      );
      await db.run(
        SQL`UPDATE users
              SET negative_votes = negative_votes - ${Math.abs(vote)}
              WHERE invite = ${invite}`,
      );
    }

    return success();
  } catch (err) {
    return unhandledError(err);
  }
};

const put = async (request, db, previousVotes) => {
  try {
    const { logo_name, vote } = request.payload;
    const { invite } = request.auth.credentials;

    const { setPositiveVote, setNegativeVote } = previousVotes;

    if (vote > 0) {
      await db.run(
        SQL`UPDATE votes
              SET positive_vote = ${vote},
                  negative_vote = null
              WHERE invite = ${invite} AND logo_name = ${logo_name}`,
      );

      if (setPositiveVote) {
        const diff = setPositiveVote - vote;

        if (diff > 0) {
          await db.run(
            SQL`UPDATE users
                  SET positive_votes = positive_votes + ${diff}
                  WHERE invite = ${invite}`,
          );
        } else {
          await db.run(
            SQL`UPDATE users
                  SET positive_votes = positive_votes - ${Math.abs(diff)}
                  WHERE invite = ${invite}`,
          );
        }
      } else if (setNegativeVote) {
        await db.run(
          SQL`UPDATE users
                SET positive_votes = positive_votes - ${vote}, 
                    negative_votes = negative_votes + ${setNegativeVote}
                WHERE invite = ${invite}`,
        );
      } else {
        throw Boom.badImplementation();
      }
    } else {
      await db.run(
        SQL`UPDATE votes
              SET positive_vote = null,
                  negative_vote = ${Math.abs(vote)}
              WHERE invite = ${invite} AND logo_name = ${logo_name}`,
      );
      if (setPositiveVote) {
        await db.run(
          SQL`UPDATE users
                SET positive_votes = positive_votes + ${setPositiveVote}, 
                    negative_votes = negative_votes - ${Math.abs(vote)}
                WHERE invite = ${invite}`,
        );
      } else if (setNegativeVote) {
        const diff = setNegativeVote - Math.abs(vote);

        if (diff > 0) {
          await db.run(
            SQL`UPDATE users
                  SET negative_votes = negative_votes + ${diff}
                  WHERE invite = ${invite}`,
          );
        } else {
          await db.run(
            SQL`UPDATE users
                  SET negative_votes = negative_votes - ${Math.abs(diff)}
                  WHERE invite = ${invite}`,
          );
        }
      } else {
        throw Boom.badImplementation();
      }
    }

    return success();
  } catch (err) {
    return unhandledError(err);
  }
};

const vote = db => async request => {
  try {
    const { logo_name, vote: userVote } = request.payload;
    const { invite } = request.auth.credentials;

    const {
      positiveVotesLeft,
      negativeVotesLeft,
      setPositiveVote,
      setNegativeVote,
    } = await db.get(
      SQL`SELECT positive_votes as positiveVotesLeft,
                 negative_votes as negativeVotesLeft,
                 positive_vote as setPositiveVote,
                 negative_vote as setNegativeVote
          FROM users
          LEFT JOIN votes
          ON votes.invite = users.invite AND votes.logo_name = ${logo_name}
          WHERE users.invite = ${invite}`,
    );

    if (
      !setPositiveVote &&
      !setNegativeVote &&
      !isEnoughVotesLeft(positiveVotesLeft, negativeVotesLeft, userVote)
    ) {
      return notEnoughVotes();
    }

    if (setPositiveVote) {
      if (userVote > 0 && userVote - setPositiveVote > positiveVotesLeft) {
        return notEnoughVotes();
      }

      if (userVote < 0 && negativeVotesLeft - Math.abs(userVote) < 0) {
        return notEnoughVotes();
      }
    }

    if (setNegativeVote) {
      if (
        userVote < 0 &&
        Math.abs(userVote) - setNegativeVote > negativeVotesLeft
      ) {
        return notEnoughVotes();
      }

      if (userVote > 0 && positiveVotesLeft - userVote < 0) {
        return notEnoughVotes();
      }
    }

    if (!setPositiveVote && !setNegativeVote) {
      return post(request, db);
    }

    return put(request, db, { setPositiveVote, setNegativeVote });
  } catch (err) {
    return unhandledError(err);
  }
};

function isEnoughVotesLeft(positiveVotesLeft, negativeVotesLeft, userVote) {
  return (
    (userVote > 0 && positiveVotesLeft - userVote >= 0) ||
    (userVote < 0 && negativeVotesLeft - Math.abs(userVote) >= 0)
  );
}

function notEnoughVotes() {
  return unsuccess("Not enough votes left for voting");
}

module.exports = vote;
