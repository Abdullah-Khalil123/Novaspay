/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `KYC` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clientId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clientId` to the `KYC` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_clientId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "clientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_clientId_key" ON "Account"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "KYC_clientId_key" ON "KYC"("clientId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KYC" ADD CONSTRAINT "KYC_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
