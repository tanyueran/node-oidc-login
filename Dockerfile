FROM node:16.14.0
RUN yarn -v
WORKDIR /server
COPY . .
RUN yarn install
CMD yarn run start
EXPOSE 8099