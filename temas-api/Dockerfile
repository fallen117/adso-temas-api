# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
#  temas-api — NestJS 11 + TypeORM + PostgreSQL (Supabase)
#
#  Etapa unica a proposito: en la iteracion 1 priorizamos que arranque.
#  El multietapa (deps -> build -> runtime, usuario no root, tini como PID 1)
#  llega en la fase 3.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /usr/src/app

# Capa 1: solo los manifiestos. Se cachea mientras package.json no cambie,
# que es el caso mas comun. Si copiamos todo el codigo antes, cada cambio
# en un .ts invalidaria la cache y repetiria "npm ci" (~40s) en cada build.
COPY package*.json ./
RUN npm ci

# Capa 2: el codigo fuente.
COPY . .

# "nest build" -> dist/main.js
RUN npm run build

# Las variables NO se hornean en la imagen: llegan por "env_file" desde el
# compose. ".env" esta excluido en .dockerignore a proposito, para que las
# credenciales de Supabase y la API key de Gemini nunca queden en una capa.
# NODE_ENV tampoco se fija aqui a proposito: si lo pusiéramos, ganaríale a
# .env y no podrias cambiarlo sin reconstruir la imagen. Lo controla .env
# (development = TypeORM imprime las consultas SQL).
EXPOSE 3000

# Node 22 trae fetch global, asi que el healthcheck no necesita curl ni wget.
# /api/v1/temas devuelve 200 solo si TypeORM logro conectar a Supabase,
# o sea que valida toda la cadena: Nest -> TypeORM -> Postgres.
HEALTHCHECK --interval=10s --timeout=5s --start-period=40s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/v1/temas').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# "node dist/main", no "npm start": npm agrega una capa de procesos intermedia
# que hace que las senales de docker stop no lleguen limpiamente a Nest.
CMD ["node", "dist/main"]
