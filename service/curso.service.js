import prisma from "../prisma/client.js";

export const getAllCursos = async () => {
  return await prisma.curso.findMany();
};

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
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
    return await usuario.inscripciones.map(ins => ins.curso);
};

export const getCursosByProfesorId = async ({ profesorId }) => {
  return await prisma.curso.findMany({
    where: {
      profesorId: profesorId,
    },
  });
  //if cursos.length == 0 es pq el profe no creó cursos
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