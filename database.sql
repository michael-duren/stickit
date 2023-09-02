-- This file is used to create the database and tables

-- DROP statements for testing purposes
-- DROP TABLE IF EXISTS EXERCISES;
-- DROP TABLE IF EXISTS USERS;
-- DROP TABLE IF EXISTS USER_EXERCISES_COMPLETED;


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "USER" (
    "ID" SERIAL PRIMARY KEY,
    "USERNAME" VARCHAR (80) UNIQUE NOT NULL,
    "PASSWORD" VARCHAR (1000) NOT NULL
);

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
    DIRECTIONS VARCHAR(512)[] NOT NULL,
    REMEMBER VARCHAR(512)[],
    MINIMUM_TIME_MINUTES DECIMAL NOT NULL,
    BPM_RANGE VARCHAR(100) NOT NULL,
    VIDEO_LINK VARCHAR(1096)
);

CREATE TABLE USER_EXERCISES_COMPLETED (
    ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES "USER" ON DELETE CASCADE,
    EXERCISE_ID INT REFERENCES EXERCISES ON DELETE CASCADE,
    EXERCISE_NOTES TEXT []
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
        BPM_RANGE,
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
        '80 - 100 BPM',
        null
    );