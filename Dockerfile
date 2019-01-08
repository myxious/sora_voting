FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY backend/package.json ./
COPY backend/yarn.lock ./

RUN yarn install

# Bundle app source
COPY backend /app

EXPOSE 8080
CMD [ "node", "index.js" ]