FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js ./
COPY postcss.config.mjs ./
COPY next.config.mjs ./
COPY jsconfig.json ./
COPY .eslintrc.json ./
COPY ./src ./src
COPY ./public ./public


RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "run", "dev"]