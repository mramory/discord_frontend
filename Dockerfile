FROM node:18-alpine AS FontProd

WORKDIR /usr/src/front

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]