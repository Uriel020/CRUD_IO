/*
  Warnings:

  - You are about to drop the `forms` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_idUser_fkey";

-- DropTable
DROP TABLE "forms";

-- CreateTable
CREATE TABLE "resources" (
    "idResources" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idUser" UUID NOT NULL,
    "idEndpoint" UUID NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("idResources")
);

-- CreateTable
CREATE TABLE "endpoints" (
    "idEndpoint" UUID NOT NULL DEFAULT gen_random_uuid(),
    "delete" TEXT NOT NULL,
    "softDelete" TEXT NOT NULL,
    "update" TEXT NOT NULL,
    "create" TEXT NOT NULL,
    "find" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "endpoints_pkey" PRIMARY KEY ("idEndpoint")
);

-- CreateIndex
CREATE UNIQUE INDEX "resources_idEndpoint_key" ON "resources"("idEndpoint");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endpoints" ADD CONSTRAINT "endpoints_idEndpoint_fkey" FOREIGN KEY ("idEndpoint") REFERENCES "resources"("idEndpoint") ON DELETE RESTRICT ON UPDATE CASCADE;
