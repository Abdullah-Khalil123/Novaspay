/*
  Warnings:

  - You are about to drop the column `name` on the `KYC` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KYC" DROP COLUMN "name",
ADD COLUMN     "MiddleName" TEXT,
ADD COLUMN     "area" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "companyAddress" TEXT,
ADD COLUMN     "companyCity" TEXT,
ADD COLUMN     "companyCountry" TEXT,
ADD COLUMN     "companyStreet" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "corporateEmail" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "headquarters" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT;
