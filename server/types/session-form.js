/**
 * Represents a session form.
 * @typedef {Object} SessionForm
 *
 * @property {FocusAndTypeChoice} focusAndTypeChoice - The focus of the session.
 * @property {number} timeInMinutes - The time duration of the session in minutes.
 */

/**
 * @typedef {Object} FocusAndTypeChoice
 * @property {number[]} [1]
 * @property {number[]} [2]
 * @property {number[]} [3]
 * @property {number[]} [4]
 */

// example data format
// const exampleForm = {
//   focus: [ {1: [2]}, {2: []}, {3: [9]}, {4: [11]} ],
// };

// { 1: [2, 3], 2: [5], 3: [8], 4: [10] }

module.exports = {};
