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

const focuses = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [10, 11, 12],
};

async function seedExercises() {
  const client = await pool.connect();

  const randomMultipleOfFive = () => {
    // get a random index
    const index = Math.floor(Math.random() * 12) + 1;
    return index * 5;
  };

  try {
    // create random exercises with appropritate types and focuses
    for (let i = 1; i < 5; i++) {
      for (let j = 0; j < 30; j++) {
        const exercise = {
          name: faker.lorem.words(3),
          type_id: focuses[i][faker.number.int({ min: 0, max: 2 })],
          focus_id: i,
          warmup: faker.datatype.boolean(),
          cooldown: faker.datatype.boolean(),
          genre: faker.music.genre(),
          instrument: faker.lorem.word(),
          teacher: faker.person.fullName(),
          description: faker.lorem.paragraph(),
          directions: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
          remember: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
          minimum_time_minutes: randomMultipleOfFive(),
          bpm_min: faker.number.int({ min: 60, max: 100 }),
          bpm_max: faker.number.int({ min: 101, max: 200 }),
          video_link: faker.internet.url(),
        };

        const queryText = `
            INSERT INTO exercises(name, focus_id, type_id, warmup, cooldown, genre, instrument, teacher,
                description, directions, remember, minimum_time_minutes, bpm_min, bpm_max, video_link)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            `;

        await client.query(queryText, Object.values(exercise));
      }
    }

    // create 4 warm ups
    for (let i = 1; i < 5; i++) {
      const exercise = {
        name: faker.lorem.words(3),
        type_id: focuses[i][faker.number.int({ min: 0, max: 2 })],
        focus_id: i,
        warmup: true,
        cooldown: false,
        genre: faker.music.genre(),
        instrument: faker.lorem.word(),
        teacher: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        directions: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        remember: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        minimum_time_minutes: 5,
        bpm_min: faker.number.int({ min: 60, max: 100 }),
        bpm_max: faker.number.int({ min: 101, max: 200 }),
        video_link: faker.internet.url(),
      };

      const queryText = `
            INSERT INTO exercises(name, focus_id, type_id, warmup, cooldown, genre, instrument, teacher,
                description, directions, remember, minimum_time_minutes, bpm_min, bpm_max, video_link)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            `;

      await client.query(queryText, Object.values(exercise));
    }

    // create 4 cool downs
    for (let i = 1; i < 5; i++) {
      const exercise = {
        name: faker.lorem.words(3),
        type_id: focuses[i][faker.number.int({ min: 0, max: 2 })],
        focus_id: i,
        warmup: false,
        cooldown: true,
        genre: faker.music.genre(),
        instrument: faker.lorem.word(),
        teacher: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        directions: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        remember: `{${faker.lorem.sentence()},${faker.lorem.sentence()}}`,
        minimum_time_minutes: 5,
        bpm_min: faker.number.int({ min: 60, max: 100 }),
        bpm_max: faker.number.int({ min: 101, max: 200 }),
        video_link: faker.internet.url(),
      };

      const queryText = `
            INSERT INTO exercises(name, focus_id, type_id, warmup, cooldown, genre, instrument, teacher,
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
