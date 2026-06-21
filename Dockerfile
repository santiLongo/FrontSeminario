FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod -- --base-href=/seminario-app/

FROM nginx:alpine
COPY --from=build /app/dist/front-seminario/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 8080