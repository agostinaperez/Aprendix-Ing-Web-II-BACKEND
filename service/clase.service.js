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
    attachment: clase.attachment,
    vista: clase.vistas.length > 0 ? clase.vistas[0].vista : false,
  }));
};
