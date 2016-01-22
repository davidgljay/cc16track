FROM node
MAINTAINER "David Jay <davidgljay@gmail.com>"
LABEL description="A small script that tracks dialogue on #cc16 on twitter."
RUN apt-get update
COPY . /home/cc16
WORKDIR /home/cc16
RUN npm install
CMD node index