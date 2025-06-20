import cron from 'node-cron';
import { enviarRecordatorio } from '../service/mail.service.js';
import prisma from "../prisma/client.js";
import * as claseService from "../service/clase.service.js";


// Tarea que se ejecuta todos los días a las 9 AM

//para testear con el profe, cambiar por * * * * * para que se ejecute cada minuto
cron.schedule('0 9 * * *', async () => {
  console.log('Ejecutando verificación de clases vistas...');

  const tresDiasAtras = new Date();
  tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);
  //const cincoMinutosAtras = new Date(Date.now() - 5 * 60 * 1000);

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
      if (clasesVistas.length === 0) {
        enviarRecordatorio(inscripcion);
      }
    }

  } catch (error) {
    console.error('Error en la tarea de verificación de clases vistas:', error);
  }
});
