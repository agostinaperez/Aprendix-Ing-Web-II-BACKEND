import cron from 'node-cron';
import { enviarRecordatorio } from '../service/mail.service.js';
import prisma from "../prisma/client.js";
import * as claseService from "../service/clase.service.js";


// Tarea que se ejecuta todos los días a las 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Ejecutando verificación de clases vistas...');

  const tresDiasAtras = new Date();
  tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

  try {
    const inscripciones = await prisma.inscripcion.findMany({
      where: {
        fecha: {
          lte: tresDiasAtras,
        },
      },
      include: {
        alumno: true,
        curso: true,
      },
    });

    for (const inscripcion of inscripciones) {
        let cursoId = inscripcion.curso.id;
        let alumnoId = inscripcion.alumno.id;
      const clasesVistas = await claseService.getClasesVistasByAlumnoId({cursoId, alumnoId});

      if (!clasesVistas) {
        enviarRecordatorio(inscripcion);
      }
    }

  } catch (error) {
    console.error('Error en la tarea de verificación de clases vistas:', error);
  }
});
