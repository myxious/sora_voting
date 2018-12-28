const success = payload =>
  payload ? { success: true, data: payload } : { success: true };

module.exports = success;
