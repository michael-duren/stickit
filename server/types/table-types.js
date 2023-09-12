/**
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
 */

/**
 * @typedef {Object} UserSession
 * @property {number} id
 * @property {number} user_id
 * @property {number} duration
 * @property {boolean} completed
 * @property {Date} [completed_at]
 */

/**
 * @typedef {Object} UserSessionExercises
 * @property {number} [id]
 * @property {number} user_id
 * @property {number} exercise_id
 * @property {number} session_id
 * @property {string} exercise_notes
 * @property {boolean} completed
 * @property {Date} [completed_at]
 * @property {number} completed_tempo
 */

module.exports = {}; // export types doesn't require placing in object
