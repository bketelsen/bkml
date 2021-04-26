FROM node:12-alpine

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build

ENV API_URL=https://api.brian.dev/graphql

CMD [ "npm", "start" ]
