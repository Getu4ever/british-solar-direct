-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN "rackingCablesCostPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "otherProjectDirectCostPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "invoiceSystemScope" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "invoiceStage1DepositPence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "invoiceStage2HardwarePence" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN "invoiceStage3BalancePence" INTEGER;
