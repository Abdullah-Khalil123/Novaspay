/*
  Warnings:

  - The `orderType` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('TRANSFER', 'WITHDRAWAL', 'DEPOSIT', 'PAYMENT', 'EXCHANGE', 'NONE');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "orderType",
ADD COLUMN     "orderType" "OrderType";
