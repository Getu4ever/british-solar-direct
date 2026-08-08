import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import { getRuntimeDatabaseUrl, isPostgresDatabaseUrl } from './runtime-database';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function resolveSqliteUrl(configuredDatabaseUrl?: string | null) {
  const fallbackUrl = process.env.NODE_ENV === 'production' ? 'file:/tmp/dev.db' : 'file:./dev.db';
  const databaseUrl = configuredDatabaseUrl || fallbackUrl;

  if (!databaseUrl.startsWith('file:')) {
    return { databaseUrl, filePath: null as string | null };
  }

  const rawPath = databaseUrl.slice('file:'.length);
  const absolutePath = path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(process.cwd(), rawPath);

  const writablePath =
    process.env.NODE_ENV === 'production' && !absolutePath.startsWith('/tmp/')
      ? path.join('/tmp', path.basename(absolutePath) || 'dev.db')
      : absolutePath;

  return {
    databaseUrl: `file:${writablePath}`,
    filePath: writablePath,
  };
}

function migrateSqliteColumnRenames(db: InstanceType<typeof Database>) {
  const quoteColumns = db
    .prepare('PRAGMA table_info("QuoteRequest")')
    .all() as Array<{ name: string }>;

  if (
    quoteColumns.some((entry) => entry.name === 'companyName') &&
    !quoteColumns.some((entry) => entry.name === 'customerName')
  ) {
    db.exec(`ALTER TABLE "QuoteRequest" RENAME COLUMN "companyName" TO "customerName"`);
  }

  const contactColumns = db
    .prepare('PRAGMA table_info("ContactEnquiry")')
    .all() as Array<{ name: string }>;

  if (
    contactColumns.some((entry) => entry.name === 'companyName') &&
    !contactColumns.some((entry) => entry.name === 'propertyName')
  ) {
    db.exec(`ALTER TABLE "ContactEnquiry" RENAME COLUMN "companyName" TO "propertyName"`);
  }
}

function ensureSqliteSchema(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const db = new Database(filePath);

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS "QuoteRequest" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "customerName" TEXT NOT NULL,
        "contactEmail" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "ContactEnquiry" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "propertyName" TEXT,
        "email" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'contact_enquiry',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    migrateSqliteColumnRenames(db);

    const contactColumns = db
      .prepare('PRAGMA table_info("ContactEnquiry")')
      .all() as Array<{ name: string }>;

    if (!contactColumns.some((entry) => entry.name === 'type')) {
      db.exec(
        `ALTER TABLE "ContactEnquiry" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'contact_enquiry';`
      );
    }

    const quoteColumns = db
      .prepare('PRAGMA table_info("QuoteRequest")')
      .all() as Array<{ name: string }>;
    const requiredTextColumns = [
      'contactPhone',
      'deliveryPostcode',
      'productInterest',
      'quantity',
      'projectNotes',
      'propertyImages',
      'paymentTermsNotes',
      'invoiceSystemScope',
      'type',
    ];

    for (const column of requiredTextColumns) {
      if (!quoteColumns.some((entry) => entry.name === column)) {
        db.exec(`ALTER TABLE "QuoteRequest" ADD COLUMN "${column}" TEXT;`);
      }
    }

    const refreshedColumns = db
      .prepare('PRAGMA table_info("QuoteRequest")')
      .all() as Array<{ name: string }>;

    if (!refreshedColumns.some((entry) => entry.name === 'status')) {
      db.exec(`ALTER TABLE "QuoteRequest" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new_lead';`);
    }

    const booleanColumns: Array<{ name: string; defaultSql: string }> = [
      { name: 'panelsOrdered', defaultSql: '0' },
      { name: 'batteryInverterSecured', defaultSql: '0' },
      { name: 'scaffoldingBooked', defaultSql: '0' },
      { name: 'dnoFiled', defaultSql: '0' },
    ];

    for (const column of booleanColumns) {
      if (!refreshedColumns.some((entry) => entry.name === column.name)) {
        db.exec(
          `ALTER TABLE "QuoteRequest" ADD COLUMN "${column.name}" INTEGER NOT NULL DEFAULT ${column.defaultSql};`
        );
      }
    }

    const integerColumns = [
      'agreedTotalPricePence',
      'panelCostPence',
      'batteryInverterCostPence',
      'scaffoldingCostPence',
      'contractorLaborCostPence',
      'rackingCablesCostPence',
      'otherProjectDirectCostPence',
      'invoiceStage1DepositPence',
      'invoiceStage2HardwarePence',
      'invoiceStage3BalancePence',
    ];

    for (const column of integerColumns) {
      if (!refreshedColumns.some((entry) => entry.name === column)) {
        db.exec(`ALTER TABLE "QuoteRequest" ADD COLUMN "${column}" INTEGER;`);
      }
    }

    db.exec(`UPDATE "QuoteRequest" SET "status" = 'new_lead' WHERE "status" IS NULL OR "status" = '';`);
  } finally {
    db.close();
  }
}

function createPrismaClient() {
  const configuredDatabaseUrl = getRuntimeDatabaseUrl();
  const { databaseUrl, filePath } = resolveSqliteUrl(configuredDatabaseUrl);

  if (isPostgresDatabaseUrl(configuredDatabaseUrl)) {
    throw new Error('Postgres runtime is handled by the production lead store');
  }

  if (filePath) {
    ensureSqliteSchema(filePath);
  }

  const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
