import express from "express";
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
    const { nombre, email, usuario, password } = req.body;
    if (!nombre || !email || !password || !usuario) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoAlumno = usuarioService.crearAlumno({ nombre, email, usuario, password });

    res.status(201).json({
      message: "Bien! Se creó el alumno",
      nuevoAlumno: {
        usuario: nuevoAlumno.usuario,
      },
    });
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
    res.status(error.statusCode || 500).json({
      error: error.message || "Error interno",
    });
  }
});

export default router;
