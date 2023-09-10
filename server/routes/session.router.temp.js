/**
 * Represents a session form.
 * @typedef {Object} SessionForm
 *
 * @property {string[]} focus - The focus of the session.
 * @property {string[]} speedAndAgilityTypes - The types for speed and agility.
 * @property {string[]} creativityAndImprovisationTypes - The types for creativity and improvisation.
 * @property {string[]} styleAndVocabularyTypes - The types for style and vocabulary.
 * @property {string[]} precisionAndTimekeepingTypes - The types for precision and timekeeping.
 * @property {number} timeInMinutes - The time duration of the session in minutes.
 */

const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', (req, res) => {
  /** @type {SessionForm} */
  const {
    focus,
    speedAndAgilityTypes,
    creativityAndImprovisationTypes,
    styleAndVocabularyTypes,
    precisionAndTimekeepingTypes,
    timeInMinutes,
  } = req.body;

  console.log(
    focus,
    speedAndAgilityTypes,
    creativityAndImprovisationTypes,
    styleAndVocabularyTypes,
    precisionAndTimekeepingTypes,
    timeInMinutes
  );

  res.sendStatus(201);
});
