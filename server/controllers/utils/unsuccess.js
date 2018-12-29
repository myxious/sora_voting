const success = message =>
  message ? { success: false, message } : { success: false };

module.exports = success;
