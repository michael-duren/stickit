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
