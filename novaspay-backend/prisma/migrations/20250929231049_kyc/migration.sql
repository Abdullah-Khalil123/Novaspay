-- CreateTable
CREATE TABLE "KYC" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "agentId" INTEGER,
    "status" TEXT DEFAULT 'pending',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KYC_pkey" PRIMARY KEY ("id")
);
