import prisma from '../prisma/client.js';

export const createInscripcion = async ({alumnoId, cursoId}) => {
    console.log("llegue al service");
  return await prisma.inscripcion.create({
      data: {
        alumno: { connect: { id: alumnoId } },
        curso: { connect: { id: cursoId } },
      },
    });
}