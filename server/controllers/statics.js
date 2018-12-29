const unhandledError = require("./utils/unhandledError");

const statics = () => async (request, h) => {
  try {
    return h.file("/path/to/picture.jpg");
  } catch (err) {
    return unhandledError(err);
  }
};

module.exports = statics;
