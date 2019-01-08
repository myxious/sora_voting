const Boom = require("boom");

/**
 * Throwing a Boom instance error
 * @param  {Error} err - An error instance
 */
const unhandledError = err => {
  if (err instanceof Boom) {
    // If we throw an error intentionally, just push it forward
    throw err;
  } else {
    // If error is unknown
    // Log it and throw Boom instance instead
    console.error(err);
    throw Boom.badImplementation();
  }
};

module.exports = unhandledError;
