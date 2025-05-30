import { console } from "inspector";
import prisma from "../prisma/client.js";

export const getAlumnos = async () => {
  return await prisma.usuario.findMany({
    where: { rol: "ALUMNO" },
  });
};

export const crearAlumno = async ({ nombre, email, usuario, password }) => {
  if (!nombre || !email || !password || !usuario) {
    throw new Error("Faltan campos obligatorios");
  }

  return await prisma.usuario.create({
    data: { nombre, email, usuario, password, rol: "ALUMNO" },
  });
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Faltan email o contraseña");
  }

  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    const err = new Error("Usuario o contraseña incorrectos");
    err.statusCode = 401;
    throw err;
  }

  return user;
};
