# First Build
FROM node:10 AS build

# Create app directory
WORKDIR /usr/src/app
# Bundle app source
COPY . /usr/src/app

# Build arguments (env variables)
ARG NPM_TOKEN

# package.json ;)
COPY package.json ./

# Install app dependencies
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN scope=YOURSCOPE" > .npmrc && \
  npm set unsafe-perm true && \
    npm install --production && \
    rm -f .npmrc


# Second Build
FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

# Port
EXPOSE 3000

COPY --from=build /usr/src/app /usr/src/app

CMD [ "npm", "run", "prod" ]