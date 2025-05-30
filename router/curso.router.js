import express from "express";
import * as cursoService from "../service/curso.service.js";

const router = express.Router();

router.get("/cursos/all", async (req, res) => {
  try {
    const cursos = await cursoService.getAllCursos();
    res.json(cursos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los cursos", detalle: error.message });
  }
});

router.get("/clases/:alumnoId", async (req, res) => { /*
A esto lo llamo para obtener "Mis cursos"
const response = await fetch(`http://localhost:3000/clases/${alumnoId}?`);
const cursos = await response.json();*/

const alumnoId = Number(req.query.alumnoId);
  try {
    const cursos = await cursoService.getCursosByAlumnoId(alumnoId); //esto debeería llamar a inscripcion service quizás?
    res.json(cursos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener tus cursos", detalle: error.message });
  }
});

export default router;
