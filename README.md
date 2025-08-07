# 🩺 Medical App - Full Stack (Angular + Express + MySQL + phpMyAdmin)

Este proyecto es una app médica full stack con Angular en el frontend y Express en el backend, usando MySQL como base de datos y phpMyAdmin para administración visual.

---

## 📁 Estructura del proyecto

```
medical-app/
├── backend/          # Express + EJS (API + servidor)
├── frontend/         # Angular (cliente)
├── .env              # Variables de entorno
├── docker-compose.yml
└── README.md
```

---

## 🚀 Requisitos

- Docker
- Docker Compose

---

## ⚙️ Configuración rápida

### 1. Clonar el repositorio

```bash
git clone <repo-url> medical-app
cd medical-app
```

### 2. Crear archivo `.env`

Copia y modifica si es necesario:

```env
# .env
NODE_ENV=development

# Backend
BACKEND_PORT=3000

# Frontend
FRONTEND_PORT=4200

# MySQL
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=medical_db
MYSQL_USER=medical_user
MYSQL_PASSWORD=secret

# phpMyAdmin
PHPMYADMIN_PORT=8080
```

### 3. Levantar los contenedores

```bash
docker-compose up --build
```

---

## 🌐 Accesos rápidos

| Servicio       | URL                    |
|----------------|------------------------|
| Frontend       | http://localhost:4200  |
| Backend API    | http://localhost:3000  |
| phpMyAdmin     | http://localhost:8080  |
| MySQL interno  | Host: `mysql`, puerto: `3306` |

---

## 🛠️ Desarrollo activo

Ambos servicios (`backend`, `frontend`) están en modo desarrollo con volúmenes, por lo que puedes hacer cambios en tiempo real sin reconstruir.

---

## 🧪 Notas adicionales


- Para resetear tu entorno localmente:

```bash
docker-compose down -v
```

---

## 📄 Licencia

MIT
