import prisma from "../prisma/client.js";

export const getAllCursos = async () => {
  return await prisma.curso.findMany({
    include: {
      profesor: true,
      clases: true,
    }
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
              profesor: true,
            },
          },
        },
      });
        console.log("llegue al service")
      console.log(usuario.inscripciones);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      } else if (!usuario.inscripciones || usuario.inscripciones.length === 0) {
              console.log("entre a error 404 del router")

        return res.status(404).json({ error: 'Lo sentimos, no tienes inscripciones activas' });      
      } else {
         return await usuario.inscripciones.map(ins => ins.curso);
      }
  
   
};

export const getCursosByProfesorId = async ({ profesorId }) => {
  return await prisma.curso.findMany({
    where: {
      profesorId: profesorId,
      clases: true,
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