/*
  Warnings:

  - The `status` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `KYC` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `VA` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'PENDING', 'FAILED', 'CANCELED', 'IN_REVIEW');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "status",
ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Applications" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "KYC" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "VA" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
