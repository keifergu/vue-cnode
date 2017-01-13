FROM node:7.4.0
MAINTAINER Golfen Guo <golfen.guo@daocloud.io>

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . /app
RUN npm run build
