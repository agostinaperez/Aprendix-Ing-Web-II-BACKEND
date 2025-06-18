# Aprendix-Ing-Web-II
Trabajo Práctico integrador para la materia Ingeniería Web 2, 2025. Pérez López Agostina y Camila Doffo

Este es un proyecto backend desarrollado en Node.js usando Express.js como framework, PostgreSQL como base de datos, Prisma ORM para la interacción con la base de datos y Nodemon para el reinicio automático del servidor en desarrollo. Se añade además Nodemailer, quien permite la integración con Gmail para el envío de correos a los usuarios y Bcrypt, que permite la encriptación de contraseñas para mayor seguridad.

## Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Nodemon
- Nodemailer
- Bcrypt

---

## Instalación

### 1. Clonar el repositorio

gh repo clone agostinaperez/Aprendix-Ing-Web-II-BACKEND

### 2. Instalar dependencias
npm install

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/aprendix"

Reemplazá los valores con los datos de tu propia base de datos PostgreSQL.

---

### Inicializar Prisma

npx prisma init

Esto creará una carpeta `prisma/` con el archivo `schema.prisma` para definir tu modelo de base de datos.

### Generar el cliente de Prisma

Cada vez que se modifique el esquema Prisma:
npx prisma generate

---

* Ejecutar el servidor en modo producción:

npm start

* Abrir Prisma Studio para explorar la base de datos desde el navegador:

npx prisma studio

---

## Requisitos previos

* Tener Node.js y npm instalados.
* Tener PostgreSQL corriendo localmente.
* Haber creado la base de datos antes de correr las migraciones.

## En caso de error
- Corroborar que estén instalados bcrypt (npm install bcrypt), nodemon (npm install nodemon), nodemailer (npm install nodemailer), y dotenv (npm install dotenv)
---

(Este proyecto está en desarrollo).
