const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

/*
 * Script for Development purposes only
 * This script will seed the database with 200 exercises
 * These exercises are made up and probably don't make sense
 */

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'stick_it',
});

async function seedExercises() {
  const client = await pool.connect();

  try {
    for (let i = 0; i < 200; i++) {
      const exercise = {
        name: faker.lorem.words(3),
        type_id: faker.number.int({ min: 1, max: 12 }),
        focus_id: faker.number.int({ min: 1, max: 4 }),
        warmup: faker.datatype.boolean(),
        cooldown: faker.datatype.boolean(),
        genre: faker.music.genre(),
        instrument: faker.lorem.word(),
        teacher: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        directions: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        remember: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        minimum_time_minutes: faker.number.int({ min: 1, max: 60 }),
        bpm_min: faker.number.int({ min: 60, max: 100 }),
        bpm_max: faker.number.int({ min: 101, max: 200 }),
        video_link: faker.internet.url(),
      };

      const queryText = `
            INSERT INTO exercises(name, type_id, focus_id, warmup, cooldown, genre, instrument, teacher,
                description, directions, remember, minimum_time_minutes, bpm_min, bpm_max, video_link)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            `;

      await client.query(queryText, Object.values(exercise));
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    client.release();
    pool.end();
  }
}

seedExercises();
