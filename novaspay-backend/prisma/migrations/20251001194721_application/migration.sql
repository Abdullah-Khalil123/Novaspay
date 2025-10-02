-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "approvalComments" TEXT,
ADD COLUMN     "approverId" INTEGER,
ADD COLUMN     "remark" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
