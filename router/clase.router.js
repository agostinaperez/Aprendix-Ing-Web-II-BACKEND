import express from "express";
import * as claseService from "../service/clase.service.js";

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


router.post("/new", upload.single('archivo'), async (req, res) => {
  try {
    const { nombre, descripcion, cursoId } = req.body;
    const archivo = `/uploads/${req.file.filename}`;

    const nuevaClase = await claseService.createClase({nombre, descripcion, cursoId, archivo});
    res.json(nuevaClase);
  } catch (error) {
    console.error("Error al crear la clase:", error);
    res.status(500).json({ error: "Error al crear el curso." });
  }
});

router.get("/:cursoId/:alumnoId", async (req, res) => { 
const cursoId = Number(req.params.cursoId);
const alumnoId = Number(req.params.alumnoId);
  try {
    const clases = await claseService.getClasesConVistaByCursoId(cursoId, alumnoId);
    res.json(clases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener clases", detalle: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const claseId = parseInt(req.params.id);

  try {
    claseService.deleteClase({claseId});
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    console.log(error.message)
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
});

router.get("/:cursoId", async (req, res) => { 
const cursoId = Number(req.params.cursoId);
  try {
    const clases = await claseService.getClasesByCursoId(cursoId);
    res.json(clases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener clases", detalle: error.message });
  }
});

router.post('/:claseId/vista', async (req, res) => {
  const { claseId } = Number(req.params.claseId);
  const { alumnoId } = req.body;

  try {
    const claseVista = await claseService.setClaseVista({claseId, alumnoId});

    res.json({ success: true, claseVista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar clase como vista' });
  }
});

router.get('/:cursoId/:alumnoId/clases-vistas', async (req, res) => {
  const { cursoId, alumnoId } = req.params;

  try {
    const clasesVistas = await claseService.getClasesVistasByAlumnoId({cursoId, alumnoId});

    const vioAlMenosUna = clasesVistas.length > 0;

    res.json({ vioAlMenosUna, clasesVistas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar clases vistas del curso' });
  }
});


export default router;
