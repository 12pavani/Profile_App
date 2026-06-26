FROM node:22-alpine

WORKDIR /home/app

COPY package*.json ./

# node_modules will installed 
RUN npm install 

COPY . .

EXPOSE 8000

CMD [ "node", "server.js" ]