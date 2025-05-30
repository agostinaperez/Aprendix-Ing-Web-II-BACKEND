/*
  Warnings:

  - Added the required column `descripcion` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Clase" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "archivo" TEXT NOT NULL,
    "vista" BOOLEAN NOT NULL DEFAULT false,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Clase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaseVista" (
    "id" SERIAL NOT NULL,
    "alumnoId" INTEGER NOT NULL,
    "claseId" INTEGER NOT NULL,
    "vista" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClaseVista_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClaseVista_alumnoId_claseId_key" ON "ClaseVista"("alumnoId", "claseId");

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseVista" ADD CONSTRAINT "ClaseVista_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseVista" ADD CONSTRAINT "ClaseVista_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
