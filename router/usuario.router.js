import express from "express";
import * as usuarioService from "../service/usuario.service.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { enviarMailBienvenida } from '../service/mail.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

    const nuevoAlumno = await usuarioService.crearAlumno({ nombre, email, usuario, password });
    await enviarMailBienvenida(nuevoAlumno);
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

router.post("/edit/:id", upload.none(), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { nombre, usuario, email, passwordActual, nuevaPassword } = req.body;

    const perfilActualizado = await usuarioService.updatePerfil({
      id: userId,
      nombre, usuario, email, passwordActual, nuevaPassword,
    });

    res.json(perfilActualizado);
  } catch (error) {
    console.error("Error al editar el perfil:", error);
    res.status(500).json({ error: "Error al editar el perfil." });
  }
});

export default router;
