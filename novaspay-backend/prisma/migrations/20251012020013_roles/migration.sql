/*
  Warnings:

  - A unique constraint covering the columns `[invitedById]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviterId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "invitedById" TEXT;

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "inviterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "Client_invitedById_key" ON "Client"("invitedById");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "Invite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
