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

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.usuario.create({
    data: { nombre, email, usuario, password: hashedPassword, rol: "ALUMNO" },
  });
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Faltan email o contraseña");
  }

  const user = await prisma.usuario.findUnique({
    where: { email },
  });
  
  if (!user) {
    const err = new Error("Usuario incorrecto");
    err.statusCode = 401;
    throw err;
  } else {
    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      const err = new Error('Usuario o contraseña incorrectos');
      err.statusCode = 401;
      throw err;
    }
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

    const passwordValida = await bcrypt.compare(passwordActual, user.password);

    if (!passwordValida) {
      const err = new Error('Usuario o contraseña incorrectos');
      err.statusCode = 401;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    dataToUpdate.password = hashedPassword;
  }

  return await prisma.usuario.update({
    where: { id },
    data: dataToUpdate,
  });
};

export const getUserById = async ({ id }) => {
  return await prisma.usuario.findUnique({
    where: {
      id: id,
    }
  });
}
