/*
  Warnings:

  - Added the required column `idUser` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "idUser" UUID NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "idUser" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idUser")
);

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
