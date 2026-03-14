FROM node:20-slim AS Builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine 

WORKDIR /app

RUN apk update && apk upgrade

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=Builder /app/dist ./dist

EXPOSE 3000

CMD [ "node","dist/main.js" ]