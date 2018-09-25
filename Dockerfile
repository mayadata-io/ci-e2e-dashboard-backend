# Create image based on the official Node 8 image from the dockerhub
FROM node:8

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

ENV NODE_ENV="production"

ENV KEY ""

# Copy dependency definitions
COPY . /usr/src/app

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

ADD launch.sh /

RUN chmod +x /launch.sh

# Serve the app

CMD /launch.sh