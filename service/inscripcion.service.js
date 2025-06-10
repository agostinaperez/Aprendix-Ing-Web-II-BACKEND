import prisma from '../prisma/client.js';

export const createInscripcion = async ({alumnoId, cursoId}) => {
    console.log("en insc service", cursoId);

  return await prisma.inscripcion.create({
      data: {
        alumno: { connect: { id: alumnoId } },
        curso: { connect: { id: cursoId } },
      },
    });
}

export const countAlumnosInscritos = async ({profesorId}) => {
  return await prisma.inscripcion.count({
      where: {
        curso: {
          profesorId: parseInt(profesorId),
        },
      },
    });
}