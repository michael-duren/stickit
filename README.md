# Stickit

A mobile and web application that offers drum set players a curated list of exercises based on their focus areas, goals, and time constraints, eliminating the problem of deciding what to practice.
This curated list is called a “Smart Session”

# Contents

- [Prerequisites](#prerequisites)
- [Create Database](#create-database)
- [Development Setup](#development-setup-instructions)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Smart Session Algorithm](#smart-session-algorithm)
- [Tech Stack](#tech-stack)

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

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- You will have to rebuild database for production.

## Project Structure

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Api Endpoints

### User Specific

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
