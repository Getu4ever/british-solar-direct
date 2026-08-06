-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new_lead';
ALTER TABLE "QuoteRequest" ADD COLUMN "agreedTotalPricePence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "paymentTermsNotes" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "panelsOrdered" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuoteRequest" ADD COLUMN "batteryInverterSecured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuoteRequest" ADD COLUMN "scaffoldingBooked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuoteRequest" ADD COLUMN "dnoFiled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuoteRequest" ADD COLUMN "panelCostPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "batteryInverterCostPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "scaffoldingCostPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "contractorLaborCostPence" INTEGER;
