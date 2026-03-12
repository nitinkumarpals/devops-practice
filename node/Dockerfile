FROM node:20-slim AS Builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim 

WORKDIR /app

COPY package*json ./

RUN npm install --omit=dev

COPY --from=Builder /app/dist ./dist

EXPOSE 3000

CMD [ "node","dist/main.js" ]