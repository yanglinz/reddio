FROM node:6.1.0

RUN apt-get update && apt-get install -y build-essential

RUN mkdir -p /app
WORKDIR /app
ADD . /app
