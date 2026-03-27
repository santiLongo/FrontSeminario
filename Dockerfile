FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Libs primero (orden importa si hay dependencias entre ellas)
RUN npx ng build lib-core 
RUN npx ng build lib-home 
RUN npx ng build lib-viajes 
RUN npx ng build lib-generales 
RUN npx ng build lib-finanzas 
RUN npx ng build lib-mantenimiento

# App principal
RUN npm run build:dev

FROM nginx:alpine
COPY --from=build /app/dist/front-seminario/browser /usr/share/nginx/html
EXPOSE 80