FROM node:20.18.0
WORKDIR /cache
COPY package*.json .
RUN npm install 

WORKDIR /app
COPY . .
EXPOSE 3000