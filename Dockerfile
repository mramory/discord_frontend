FROM node:18-alpine AS front_prod

WORKDIR /usr/src/front

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]