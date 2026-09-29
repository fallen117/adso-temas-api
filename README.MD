# ADSO Temas API

Aplicacion web full-stack para la gestion de temas academicos, aprendices y asignacion de intereses, desarrollada como proyecto de formacion ADSO (Analisis y Desarrollo de Software).

---

## Stack Tecnologico

### Backend — `temas-api/`
- **NestJS** (v11) — Framework Node.js progresivo
- **TypeORM** (v0.3) — ORM para PostgreSQL
- **PostgreSQL** — Base de datos relacional (esquema `sena`)
- **Google Gemini AI** — Generacion automatica de tips educativos por tema
- **class-validator / class-transformer** — Validacion de DTOs
- **@nestjs/config** — Variables de entorno

### Frontend — `temas-angular/`
- **Angular** (v21) — Standalone components
- **Angular Router** — Navegacion SPA
- **Angular Forms** — Formularios reactivos/template

---

## Despliegue

| Servicio | URL |
|----------|-----|
| **API (Render)** | `https://adso-temas-api.onrender.com` |
| **Frontend (Render)** | `https://adso-temas-angular.onrender.com` |
| **BD PostgreSQL** | Supabase (Pooler) |

Cada subdirectorio (`temas-api/`, `temas-angular/`) se despliega de forma independiente en Render.com con build y start scripts propios.

---

## Base de Datos

Esquema `sena` en Supabase PostgreSQL con SSL habilitado.

### Tablas

| Tabla | Descripcion |
|-------|-------------|
| `sena.tema` | Temas academicos con tips en JSONB |
| `sena.aprendiz` | Aprendices (cedula, nombre, fecha nacimiento) |
| `sena.tema_aprendiz` | Relacion N:M entre aprendices y temas |

---

## API Endpoints

Base URL: `/api/v1`

### Temas
| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/temas` | Listar todos los temas |
| GET | `/temas/:id` | Obtener tema por ID |
| POST | `/temas` | Crear tema (genera tips con Gemini) |
| PUT | `/temas/:id` | Actualizar tema completo |
| PATCH | `/temas/:id` | Actualizar parcialmente |
| DELETE | `/temas/:id` | Eliminar tema |

### Aprendices
| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/aprendices` | Listar aprendices |
| GET | `/aprendices/:id` | Obtener aprendiz |
| POST | `/aprendices` | Crear aprendiz |
| PUT | `/aprendices/:id` | Actualizar |
| PATCH | `/aprendices/:id` | Actualizar parcial |
| DELETE | `/aprendices/:id` | Eliminar |

### Tema-Aprendiz (asignacion de intereses)
| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/tema-aprendiz` | Listar asignaciones |
| GET | `/tema-aprendiz/:id` | Obtener asignacion |
| POST | `/tema-aprendiz` | Asignar tema a aprendiz |
| PUT | `/tema-aprendiz/:id` | Actualizar |
| PATCH | `/tema-aprendiz/:id` | Actualizar parcial |
| DELETE | `/tema-aprendiz/:id` | Eliminar asignacion |

---

## Funcionalidades Destacadas

- **CRUD completo** para las 3 entidades con validacion y manejo de errores
- **Generacion de tips con IA** (Gemini 2.5 Flash Lite) al crear un tema
- **CORS configurado** para frontend local (`localhost:4200`) y produccion (Render)
- **Proteccion contra duplicados** — validacion de nombre unico en temas
- **Restriccion de integridad referencial** — no permite eliminar temas con aprendices asociados

---

## Ejecucion Local

### Backend
```bash
cd temas-api
npm install
# crear .env con variables de BD
npm run start:dev
```

### Frontend
```bash
cd temas-angular
npm install
npm start
```

---

## Ejecucion con Docker

Cada subproyecto tiene su propio `Dockerfile` y su propio `.dockerignore`
(el contexto de build de Compose es por servicio, asi que un `.dockerignore`
unico en la raiz no se aplicaria a ninguno).

```
adso-temas-api/
├── docker-compose.yml      <- lo redactas tu
├── temas-api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example        <- plantilla de variables
│   └── .env                <- tus credenciales reales (NO se sube)
└── temas-angular/
    ├── Dockerfile
    └── .dockerignore
```


```bash
cd temas-api
copy .env.example .env
```

Edita `.env` con la **cadena de conexion del Pooler** de Supabase
(*Project Settings -> Database -> Connection string -> URI*), no la
conexion directa. La directa resuelve unicamente IPv6 y falla en la
mayoria de las redes domesticas.

| Clave | Valor |
|-------|-------|
| `DB_HOST` | host del pooler, p. ej. `aws-0-us-east-1.pooler.supabase.com` |
| `DB_PORT` | `5432` (transaction pooler) o `6543` (session pooler) |
| `DB_NAME` | `postgres` |
| `DB_USERNAME` | `postgres.<project_ref>` |
| `DB_PASSWORD` | tu password de Supabase |
| `DB_SCHEMA` | `sena` |
| `GEMINI_API_KEY` | tu key de Google AI Studio (opcional) |
| `NODE_ENV` | `development` habilita el log SQL de TypeORM |
| `PORT` | `3000` |

### Levantar

```bash
docker compose up -d --build
docker compose ps      # espera api -> healthy
docker compose logs -f api
```

| Servicio | URL |
|----------|-----|
| Frontend | `http://localhost:4200` |
| API | `http://localhost:3000/api/v1` |

### Verificar

```bash
curl http://localhost:3000/api/v1/temas
docker compose down
```


### Notas de esta iteracion

- Sin `bind mount`: para ver un cambio hay que reconstruir
  (`--build`). El live reload con volumenes llega en la fase 2.
- Etapa unica en ambos Dockerfiles. El multietapa, el usuario no root y
  `nginx` sirviendo el `ng build` llegan en la fase 3.
- Las credenciales nunca se hornean en la imagen: `.env` esta excluido en
  `.dockerignore` y entra por `env_file` en tiempo de ejecucion.
- **Pendiente para la fase 3**: las rutas del router de Angular son
  `/api/v1/temas`, `/api/v1/aprendices` y `/api/v1/tema-aprendiz`
  (`src/main.ts`). Un `location /api` en nginx las proxearia hacia la API
  y romperia la navegacion. Habra que separar los prefijos antes de montar
  el proxy inverso.

---

## Estructura del Repositorio

```
/
├── docker-compose.yml     # Orquestacion (api + web)
├── temas-api/          # Backend NestJS
│   ├── src/
│   │   ├── temas/      # CRUD temas + Gemini
│   │   ├── aprendiz/   # CRUD aprendices
│   │   └── tema-aprendiz/  # Asignacion N:M
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
├── temas-angular/      # Frontend Angular
│   ├── src/app/
│   │   ├── temas/      # Gestion de temas + tips modal
│   │   ├── aprendices/ # Gestion de aprendices
│   │   └── tema-aprendiz/  # Asignacion intereses
│   ├── Dockerfile
│   └── .dockerignore
└── .gitignore
```
