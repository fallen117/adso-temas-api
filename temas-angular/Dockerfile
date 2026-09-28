# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
#  temas-angular — Angular 21 (standalone)
#
#  Etapa unica a proposito: en la iteracion 1 levantamos el dev-server para
#  comprobar que la SPA habla con la API. El "ng build" + nginx:alpine
#  multietapa llega en la fase 3.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /usr/src/app

# Capa 1: manifiestos, cacheados mientras package.json no cambie.
COPY package*.json ./
RUN npm ci

# Capa 2: codigo fuente.
COPY . .

EXPOSE 4200

# "--host 0.0.0.0" es obligatorio: sin el, el dev-server escucha solo en el
# loopback DEL CONTENEDOR y el puerto publicado en el host responde
# "conexion rechazada".
#
# "ng serve" usa la configuracion "development" (angular.json -> defaultConfiguration),
# que por fileReplacements carga environment.development.ts con
# apiUrl = http://localhost:3000. Desde el navegador, localhost:3000 es el
# puerto que el compose publica hacia este contenedor de la API, y el CORS de
# main.ts ya admite el origen http://localhost:4200.
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
