import express from "express";
import prisma from "../prisma/client.js";
import * as usuarioService from "../service/usuario.service.js";

const router = express.Router();

router.get("/alumnos/all", async (req, res) => {
  try {
    const alumnos = await usuarioService.getAlumnos();
    res.json(alumnos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener alumnos", detalle: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, username, password } = req.body;
    console.log(req.body);
    if (!nombre || !email || !password || !username) {
      console.log("entre al primer if");

      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    usuarioService.crearAlumno(nombre, email, username, password);

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email ya registrado" });
    }
    res
      .status(400)
      .json({ error: "Error al crear alumno", detalle: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("llegue al back");
  const { email, password } = req.body;

  try {
    const user = await usuarioService.login({ email, password });
    res.json({
      message: "Login correcto",
      user: {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({
      error: error.message || "Error interno",
    });
  }
});

export default router;
