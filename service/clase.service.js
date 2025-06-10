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

export const getClasesByCursoId = async (cursoId) => {
  return await prisma.clase.findMany({
    where: {
      cursoId: cursoId,
    },
    orderBy: { id: 'asc' },
  });
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

export const setClaseVista = async ({claseId, alumnoId}) => {
  return await prisma.claseVista.upsert({
      where: {
        alumnoId_claseId: {
          alumnoId: parseInt(alumnoId),
          claseId: parseInt(claseId),
        },
      },
      update: {
        vista: true,
      },
      create: {
        alumnoId: parseInt(alumnoId),
        claseId: parseInt(claseId),
        vista: true,
      },
    });
}

export const getClasesVistasByAlumnoId = async ({cursoId, alumnoId}) => {
  return await prisma.claseVista.findMany({
      where: {
        alumnoId: parseInt(alumnoId),
        clase: {
          cursoId: parseInt(cursoId),
        },
        vista: true,
      },
    });
}