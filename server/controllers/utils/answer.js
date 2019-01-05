/**
 * The server answer scheme, converted to JSON
 * @typedef {Object} answer
 * @property {boolean} success - Indicates whether the answer is successfull.
 * @property {any} [data] - Payload.
 * @property {string} [message] - Error text message
 */

/**
 * Returns successfull answer
 * @param {any} [payload] - A payload that will be attached to the answer as 'data' property
 * @returns {answer} - Returns an answer object
 */
const success = payload =>
  payload ? { success: true, data: payload } : { success: true };

/**
 * Returns unsuccessfull answer
 * @param {string} message - Error text message
 * @returns {answer} - Returns an answer object
 */
const unsuccess = message =>
  message ? { success: false, message } : { success: false };

module.exports = { success, unsuccess };
