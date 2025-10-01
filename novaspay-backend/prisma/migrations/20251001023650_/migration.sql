/*
  Warnings:

  - You are about to drop the column `totalReviews` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "clientId" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "clientId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalReviews";

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "password" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
