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