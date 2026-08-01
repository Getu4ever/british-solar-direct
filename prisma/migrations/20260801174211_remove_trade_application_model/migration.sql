-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN "contactPhone" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "deliveryPostcode" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "productInterest" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "projectNotes" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "quantity" TEXT;

-- CreateTable
CREATE TABLE "ContactEnquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
