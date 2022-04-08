FROM node:14

WORKDIR /usr/src/mealing-cartpick

COPY . /usr/src/mealing-cartpick

RUN yarn global add serve

RUN yarn
RUN yarn build

EXPOSE 8080
CMD [ "serve", "-s", "build", "-l", "8080" ]
