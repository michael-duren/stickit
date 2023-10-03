# Stickit

A mobile and web application that offers drum set players a curated list of exercises based on their focus areas, goals, and time constraints, eliminating the problem of deciding what to practice.
This curated list is called a “Smart Session”

## Contents

- [Prerequisites](#prerequisites)
- [Create Database](#create-database)
- [Development Setup](#development-setup-instructions)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Smart Session Algorithm](#smart-session-algorithm)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database

1. Create a new database called `stick_it`
2. Run the contents of `database.sql` (located in the root directory of this project) in you query window or Postgres terminal connection.
3. Run `output.sql` found in `/server/scripts/output.sql`, this will insert exercises into the database. NOTE: currently this script needs to be run 2-3 times to make enough exercises for the application to work correctly there will be duplicate exercises.

## Development Setup Instructions

- `git clone https://github.com/michael-duren/stickit.git`
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Deployment

- Run `npm run build` to place the React build in the `build` folder. Test the build with `npm run start`
- Deploy to hosting service of choice
- You will have to rebuild database for production.

## Project Structure

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Tech Stack

  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
	<img width=40 height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
	</a>&nbsp;
  <a href="https://react.dev" target="_blank" rel="noreferrer">
	<img width=40 height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
	</a>&nbsp;
  <a href="https://redux.js.org" target="_blank" rel="noreferrer">
	<img width=40 height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
	</a>&nbsp;
  <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
	<img width=40 height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
	</a>&nbsp;
	<a href="https://expressjs.com" target="_blank" rel="noreferrer">
	<img width=40 style="background:white;" height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
	<img width=40 height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
	</a>&nbsp;

## Screenshots

![Desktop View](/documentation/images/Desktop.png)
![Mobile View](/documentation/images/Mobile.png)

## Smart Session Algorithm

### `determineSmartSession` Function

The `determineSmartSession` function generates a smart exercise session based on user preferences, such as focus areas, exercise types, and session duration. It returns an array of exercise objects representing the session.

- **Function Signature:** `(sessionForm: sessionFormType.SessionForm) => Promise<tableTypes.Exercise[]>`

#### Algorithm Explanation

1. The function starts by extracting relevant data from the `sessionForm` parameter, such as `focusAndTypeChoice` (user-selected exercise types and focuses) and `timeInMinutes` (session duration).

2. If the `timeInMinutes` is less than 10 minutes, the function throws an error since a session must be at least 10 minutes long.

3. The function then selects a warm-up and cooldown exercise from the database, each lasting 5 minutes, if the session duration is greater than 10 minutes.

4. If the session duration is exactly 10 minutes, it returns the warm-up and cooldown exercises as the entire session.

5. Next, the function prepares an object `chosenTypes` to categorize the selected exercise types and their associated focuses.

6. If the session duration is 15 minutes, it selects a random exercise of a specific type and focus.

7. If no exercise types with focuses are selected, the function throws an error.

8. The function calculates the `timePerType` based on the remaining session duration after warm-up and cooldown, divided by the number of selected types.

9. It then initializes an empty array `drumSession` to store exercises.

10. The function iterates through each selected exercise type, and for each type, it iterates through its associated focuses.

11. For each focus, it queries the database for exercises of the specified type and focus, ordered randomly.

12. It adds exercises to `drumSession` until the time limit for that focus is reached.

13. The function calculates the total duration of the generated `drumSession`.

14. If the session duration is less than the time limit, it adds a random exercise to `drumSession`.

15. If the session duration exceeds the time limit, it removes an exercise from `drumSession`.

16. Finally, the function returns the complete session array, including warm-up and cooldown exercises.

### `createDrumSession` Function

The `createDrumSession` function orchestrates the creation of a drumming exercise session for a user based on their preferences and returns a `sessionObjectType.SessionObject`.

- **Function Signature:** `(sessionForm: sessionFormType.SessionForm, userId: number) => Promise<sessionObjectType.SessionObject>`

#### Algorithm Explanation

1. The function begins by calling `determineSmartSession` to generate a smart exercise session.

2. It checks if the generated session data is empty and throws an error if it is.

3. The function calculates the total exercise duration of the session.

4. If the total exercise duration is less than 10 minutes, it throws an error.

5. It then inserts a new session record into the `USER_SESSIONS` table, including the user ID, session duration, and completion status.

6. The function iterates through the generated exercise session data and inserts each exercise into the `USER_SESSION_EXERCISES` table, associating it with the user session and specifying the exercise order.

7. It creates a `sessionObj` object that includes session details, user ID, exercise duration, exercises, and completion status.

8. Finally, it returns the `sessionObj` representing the user's session.

#### Example Usage

```javascript
const sessionForm = {
  focusAndTypeChoice: {
    1: [1, 2], // Example: Exercise type 1 with focuses 1 and 2
    // ...
  },
  timeInMinutes: 30, // Example: Session duration in minutes
};

const userId = 123; // Example: User's ID

const sessionObj = await createDrumSession(sessionForm, userId);
```

## Api Endpoints

### User API Documentation

This API handles user-related functionality, including registration, login, and logout.

## Endpoints

#### Get User Information

- **URL:** `/user`
- **Method:** GET
- **Authentication:** User must be authenticated
- **Description:** Retrieves user information if the user is authenticated.

#### Register New User

- **URL:** `/user/register`
- **Method:** POST
- **Description:** Registers a new user with the system.
- **Request Body:**
  - `username` (string): The username for the new user.
  - `password` (string): The user's password (will be encrypted before storage).
  - `firstName` (string): The user's first name.
  - `lastName` (string): The user's last name.

#### User Login

- **URL:** `/user/login`
- **Method:** POST
- **Description:** Authenticates a user and logs them in.
- **Request Body:**
  - `username` (string): The user's username.
  - `password` (string): The user's password.
- **Authentication:** Uses local authentication strategy.

#### User Logout

- **URL:** `/user/logout`
- **Method:** POST
- **Description:** Logs out the currently authenticated user.

### Smart Session Specific

#### User Session API Documentation

This API handles user session-related functionality, including retrieving user exercises and managing sessions.

#### Get User Exercises by Session

- **URL:** `/user-sessions/:id`
- **Method:** GET
- **Description:** Retrieves user exercises for a specific session.
- **URL Parameters:**
  - `id` (integer): The session ID.
- **Authentication:** User must be authenticated.

#### Complete User Session

- **URL:** `/user-sessions/:sessionId`
- **Method:** PUT
- **Description:** Marks a user session as completed.
- **URL Parameters:**
  - `sessionId` (integer): The session ID.
- **Authentication:** User must be authenticated.
- **Request Body:** None

#### Create User Session

- **URL:** `/user-sessions`
- **Method:** POST
- **Description:** Creates a user session based on the provided parameters.
- **Request Body:**
  - `focusAndTypeChoice` (string): The session's focus and type choice.
  - `timeInMinutes` (integer): The session duration in minutes.
- **Authentication:** User must be authenticated.

#### Example Usage

##### Get User Exercises by Session

```http
GET /user-sessions/123
```

### Exercise Specific

#### User Exercise API Documentation

This API handles user exercise-related functionality, including retrieving exercise details and managing favorite exercises.

#### Get User Exercise Details

- **URL:** `/user-exercises/:sessionid/:exerciseid`
- **Method:** GET
- **Description:** Retrieves exercise details for a specific user session and exercise.
- **URL Parameters:**
  - `sessionid` (integer): The session ID.
  - `exerciseid` (integer): The exercise ID.
- **Authentication:** User must be authenticated.

#### Check if Exercise is Favorited

- **URL:** `/user-exercises/heart/:id`
- **Method:** GET
- **Description:** Checks if an exercise is marked as a favorite by the user.
- **URL Parameters:**
  - `id` (integer): The exercise ID.
- **Authentication:** User must be authenticated.

#### Favorite an Exercise

- **URL:** `/user-exercises/heart/:id`
- **Method:** POST
- **Description:** Marks an exercise as a favorite for the user.
- **URL Parameters:**
  - `id` (integer): The exercise ID.
- **Authentication:** User must be authenticated.

#### Unfavorite an Exercise

- **URL:** `/user-exercises/heart/:id`
- **Method:** DELETE
- **Description:** Removes an exercise from the user's favorites.
- **URL Parameters:**
  - `id` (integer): The exercise ID.
- **Authentication:** User must be authenticated.

#### Update User Session Exercise

- **URL:** `/user-exercises/:sessionId`
- **Method:** PUT
- **Description:** Updates exercise details for a user session.
- **URL Parameters:**
  - `sessionId` (integer): The session ID.
- **Authentication:** User must be authenticated.
- **Request Body:**
  - `completedTempo` (integer): The completed tempo of the exercise.
  - `exerciseId` (integer): The exercise ID.
  - `exerciseNotes` (string): Additional notes for the exercise.

#### Refresh User Session Exercise

- **URL:** `/user-exercises/refresh/:sessionId`
- **Method:** PUT
- **Description:** Refreshes an exercise in the user session with a new exercise.
- **URL Parameters:**
  - `sessionId` (integer): The session ID.
- **Authentication:** User must be authenticated.
- **Request Body:**
  - `exercise` (object): Exercise details including `exercise_order`, `id`, `type_id`, `focus_id`, and more.

#### Example Usage

##### Get User Exercise Details

```http
GET /user-exercises/123/456
```
