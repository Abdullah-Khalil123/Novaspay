-- CreateTable
CREATE TABLE "OnBoarding" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT,
    "accountErrorMessage" TEXT,
    "bankAccountStatusMsg" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnBoarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VA" (
    "id" SERIAL NOT NULL,
    "purpose" TEXT,
    "currency" TEXT,
    "paymentMethod" TEXT,
    "headquaters" TEXT,
    "state" TEXT,
    "city" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "businessCategory" TEXT,
    "region" TEXT,
    "fundingSource" TEXT,
    "storePhotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "declineReason" TEXT,
    "status" TEXT DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "loginTime" TIMESTAMP(3),
    "type" TEXT,
    "country" TEXT,
    "email" TEXT,
    "agentName" TEXT,
    "bankAccountNumber" TEXT,
    "description" TEXT,
    "invitationCode" TEXT,
    "accountInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);
