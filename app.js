import express, { json } from 'express';
import cors from 'cors';

import alumnoRouter from './router/alumno.js';
import inscripcionRouter from './router/inscripcion.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(json());
app.use(cors());

// Rutas
app.use('/alumnos', alumnoRouter);
app.use('/inscripciones', inscripcionRouter);

app.get('/', (req, res) => {
  res.send('¡Servidor con Prisma y PostgreSQL activo!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//npm run dev
