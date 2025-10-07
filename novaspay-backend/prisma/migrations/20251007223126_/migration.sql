/*
  Warnings:

  - The `status` column on the `Applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusApplication" AS ENUM ('Approved', 'Rejected', 'Pending', 'InReview');

-- AlterTable
ALTER TABLE "Applications" DROP COLUMN "status",
ADD COLUMN     "status" "StatusApplication" NOT NULL DEFAULT 'Pending';
