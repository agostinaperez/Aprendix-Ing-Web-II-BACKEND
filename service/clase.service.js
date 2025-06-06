import { console } from "inspector";
import prisma from "../prisma/client.js";

//me trae las clases del curso, incluyendo las que ya ví.
export const getClasesConVistaByCursoId = async (cursoId, alumnoId) => {
  const clases = await prisma.clase.findMany({
    where: {
      cursoId: cursoId,
    },
    include: {
      vistas: {
        where: {
          alumnoId: alumnoId,
        },
        select: {
          vista: true,
        },
      },
    },
    orderBy: { id: 'asc' },
  });

  return clases.map((clase) => ({
    id: clase.id,
    nombre: clase.nombre,
    descripcion: clase.descripcion,
    archivo: clase.archivo,
    vista: clase.vistas.length > 0 ? clase.vistas[0].vista : false,
  }));
};

export const createClase = async ({nombre, descripcion, cursoId, archivo}) => {
  return await prisma.clase.create({
    data: {
      nombre,
      descripcion,
      archivo: archivo,
      cursoId: parseInt(cursoId),
    },
  });
}

export const deleteClase = async ({claseId}) => {
  await prisma.clase.delete({
      where: { id: claseId },
  });
}