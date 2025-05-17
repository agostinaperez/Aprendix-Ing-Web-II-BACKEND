import express from 'express';
import prisma from '../prisma/client.js';

const router = express.Router();

// GET todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await prisma.alumno.findMany({
      include: { inscripciones: true },
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener alumnos', detalle: error.message });
  }
});

// POST crear alumno
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoAlumno = await prisma.alumno.create({
      data: { nombre, email, password },
    });

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email ya registrado' });
    }
    res.status(400).json({ error: 'Error al crear alumno', detalle: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ error: 'Faltan email o contraseña' });
  }

  try {
    const alumno = await prisma.alumno.findUnique({
      where: { email }
    });

    if (!alumno || alumno.password !== password) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    res.json({ message: 'Login correcto', alumno });

  } catch (error) {
    res.status(500).json({ error: 'Error interno', detalle: error.message });
  }
});

export default router;
