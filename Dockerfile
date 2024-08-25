FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]