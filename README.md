# 🚚 Transportista API

API para gestionar transportistas y envíos, desarrollada con **Node.js**, **TypeScript**, **Express**, **TypeORM**, **PostgreSQL** y **Redis**.

---

## 📌 Requisitos Previos

### 🔹 **Ejecutar en Local**

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 22 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 13 o superior)
- [Redis](https://redis.io/)

### 🔹 **Ejecutar con Docker**

Asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 **Ejecutar en Local**

### 1️⃣ **Clonar el Repositorio**

```sh
git clone https://github.com/JuanCamiloMartinezLopez/TransportistaApi.git
cd TransportistaApi
```

### 2️⃣ **Instalar Dependencias**

```sh
npm install
```

### 3️⃣ **Configurar las Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
# Configuración de PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=transportista_db

# Configuración de Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Configuración del Servidor
PORT=3000
```

### 4️⃣ **Iniciar PostgreSQL y Redis (Si no están corriendo)**

Ejecuta PostgreSQL y Redis en tu máquina local:

```sh
# Iniciar PostgreSQL (Linux)
sudo systemctl start postgresql

# Iniciar Redis (Linux)
sudo systemctl start redis
```

Si usas **Windows**, puedes iniciar PostgreSQL con **pgAdmin** y Redis con [Redis for Windows](https://github.com/microsoftarchive/redis/releases).

### 5️⃣ **Ejecutar la Aplicación**

```sh
npm run dev
```

La API estará disponible en:  
🔹 `http://localhost:3000`

---

## 🐳 **Ejecutar con Docker**

Si prefieres ejecutar la API con Docker, sigue estos pasos.

### 1️⃣ **Clonar el Repositorio**

```sh
git clone https://github.com/JuanCamiloMartinezLopez/TransportistaApi.git
cd TransportistaApi
```

### 2️⃣ **Construir y Levantar los Contenedores**

```sh
docker-compose up --build -d
```

Esto iniciará:
✅ PostgreSQL en `localhost:5432`  
✅ Redis en `localhost:6379`  
✅ La API en `localhost:3000`

### 3️⃣ **Verificar que los Contenedores Están Corriendo**

```sh
docker ps
```

### 4️⃣ **Ver Logs de la API**

```sh
docker logs -f api_service
```

### 5️⃣ **Detener los Contenedores**

```sh
docker-compose down
```

---

## 📡 **Endpoints Principales**

📌 Puedes probar los endpoints en **Postman** o con **cURL**.

### 🔹 **Obtener Transportistas**

```sh
curl -X GET http://localhost:3000/transportistas
```

### 🔹 **Crear un Nuevo Envío**

```sh
curl -X POST http://localhost:3000/envios \
     -H "Content-Type: application/json" \
     -d '{"usuarioId": 1, "direccionId": 2, "peso": 15.5, "tipoProducto": "Electrónicos"}'
```

### 🔹 **Ver Documentación Swagger**

Si la API tiene Swagger habilitado, accede a:
🔹 `http://localhost:3000/api-docs`

---

## ⚙️ **Comandos Útiles**

| Comando                | Descripción                            |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Ejecuta el servidor en modo desarrollo |
| `npm run build`        | Compila TypeScript a JavaScript        |
| `npm run start`        | Inicia la aplicación en producción     |
| `docker-compose up -d` | Levanta la API con Docker              |
| `docker-compose down`  | Detiene los contenedores de Docker     |

---

## 📌 **Notas**

- Asegúrate de que los puertos **5432 (PostgreSQL)** y **6379 (Redis)** no estén ocupados antes de ejecutar la API.
- Si hay problemas con Docker, prueba limpiar los contenedores con:
  ```sh
  docker-compose down --volumes
  ```

---

## 📜 **Licencia**

Este proyecto está bajo la **MIT License**.

---

🚀 **¡Listo! Ahora puedes ejecutar y probar la API en local o con Docker.** 🎯
