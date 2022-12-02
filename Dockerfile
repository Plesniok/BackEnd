FROM node:latest

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install 
RUN npm install nodemon


EXPOSE 3003

CMD ["npm", "start"]