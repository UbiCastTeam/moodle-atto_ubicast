FROM node:18-alpine

RUN apk add make

RUN npm install -g eslint eslint-plugin-vue shifter

RUN mkdir -p /apps

WORKDIR /apps

CMD ["eslint", "--color", "."]
