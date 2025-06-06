-- DropForeignKey
ALTER TABLE "Clase" DROP CONSTRAINT "Clase_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "ClaseVista" DROP CONSTRAINT "ClaseVista_alumnoId_fkey";

-- DropForeignKey
ALTER TABLE "ClaseVista" DROP CONSTRAINT "ClaseVista_claseId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_alumnoId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_cursoId_fkey";

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseVista" ADD CONSTRAINT "ClaseVista_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseVista" ADD CONSTRAINT "ClaseVista_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
