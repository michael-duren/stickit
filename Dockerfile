# node base image
FROM node:18-alpine

# The /app dir should act as the main app directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# install dependencies	
RUN npm install

# copy cient and server
COPY ./src ./src
COPY ./public ./public
COPY ./server ./server

# build react app 
RUN npm run build

# Expose the port for app
EXPOSE 8002

CMD [ "npm", "run", "start" ]



