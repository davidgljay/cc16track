FROM node
RUN apt-get update
COPY . /home/cc16
WORKDIR /home/cc16
RUN npm install
CMD node index