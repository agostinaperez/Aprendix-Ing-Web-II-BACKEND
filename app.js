import express, { json } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
require('dotenv').config();
require('./jobs/verificarClasesVistas');


import usuarioRouter from './router/usuario.router.js';
import inscripcionRouter from './router/inscripcion.router.js';
import cursoRouter from './router/curso.router.js';
import claseRouter from './router/clase.router.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/usuario', usuarioRouter);
app.use('/inscripcion', inscripcionRouter);
app.use('/curso', cursoRouter);
app.use('/clase', claseRouter);


app.get('/', (req, res) => {
  res.send('¡Servidor con Prisma y PostgreSQL activo!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//npm run dev
//npx nodemon app.js

