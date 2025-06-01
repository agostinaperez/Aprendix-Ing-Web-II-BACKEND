import prisma from "../prisma/client.js";

export const getAllCursos = async () => {
  return await prisma.curso.findMany();
};

export const getCursosByAlumnoId = async ({ alumnoId }) => {
  return await prisma.curso.findMany({
    where: {
      inscripciones: {
        some: {
          alumnoId: alumnoId,
        },
      },
    },
  });
  //if cursos.length == 0 es pq el alumno no se inscribió a ningún curso
};

export const createCurso = async ({titulo, descripcion, categoria, profesorId, imagenUrl}) => {
  return await prisma.curso.create({
    data: {
      titulo,
      descripcion,
      categoria,
      imagen: imagenUrl,
      profesorId: parseInt(profesorId),
    },
  });
}