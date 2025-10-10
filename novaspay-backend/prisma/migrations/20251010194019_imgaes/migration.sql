/*
  Warnings:

  - You are about to drop the column `BackFacingImage` on the `KYC` table. All the data in the column will be lost.
  - You are about to drop the column `FrontFacingImage` on the `KYC` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KYC" DROP COLUMN "BackFacingImage",
DROP COLUMN "FrontFacingImage",
ADD COLUMN     "backFacingImage" TEXT,
ADD COLUMN     "frontFacingImage" TEXT;
