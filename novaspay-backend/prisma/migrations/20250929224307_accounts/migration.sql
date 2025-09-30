-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "bankingName" TEXT,
    "currency" TEXT,
    "clientName" TEXT,
    "ibanNumber" TEXT,
    "balance" DOUBLE PRECISION DEFAULT 0,
    "realBalance" DOUBLE PRECISION DEFAULT 0,
    "accountNumber" TEXT,
    "accountName" TEXT,
    "bankingAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
