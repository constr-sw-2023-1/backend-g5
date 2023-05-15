FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]