# Reemplaza el Dockerfile actual del front (FrontSeminario).
# Unico cambio real: BASE_HREF pasa a ser un build-arg, para que el pipeline
# buildee /lognet-app/ (prod) o /lognet-test/ (test) con la misma imagen.
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BASE_HREF=/lognet-app/
RUN npm run build:${BUILD_CONFIGURATION} -- --base-href=${BASE_HREF}

FROM nginx:alpine
COPY --from=build /app/dist/front-seminario/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 8080