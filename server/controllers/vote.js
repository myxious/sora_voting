const Boom = require("boom");
const SQL = require("sql-template-strings");
const success = require("./utils/success");
const unhandledError = require("./utils/unhandledError");
// DANGER: you are entering into bad code zone

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

const put = async (request, db) => {
  try {
    const { logo_name, vote } = request.payload;
    const { invite } = request.auth.credentials;

    // TODO: refactor this 💩 to something less verbose, reliable, readable and compact (!)
    const {
      positive_vote: previousPositiveVote,
      negative_vote: previousNegativeVote,
    } = await db.get(
      SQL`SELECT positive_vote, negative_vote FROM votes
            WHERE logo_name = ${logo_name} AND invite = ${invite}`,
    );

    if (vote > 0) {
      await db.run(
        SQL`UPDATE votes
              SET positive_vote = ${vote},
                  negative_vote = null
              WHERE invite = ${invite} AND logo_name = ${logo_name}`,
      );

      if (previousPositiveVote) {
        const diff = previousPositiveVote - vote;

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
      } else if (previousNegativeVote) {
        await db.run(
          SQL`UPDATE users
                SET positive_votes = positive_votes - ${vote}, 
                    negative_votes = negative_votes + ${previousNegativeVote}
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
      if (previousPositiveVote) {
        await db.run(
          SQL`UPDATE users
                SET positive_votes = positive_votes + ${previousPositiveVote}, 
                    negative_votes = negative_votes - ${Math.abs(vote)}
                WHERE invite = ${invite}`,
        );
      } else if (previousNegativeVote) {
        const diff = previousNegativeVote - Math.abs(vote);

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

const vote = db => request => {
  switch (request.method) {
    case "post":
      return post(request, db);
    case "put":
      return put(request, db);
    default:
      throw Boom.badRequest();
  }
};

module.exports = vote;
