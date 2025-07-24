/*
  Warnings:

  - The primary key for the `resources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idResources` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP CONSTRAINT "resources_pkey",
DROP COLUMN "idResources",
ADD COLUMN     "idResource" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("idResource");
