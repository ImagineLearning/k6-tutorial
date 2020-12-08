FROM node:15.3.0-alpine

WORKDIR /srv/k6-tutorial

COPY package*.json ./

RUN npm install

COPY ./src/ .

EXPOSE 3000

CMD [ "node", "--experimental-json-modules", "src/server.js" ]
