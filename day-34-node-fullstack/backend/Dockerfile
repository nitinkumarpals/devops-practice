FROM node:20 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY --from=builder /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD [ "node","server.js" ]