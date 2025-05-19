/*
  Warnings:

  - You are about to drop the column `claseId` on the `Inscripcion` table. All the data in the column will be lost.
  - You are about to drop the `Alumno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profesor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cursoId` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ALUMNO', 'PROFESOR');

-- DropForeignKey
ALTER TABLE "Clase" DROP CONSTRAINT "Clase_profesorId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_alumnoId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_claseId_fkey";

-- AlterTable
ALTER TABLE "Inscripcion" DROP COLUMN "claseId",
ADD COLUMN     "cursoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Alumno";

-- DropTable
DROP TABLE "Clase";

-- DropTable
DROP TABLE "Profesor";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
