FROM node:18.13.0
WORKDIR /backend
COPY package.json  ./
RUN yarn 


COPY . .
EXPOSE 5000
CMD ["npm","run","dev"]