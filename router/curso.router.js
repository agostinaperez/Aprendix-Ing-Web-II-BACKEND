import express from "express";
import * as cursoService from "../service/curso.service.js";

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Ruta relativa desde este archivo
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });
//chequeado
router.get("/all", async (req, res) => {
  try {
    const cursos = await cursoService.getAllCursos();
    res.json(cursos);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error al obtener los cursos", detalle: error.message });
  }
});

//chequeado
router.get("/alumno/:alumnoId", async (req, res) => {
  const alumnoId = Number(req.params.alumnoId);
  try {
    const cursos = await cursoService.getCursosByAlumnoId({ id: alumnoId });
    res.json(cursos);
  } catch (error) {
    console.log(error.status)
    if (error.status === 404) {
      res.status(404).json({ error: "Lo sentimos, no tienes inscripciones activas!", detalle: error.message });    
    } else {
      res.status(500).json({ error: "Error al obtener tus cursos", detalle: error.message });
    }
  }
});

//chequeado
router.get("/profesor/:profesorId", async (req, res) => {
  const profesorId = Number(req.params.profesorId);
  try {
    const cursos = await cursoService.getCursosByProfesorId({profesorId});
    res.json(cursos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error al obtener tus cursos", detalle: error.message });
  }
});
//chequeado
router.post("/new", upload.single('imagen'), async (req, res) => {
  try {
    const { titulo, descripcion, categoria, profesorId } = req.body;
    const imagenUrl = `/uploads/${req.file.filename}`;

    const nuevoCurso = await cursoService.createCurso({titulo, descripcion, categoria, profesorId, imagenUrl});
    res.json(nuevoCurso);
  } catch (error) {
    console.error("Error al crear el curso:", error);
    res.status(500).json({ error: "Error al crear el curso." });
  }
});

router.get("/count/:profesorId", async (req, res) => {
  const profesorId = Number(req.params.profesorId);
  try {
    const cursos = await cursoService.countCursosByProfesorId(profesorId);
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cursos", detalle: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const cursoId = parseInt(req.params.id);

  try {
    cursoService.deleteCurso({cursoId});
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    console.log(error.message)
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
});

router.post("/edit/:id", upload.single('imagen'), async (req, res) => {
  try {
    const cursoId = parseInt(req.params.id);
    const { titulo, descripcion, categoria } = req.body;
    let imagenUrl;

    if (req.file) {
      imagenUrl = `/uploads/${req.file.filename}`;
    }

    const cursoActualizado = await cursoService.updateCurso({
      id: cursoId,
      titulo,
      descripcion,
      categoria,
      imagenUrl,
    });

    res.json(cursoActualizado);
  } catch (error) {
    console.error("Error al editar el curso:", error);
    res.status(500).json({ error: "Error al editar el curso." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cursoId = parseInt(req.params.id);
    const curso = await cursoService.getCursoById({cursoId});
    res.json(curso);
  } catch (error) {
    console.error("Error al editar el curso:", error);
    res.status(500).json({ error: "Error al editar el curso." });
  }
});

export default router;
