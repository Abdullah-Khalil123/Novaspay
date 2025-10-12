/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `OnBoarding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `VA` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OnBoarding" ADD COLUMN     "clientId" INTEGER;

-- AlterTable
ALTER TABLE "VA" ADD COLUMN     "clientId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "OnBoarding_clientId_key" ON "OnBoarding"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "VA_clientId_key" ON "VA"("clientId");

-- AddForeignKey
ALTER TABLE "OnBoarding" ADD CONSTRAINT "OnBoarding_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VA" ADD CONSTRAINT "VA_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
