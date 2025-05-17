import express from 'express';
import prisma from '../prisma/client.js';

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

router.post('/', async (req, res) => {
  try {
    const { alumnoId, claseId } = req.body;
    const inscripcion = await prisma.inscripcion.create({
      data: {
        alumno: { connect: { id: alumnoId } },
        clase: { connect: { id: claseId } },
      },
    });
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear inscripción', detalle: error.message });
  }
});

export default router;
