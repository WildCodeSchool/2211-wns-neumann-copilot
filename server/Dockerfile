FROM node:16.19-alpine


RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .
COPY .npmrc .
RUN pnpm i

COPY src ./src
COPY tsconfig.json .
COPY .eslintrc.js .
COPY .env .

CMD pnpm start