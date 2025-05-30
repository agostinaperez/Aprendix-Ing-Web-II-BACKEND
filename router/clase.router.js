import express from "express";
import * as claseService from "../service/clase.service.js";

const router = express.Router();

router.get("/clases/:id", async (req, res) => { /*
A esto lo llamo tipo
const response = await fetch(`http://localhost:3000/clases/${cursoId}?alumnoId=${alumnoId}`);
const clases = await response.json();*/

const cursoId = Number(req.params.id);
const alumnoId = Number(req.query.alumnoId);
  try {
    const clases = await claseService.getClasesByCursoId(cursoId, alumnoId);
    res.json(clases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener clases", detalle: error.message });
  }
});

export default router;
