# Create image based on the official Node 8 image from the dockerhub
FROM node:8

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

ENV NODE_ENV="production"

# Copy dependency definitions
COPY . /usr/src/app

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "server.js"]