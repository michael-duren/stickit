-- This file is used to create the database and tables
-- DROP statements for testing purposes
DROP TABLE IF EXISTS USER_EXERCISES_COMPLETED_NOTES;

DROP TABLE IF EXISTS USER_EXERCISES_COMPLETED;

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS EXERCISES;

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- table for all exercises
CREATE TABLE EXERCISES (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    TYPE VARCHAR(100) NOT NULL,
    FOCUS VARCHAR(100) NOT NULL,
    WARMUP BOOLEAN NOT NULL,
    COOLDOWN BOOLEAN NOT NULL,
    GENRE VARCHAR(100),
    INSTRUMENT VARCHAR(100),
    TEACHER VARCHAR(100),
    DESCRIPTION TEXT NOT NULL,
    DIRECTIONS VARCHAR(512) [] NOT NULL,
    REMEMBER VARCHAR(512) [],
    MINIMUM_TIME_MINUTES DECIMAL NOT NULL,
    BPM_MIN INT NOT NULL,
    BPM_MAX INT NOT NULL,
    VIDEO_LINK VARCHAR(1096)
);

-- When a user completes an exercise it will be added here
CREATE TABLE USER_EXERCISES_COMPLETED (
    ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES "user" ON DELETE CASCADE,
    EXERCISE_ID INT REFERENCES EXERCISES ON DELETE CASCADE,
    COMPLETED_AT DATE NOT NULL
);

-- A users notes on a exercise they completed. Includes the date
CREATE TABLE USER_EXERCISES_COMPLETED_NOTES (
    ID SERIAL PRIMARY KEY,
    EXERCISE_NOTE TEXT NOT NULL,
    USER_EXERCISES_COMPLETED_ID INT REFERENCES USER_EXERCISES_COMPLETED ON DELETE CASCADE,
    CREATED_AT DATE NOT NULL
);

-- EXERCISE GIVEN BY LUKE
INSERT INTO
    EXERCISES (
        NAME,
        TYPE,
        FOCUS,
        WARMUP,
        COOLDOWN,
        GENRE,
        INSTRUMENT,
        TEACHER,
        DESCRIPTION,
        DIRECTIONS,
        REMEMBER,
        MINIMUM_TIME_MINUTES,
        BPM_MIN,
        BPM_MAX,
        VIDEO_LINK
    )
VALUES
    (
        'Full Strokes',
        'Speed & Agility',
        'Hand Speed',
        true,
        false,
        null,
        'Practice Pad',
        null,
        'The objective of this warmup is to throw the stick with effort
and allow the stick to rebound back to its original position. Make sure your wrist is returning to its original position before the stick does,
otherwise it will get in the way of the stick''s natural rebound.',
        '{"1. 1 full stroke with right hand (RH),
followed by 1 full stroke with left hand (LH).Repeat 16x,
creating constant eighth notes.", 
"2. 2 full strokes RH,
2 full strokes LH.Repeat 8x",
"3. 3 full strokes RH,
3 full strokes LH.Repeat 8x",
"4. 4 full strokes RH,
4 full strokes LH.Repeat 8x",
"5. 5 full strokes RH,
5 full strokes LH.Repeat 8x",
"6. 6 full strokes RH,
6 full strokes LH.Repeat 8x",
"7.Increase tempo by 5 bmp
and repeat"}',
        '{"1. Go slow!", "2.Strive for an even sound between both hands.", "3.If the stick falls out of your hand,
that''s okay. It means you are not gripping the stick too hard."}',
        5.0,
        80,
        100,
        null
    );

-- Dummy Data
INSERT INTO
    "user" ("username", "password")
VALUES
    (
        'michael',
        '$2a$10$lm0PBXwkXLo.LDNthIwaL.GlgomiP6M49nodueisQjnFTmOTgk7ra'
    );

INSERT INTO
    USER_EXERCISES_COMPLETED (USER_ID, EXERCISE_ID, COMPLETED_AT)
VALUES
    (1, 1, NOW());

INSERT INTO
    USER_EXERCISES_COMPLETED_NOTES (
        EXERCISE_NOTE,
        USER_EXERCISES_COMPLETED_ID,
        CREATED_AT
    )
VALUES
    (
        'Awesome exercise, I felt I could have done better in several areas though.',
        1,
        NOW()
    );