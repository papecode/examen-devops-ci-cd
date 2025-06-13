# Étape de build
FROM node:20.11.1 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
