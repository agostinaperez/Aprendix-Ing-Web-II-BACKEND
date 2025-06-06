import prisma from "../prisma/client.js";

export const getAllCursos = async () => {
  return await prisma.curso.findMany({
    include: {
      profesor: true,
      clases: true,
    },
  });
};

//no se pq si no tengo inscripciones se rompe :(
export const getCursosByAlumnoId = async ({ id }) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: parseInt(id) },
    include: {
      inscripciones: {
        include: {
          curso: true,
        },
      },
    },
  });
  console.log("llegue al service");
  console.log(usuario.inscripciones);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  } else if (!usuario.inscripciones || usuario.inscripciones.length === 0) {
    return [];
  } else {
    return await usuario.inscripciones.map((ins) => ins.curso);
  }
};

export const getCursosByProfesorId = async ({ profesorId }) => {
  return await prisma.curso.findMany({
    where: {
      profesorId: profesorId,
    },
    include: {
      clases: true,
      profesor: true,
    },
  });
  //if cursos.length == 0 es pq el profe no creó cursos
};

export const createCurso = async ({
  titulo,
  descripcion,
  categoria,
  profesorId,
  imagenUrl,
}) => {
  return await prisma.curso.create({
    data: {
      titulo,
      descripcion,
      categoria,
      imagen: imagenUrl,
      profesorId: parseInt(profesorId),
    },
  });
};

export const countCursosByProfesorId = async ({ profesorId }) => {
  return await prisma.curso.count({
    where: {
      profesorId: profesorId,
    },
  });
};

export const deleteCurso = async ({cursoId}) => {
  await prisma.curso.delete({
      where: { id: cursoId },
  });
}

export const updateCurso = async ({id, titulo, descripcion, categoria, imagenUrl,}) => {
  const dataToUpdate = {
    titulo,
    descripcion,
    categoria,
  };
  if (imagenUrl) {
    dataToUpdate.imagen = imagenUrl;
  }

  return await prisma.curso.update({
    where: { id },
    data: dataToUpdate,
  });
};
