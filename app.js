import "reflect-metadata"
const express = require('express');
const { AppDataSource } = require('./config/data-source');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");

    // Tus rutas aquí
    app.get('/', (req, res) => {
      res.send('¡Servidor con TypeORM y PostgreSQL activo!');
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error al conectar a la DB", error));

  /*EJEMPLO DE USO
  app.get('/alumnos', async (req, res) => {
  const alumnoRepo = AppDataSource.getRepository('Alumno');
  const alumnos = await alumnoRepo.find();
  res.json(alumnos);
});

app.post('/alumnos', async (req, res) => {
  const alumnoRepo = AppDataSource.getRepository('Alumno');
  const nuevo = alumnoRepo.create(req.body); // req.body debe tener nombre y correo
  const guardado = await alumnoRepo.save(nuevo);
  res.status(201).json(guardado);
});
PUEDO TENER MIS RUTAS EN OTRO LADO SEPARADO
  */