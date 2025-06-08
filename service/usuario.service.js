import { console } from "inspector";
import prisma from "../prisma/client.js";
import bcrypt from 'bcrypt';

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

export const updatePerfil = async ({id, nombre, usuario, email, passwordActual, nuevaPassword}) => {
  const dataToUpdate = {
    nombre,
    usuario,
    email,
    };
  if (nuevaPassword) {
    const user = await prisma.usuario.findUnique({ where: { id } });

    const passwordValida = passwordActual == user.password;
    if (!passwordValida) {
      throw new Error('Contraseña actual incorrecta');
    }

    dataToUpdate.password = nuevaPassword;
  }

  return await prisma.usuario.update({
    where: { id },
    data: dataToUpdate,
  });
};
