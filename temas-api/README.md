# 🗃️ Temas API — NestJS + TypeORM + PostgreSQL (Supabase)

API REST con CRUD completo para la tabla `sena.tema` en Supabase.

---

## 🏗️ Estructura del proyecto

```
temas-api/
├── src/
│   ├── main.ts                          # Bootstrap de la app
│   ├── app.module.ts                    # Módulo raíz + TypeORM config
│   └── temas/
│       ├── temas.module.ts              # Módulo de temas
│       ├── temas.controller.ts          # Rutas REST
│       ├── temas.service.ts             # Lógica de negocio
│       ├── dto/
│       │   ├── create-tema.dto.ts       # DTO creación (validado)
│       │   └── update-tema.dto.ts       # DTO actualización (parcial)
│       └── entities/
│           └── tema.entity.ts           # Entidad TypeORM → sena.tema
├── .env                                 # Variables de entorno
├── package.json
└── tsconfig.json
```

---

## ⚙️ Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo (con hot-reload)
npm run start:dev

# 3. Modo producción
npm run build && npm run start:prod
```

La API queda disponible en: `http://localhost:3000/api/v1`

---

## 📋 Endpoints del CRUD

| Método   | Ruta               | Descripción                          |
|----------|--------------------|--------------------------------------|
| `GET`    | `/api/v1/temas`    | Obtener todos los temas              |
| `GET`    | `/api/v1/temas/:id`| Obtener un tema por ID               |
| `POST`   | `/api/v1/temas`    | Crear un nuevo tema                  |
| `PUT`    | `/api/v1/temas/:id`| Reemplazar un tema (update completo) |
| `PATCH`  | `/api/v1/temas/:id`| Actualizar parcialmente un tema      |
| `DELETE` | `/api/v1/temas/:id`| Eliminar un tema                     |

---

## 📦 Ejemplos con curl

### Listar todos
```bash
curl http://localhost:3000/api/v1/temas
```

### Obtener por ID
```bash
curl http://localhost:3000/api/v1/temas/1
```

### Crear
```bash
curl -X POST http://localhost:3000/api/v1/temas \
  -H "Content-Type: application/json" \
  -d '{"nombreTema": "Programación Web"}'
```

### Actualizar (PUT completo)
```bash
curl -X PUT http://localhost:3000/api/v1/temas/1 \
  -H "Content-Type: application/json" \
  -d '{"nombreTema": "Programación Backend"}'
```

### Actualizar parcial (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/v1/temas/1 \
  -H "Content-Type: application/json" \
  -d '{"nombreTema": "Bases de Datos"}'
```

### Eliminar
```bash
curl -X DELETE http://localhost:3000/api/v1/temas/1
```

---

## 🔧 Variables de entorno (.env)

```env
DB_HOST=aws-1-us-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USERNAME=postgres.twhkiymjvhnutnwawrzg
DB_PASSWORD=Diegomg30499.
DB_SCHEMA=sena
PORT=3000
NODE_ENV=development
```

---

## 🛠️ Stack tecnológico

- **NestJS** — Framework principal
- **TypeORM** — ORM para PostgreSQL
- **class-validator** — Validación de DTOs
- **@nestjs/config** — Manejo de variables de entorno
- **pg** — Driver nativo de PostgreSQL

---

## ⚠️ Notas importantes

- `synchronize: false` está desactivado porque la tabla **ya existe** en la BD. Nunca activar en producción.
- SSL está habilitado con `rejectUnauthorized: false` porque Supabase Pooler lo requiere.
- El esquema `sena` se mapea directamente en la entidad con `@Entity({ name: 'tema', schema: 'sena' })`.
