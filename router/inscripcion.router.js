import express from 'express';
import prisma from '../prisma/client.js';
import * as inscripcionService from "../service/inscripcion.service.js";
import { enviarMailInscripcion } from '../service/mail.service.js';


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const inscripciones = await prisma.inscripcion.findMany({
      include: { alumno: true, clase: true },
    });
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inscripciones', detalle: error.message });
  }
});

router.get('/alumnos-inscritos/:profesorId', async (req, res) => {
  try {
    const profesorId = Number(req.params.profesorId);
    const cantidadAlumnos = await inscripcionService.countAlumnosInscritos({profesorId});
    res.json(cantidadAlumnos);
  } catch (error) {
    res.status(500).json({
      error: 'Error al contar alumnos inscritos',
      detalle: error.message,
    });
  }
});

//chequeado
router.post('/new', async (req, res) => {
  try {
    const { alumnoId, cursoId } = req.body;
    const inscripcion = inscripcionService.createInscripcion({alumnoId, cursoId});
    await enviarMailInscripcion(alumnoId, cursoId);
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear inscripción', detalle: error.message });
  }
});

export default router;
