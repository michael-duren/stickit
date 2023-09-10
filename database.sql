-- This file is used to create the database and tables
-- DROP statements for testing purposes
-- ***DO NOT USE IN PRODUCTION***
DROP TABLE IF EXISTS USER_SESSION_EXERCISES;

-- must be first because of foreign key constraints
DROP TABLE IF EXISTS USER_FAVORITE_EXERCISES;

-- must be second because of foreign key constraints
DROP TABLE IF EXISTS USER_SESSIONS;

-- must be third because of foreign key constraints
DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS EXERCISES;

DROP TABLE IF EXISTS FOCUS;

DROP TABLE IF EXISTS TYPE;

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE TYPE (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

CREATE TABLE FOCUS (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    TYPE_ID INT REFERENCES TYPE ON DELETE CASCADE
);

-- table for all exercises
CREATE TABLE EXERCISES (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    TYPE_ID INT REFERENCES TYPE ON DELETE CASCADE,
    FOCUS_ID INT REFERENCES FOCUS ON DELETE CASCADE,
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

-- table for a users session
CREATE TABLE USER_SESSIONS(
    ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES "user" ON DELETE CASCADE,
    DURATION DECIMAL NOT NULL,
    COMPLETED BOOLEAN,
    COMPLETED_AT DATE
);

CREATE TABLE USER_SESSION_EXERCISES (
    ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES "user" ON DELETE CASCADE,
    EXERCISE_ID INT REFERENCES EXERCISES ON DELETE CASCADE,
    SESSION_ID INT REFERENCES USER_SESSIONS ON DELETE CASCADE,
    EXERCISE_NOTES TEXT,
    COMPLETED BOOLEAN NOT NULL,
    COMPLETED_AT DATE,
    COMPLETED_TEMPO INT
);

CREATE TABLE USER_FAVORITE_EXERCISES(
    ID SERIAL PRIMARY KEY,
    USER_ID INT REFERENCES "user" ON DELETE CASCADE,
    EXERCISE_ID INT REFERENCES EXERCISES ON DELETE CASCADE
);

INSERT INTO
    TYPE (NAME)
VALUES
    ('Speed & Agility'),
    ('Creativity & Improvisation'),
    ('Style & Vocabulary'),
    ('Precision & Timekeeping');

INSERT INTO
    FOCUS (NAME, TYPE_ID)
VALUES
    --     Speed & Agility
    ('Hand Speed', 1),
    ('Foot Speed', 1),
    ('Rudiments', 1),
    --     Creativity & Improvisation
    ('Metronome Games', 2),
    ('Play Along Tracks', 2),
    ('Vocalizing Rhythms', 2),
    --     Style & Vocabulary
    ('Groove', 3),
    ('Fills', 3),
    ('Soloing', 3),
    --     Precision & Timekeeping
    ('Independence', 4),
    ('Coordination', 4),
    ('Technique', 4);

-- EXERCISE GIVEN BY LUKE
INSERT INTO
    EXERCISES (
        NAME,
        TYPE_ID,
        FOCUS_ID,
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
        1,
        1,
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
    "user" ("username", "password", "role")
VALUES
    (
        'michael',
        '$2a$10$lm0PBXwkXLo.LDNthIwaL.GlgomiP6M49nodueisQjnFTmOTgk7ra',
        'admin'
    );

INSERT INTO
    USER_SESSIONS (USER_ID, DURATION, COMPLETED, COMPLETED_AT)
VALUES
    (1, 30, TRUE, NOW());

INSERT INTO
    USER_SESSION_EXERCISES(
        USER_ID,
        EXERCISE_ID,
        SESSION_ID,
        EXERCISE_NOTES,
        COMPLETED,
        COMPLETED_AT,
        COMPLETED_TEMPO
    )
VALUES
    (
        1,
        1,
        1,
        'I felt like I could have done better in several areas.',
        TRUE,
        NOW(),
        100
    );

INSERT INTO
    USER_FAVORITE_EXERCISES (USER_ID, EXERCISE_ID)
VALUES
    (1, 1);