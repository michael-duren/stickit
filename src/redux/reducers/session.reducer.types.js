/**
 * This reducer stores the current session information
 * and the current exercise information
 * @typedef {Object} Exercise
 * @property {number} id
 * @property {string} name
 * @property {number} type_id
 * @property {number} focus_id
 * @property {boolean} warmup
 * @property {boolean} cooldown
 * @property {string} genre
 * @property {string} instrument
 * @property {string} teacher
 * @property {string} description
 * @property {string[]} directions
 * @property {string[]} remember
 * @property {string} minimum_time_minutes
 * @property {number} bpm_min
 * @property {number} bpm_max
 * @property {string} video_link
 *
 * @typedef {Object} Session
 * @property {number} sessionId
 * @property {number} user_id
 * @property {number} duration
 * @property {boolean} completed
 * @property {Exercise[]} exercises
 * @property {Exercise[]} completedExercises
 */
