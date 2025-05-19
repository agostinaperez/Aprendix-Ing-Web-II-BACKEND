/*
  Warnings:

  - Added the required column `rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "rol" "Rol" NOT NULL;
