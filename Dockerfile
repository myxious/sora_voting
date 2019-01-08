FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY backend /app

# Install app dependencies
RUN yarn install

EXPOSE 8080
CMD [ "node", "index.js" ]