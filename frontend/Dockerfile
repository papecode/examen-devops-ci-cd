# Étape de build
FROM node:18.20.8 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Étape de production
FROM nginx:alpine
COPY --from=builder /app/dist/springapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
