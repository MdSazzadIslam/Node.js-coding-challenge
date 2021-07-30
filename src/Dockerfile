FROM node:10
COPY . /src
COPY  package.json  /
WORKDIR /src
RUN npm install
EXPOSE 5000
CMD npm start