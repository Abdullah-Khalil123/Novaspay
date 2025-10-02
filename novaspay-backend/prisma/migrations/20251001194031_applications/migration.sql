-- CreateTable
CREATE TABLE "Applications" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER,
    "area" TEXT,
    "vaBankAccount" TEXT,
    "transactionType" TEXT,
    "toCurrency" TEXT,
    "amount" DOUBLE PRECISION,
    "cryptoAddress" TEXT,
    "referenceRate" DOUBLE PRECISION,
    "totalAmount" DOUBLE PRECISION,
    "estimatedFee" DOUBLE PRECISION,
    "estimatedAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
