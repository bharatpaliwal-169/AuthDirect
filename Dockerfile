FROM node:16.20.0-alpine
WORKDIR /
ADD package*.json ./
RUN npm install

COPY . .

CMD [ "node", "index.js"]