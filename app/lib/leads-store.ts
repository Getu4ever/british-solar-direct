import { randomUUID } from 'crypto';
import { Pool } from 'pg';
import {
  getRuntimeDatabaseUrl,
  isPostgresDatabaseUrl,
} from './runtime-database';
import { normalizePipelineStatus, type PipelineStatus } from './project-finance';

type GlobalWithPg = typeof globalThis & {
  bsdPgPool?: Pool;
  bsdPgSchemaReady?: Promise<void>;
};

const globalWithPg = globalThis as GlobalWithPg;

async function getLocalPrisma() {
  const { prisma } = await import('./prisma');
  return prisma;
}

export type QuoteLeadRecord = {
  id: string;
  customerName: string;
  contactEmail: string;
  contactPhone: string | null;
  deliveryPostcode: string | null;
  productInterest: string | null;
  quantity: string | null;
  projectNotes: string | null;
  propertyImages: string | null;
  status: PipelineStatus;
  agreedTotalPricePence: number | null;
  paymentTermsNotes: string | null;
  panelsOrdered: boolean;
  batteryInverterSecured: boolean;
  scaffoldingBooked: boolean;
  dnoFiled: boolean;
  panelCostPence: number | null;
  batteryInverterCostPence: number | null;
  scaffoldingCostPence: number | null;
  contractorLaborCostPence: number | null;
  rackingCablesCostPence: number | null;
  otherProjectDirectCostPence: number | null;
  invoiceSystemScope: string | null;
  invoiceStage1DepositPence: number | null;
  invoiceStage2HardwarePence: number | null;
  invoiceStage3BalancePence: number | null;
  createdAt: Date;
};

export type ContactLeadRecord = {
  id: string;
  name: string;
  propertyName: string | null;
  email: string;
  message: string;
  createdAt: Date;
};

export type QuoteProjectPatch = {
  status?: PipelineStatus;
  agreedTotalPricePence?: number | null;
  paymentTermsNotes?: string | null;
  panelsOrdered?: boolean;
  batteryInverterSecured?: boolean;
  scaffoldingBooked?: boolean;
  dnoFiled?: boolean;
  panelCostPence?: number | null;
  batteryInverterCostPence?: number | null;
  scaffoldingCostPence?: number | null;
  contractorLaborCostPence?: number | null;
  rackingCablesCostPence?: number | null;
  otherProjectDirectCostPence?: number | null;
  invoiceSystemScope?: string | null;
  invoiceStage1DepositPence?: number | null;
  invoiceStage2HardwarePence?: number | null;
  invoiceStage3BalancePence?: number | null;
};

function getPgPool() {
  if (!globalWithPg.bsdPgPool) {
    globalWithPg.bsdPgPool = new Pool({
      connectionString: getRuntimeDatabaseUrl() ?? undefined,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  }

  return globalWithPg.bsdPgPool;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    return value === 'true' || value === '1' || value.toLowerCase() === 't';
  }
  return fallback;
}

function asNullableInt(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function mapQuoteRow(row: Record<string, unknown>): QuoteLeadRecord {
  return {
    id: String(row.id),
    customerName: String(row.customerName ?? ''),
    contactEmail: String(row.contactEmail ?? ''),
    contactPhone: (row.contactPhone as string | null) ?? null,
    deliveryPostcode: (row.deliveryPostcode as string | null) ?? null,
    productInterest: (row.productInterest as string | null) ?? null,
    quantity: (row.quantity as string | null) ?? null,
    projectNotes: (row.projectNotes as string | null) ?? null,
    propertyImages: (row.propertyImages as string | null) ?? null,
    status: normalizePipelineStatus(row.status as string | null | undefined),
    agreedTotalPricePence: asNullableInt(row.agreedTotalPricePence),
    paymentTermsNotes: (row.paymentTermsNotes as string | null) ?? null,
    panelsOrdered: asBoolean(row.panelsOrdered),
    batteryInverterSecured: asBoolean(row.batteryInverterSecured),
    scaffoldingBooked: asBoolean(row.scaffoldingBooked),
    dnoFiled: asBoolean(row.dnoFiled),
    panelCostPence: asNullableInt(row.panelCostPence),
    batteryInverterCostPence: asNullableInt(row.batteryInverterCostPence),
    scaffoldingCostPence: asNullableInt(row.scaffoldingCostPence),
    contractorLaborCostPence: asNullableInt(row.contractorLaborCostPence),
    rackingCablesCostPence: asNullableInt(row.rackingCablesCostPence),
    otherProjectDirectCostPence: asNullableInt(row.otherProjectDirectCostPence),
    invoiceSystemScope: (row.invoiceSystemScope as string | null) ?? null,
    invoiceStage1DepositPence: asNullableInt(row.invoiceStage1DepositPence),
    invoiceStage2HardwarePence: asNullableInt(row.invoiceStage2HardwarePence),
    invoiceStage3BalancePence: asNullableInt(row.invoiceStage3BalancePence),
    createdAt: new Date(String(row.createdAt)),
  };
}

async function migratePgColumnRenames(pool: Pool) {
  const quoteColumns = await pool.query<{ column_name: string }>(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'QuoteRequest'`
  );
  const quoteColNames = quoteColumns.rows.map((row) => row.column_name);

  if (quoteColNames.includes('companyName') && !quoteColNames.includes('customerName')) {
    await pool.query(`ALTER TABLE "QuoteRequest" RENAME COLUMN "companyName" TO "customerName"`);
  }

  const contactColumns = await pool.query<{ column_name: string }>(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'ContactEnquiry'`
  );
  const contactColNames = contactColumns.rows.map((row) => row.column_name);

  if (contactColNames.includes('companyName') && !contactColNames.includes('propertyName')) {
    await pool.query(`ALTER TABLE "ContactEnquiry" RENAME COLUMN "companyName" TO "propertyName"`);
  }
}

async function ensurePgLifecycleColumns(pool: Pool) {
  await pool.query(`
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'new_lead';
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "agreedTotalPricePence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "paymentTermsNotes" TEXT;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "panelsOrdered" BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "batteryInverterSecured" BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "scaffoldingBooked" BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "dnoFiled" BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "panelCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "batteryInverterCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "scaffoldingCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "contractorLaborCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "rackingCablesCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "otherProjectDirectCostPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "invoiceSystemScope" TEXT;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "invoiceStage1DepositPence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "invoiceStage2HardwarePence" INTEGER;
    ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "invoiceStage3BalancePence" INTEGER;
    UPDATE "QuoteRequest" SET "status" = 'new_lead' WHERE "status" IS NULL OR "status" = '';
  `);
}

async function ensurePgSchema() {
  if (!globalWithPg.bsdPgSchemaReady) {
    globalWithPg.bsdPgSchemaReady = (async () => {
      const pool = getPgPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "QuoteRequest" (
          "id" TEXT PRIMARY KEY,
          "customerName" TEXT NOT NULL,
          "contactEmail" TEXT NOT NULL,
          "contactPhone" TEXT,
          "deliveryPostcode" TEXT,
          "productInterest" TEXT,
          "quantity" TEXT,
          "projectNotes" TEXT,
          "propertyImages" TEXT,
          "status" TEXT NOT NULL DEFAULT 'new_lead',
          "agreedTotalPricePence" INTEGER,
          "paymentTermsNotes" TEXT,
          "panelsOrdered" BOOLEAN NOT NULL DEFAULT false,
          "batteryInverterSecured" BOOLEAN NOT NULL DEFAULT false,
          "scaffoldingBooked" BOOLEAN NOT NULL DEFAULT false,
          "dnoFiled" BOOLEAN NOT NULL DEFAULT false,
          "panelCostPence" INTEGER,
          "batteryInverterCostPence" INTEGER,
          "scaffoldingCostPence" INTEGER,
          "contractorLaborCostPence" INTEGER,
          "rackingCablesCostPence" INTEGER,
          "otherProjectDirectCostPence" INTEGER,
          "invoiceSystemScope" TEXT,
          "invoiceStage1DepositPence" INTEGER,
          "invoiceStage2HardwarePence" INTEGER,
          "invoiceStage3BalancePence" INTEGER,
          "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS "ContactEnquiry" (
          "id" TEXT PRIMARY KEY,
          "name" TEXT NOT NULL,
          "propertyName" TEXT,
          "email" TEXT NOT NULL,
          "message" TEXT NOT NULL,
          "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await migratePgColumnRenames(pool);
      await ensurePgLifecycleColumns(pool);
    })();
  }

  await globalWithPg.bsdPgSchemaReady;
}

export async function createQuoteLead(
  input: Omit<
    QuoteLeadRecord,
    | 'id'
    | 'createdAt'
    | 'status'
    | 'agreedTotalPricePence'
    | 'paymentTermsNotes'
    | 'panelsOrdered'
    | 'batteryInverterSecured'
    | 'scaffoldingBooked'
    | 'dnoFiled'
    | 'panelCostPence'
    | 'batteryInverterCostPence'
    | 'scaffoldingCostPence'
    | 'contractorLaborCostPence'
    | 'rackingCablesCostPence'
    | 'otherProjectDirectCostPence'
    | 'invoiceSystemScope'
    | 'invoiceStage1DepositPence'
    | 'invoiceStage2HardwarePence'
    | 'invoiceStage3BalancePence'
  >
) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(
      `INSERT INTO "QuoteRequest" (
        "id", "customerName", "contactEmail", "contactPhone", "deliveryPostcode",
        "productInterest", "quantity", "projectNotes", "propertyImages", "status"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        randomUUID(),
        input.customerName,
        input.contactEmail,
        input.contactPhone,
        input.deliveryPostcode,
        input.productInterest,
        input.quantity,
        input.projectNotes,
        input.propertyImages,
        'new_lead',
      ]
    );
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.quoteRequest.create({
    data: {
      ...input,
      status: 'new_lead',
    },
  });
}

export async function createContactLead(input: Omit<ContactLeadRecord, 'id' | 'createdAt'>) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(
      `INSERT INTO "ContactEnquiry" (
        "id", "name", "propertyName", "email", "message"
      ) VALUES ($1,$2,$3,$4,$5)`,
      [randomUUID(), input.name, input.propertyName, input.email, input.message]
    );
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.contactEnquiry.create({ data: input });
}

export async function getDashboardLeads(): Promise<{
  quotes: QuoteLeadRecord[];
  contacts: ContactLeadRecord[];
}> {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    const [quoteRows, contactRows] = await Promise.all([
      pool.query(`SELECT * FROM "QuoteRequest" ORDER BY "createdAt" DESC`),
      pool.query(`SELECT * FROM "ContactEnquiry" ORDER BY "createdAt" DESC`),
    ]);

    return {
      quotes: quoteRows.rows.map((row) => mapQuoteRow(row as Record<string, unknown>)),
      contacts: contactRows.rows.map((row) => ({
        id: row.id,
        name: row.name,
        propertyName: row.propertyName,
        email: row.email,
        message: row.message,
        createdAt: new Date(row.createdAt),
      })),
    };
  }

  const prisma = await getLocalPrisma();
  const [quotes, contacts] = await Promise.all([
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.contactEnquiry.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return {
    quotes: quotes.map((row) => mapQuoteRow(row as unknown as Record<string, unknown>)),
    contacts,
  };
}

export async function getQuoteLeadById(id: string): Promise<QuoteLeadRecord | null> {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    const result = await pool.query(`SELECT * FROM "QuoteRequest" WHERE "id" = $1 LIMIT 1`, [id]);
    if (!result.rows[0]) return null;
    return mapQuoteRow(result.rows[0] as Record<string, unknown>);
  }

  const prisma = await getLocalPrisma();
  const row = await prisma.quoteRequest.findUnique({ where: { id } });
  if (!row) return null;
  return mapQuoteRow(row as unknown as Record<string, unknown>);
}

export async function updateQuoteLead(input: {
  id: string;
  customerName: string;
  contactEmail: string;
  deliveryPostcode: string;
  quantity: string;
  productInterest?: string | null;
  projectNotes?: string | null;
}) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(
      `UPDATE "QuoteRequest"
       SET "customerName"=$2, "contactEmail"=$3, "deliveryPostcode"=$4, "quantity"=$5, "productInterest"=$6, "projectNotes"=$7
       WHERE "id"=$1`,
      [
        input.id,
        input.customerName,
        input.contactEmail,
        input.deliveryPostcode,
        input.quantity,
        input.productInterest ?? null,
        input.projectNotes ?? null,
      ]
    );
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.quoteRequest.update({
    where: { id: input.id },
    data: {
      customerName: input.customerName,
      contactEmail: input.contactEmail,
      deliveryPostcode: input.deliveryPostcode,
      quantity: input.quantity,
      productInterest: input.productInterest ?? null,
      projectNotes: input.projectNotes ?? null,
    },
  });
}

export async function updateQuoteProject(id: string, patch: QuoteProjectPatch) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    const current = await getQuoteLeadById(id);
    if (!current) {
      throw new Error('Quote not found');
    }

    const next = {
      status: patch.status ?? current.status,
      agreedTotalPricePence:
        patch.agreedTotalPricePence !== undefined
          ? patch.agreedTotalPricePence
          : current.agreedTotalPricePence,
      paymentTermsNotes:
        patch.paymentTermsNotes !== undefined
          ? patch.paymentTermsNotes
          : current.paymentTermsNotes,
      panelsOrdered: patch.panelsOrdered ?? current.panelsOrdered,
      batteryInverterSecured:
        patch.batteryInverterSecured ?? current.batteryInverterSecured,
      scaffoldingBooked: patch.scaffoldingBooked ?? current.scaffoldingBooked,
      dnoFiled: patch.dnoFiled ?? current.dnoFiled,
      panelCostPence:
        patch.panelCostPence !== undefined ? patch.panelCostPence : current.panelCostPence,
      batteryInverterCostPence:
        patch.batteryInverterCostPence !== undefined
          ? patch.batteryInverterCostPence
          : current.batteryInverterCostPence,
      scaffoldingCostPence:
        patch.scaffoldingCostPence !== undefined
          ? patch.scaffoldingCostPence
          : current.scaffoldingCostPence,
      contractorLaborCostPence:
        patch.contractorLaborCostPence !== undefined
          ? patch.contractorLaborCostPence
          : current.contractorLaborCostPence,
      rackingCablesCostPence:
        patch.rackingCablesCostPence !== undefined
          ? patch.rackingCablesCostPence
          : current.rackingCablesCostPence,
      otherProjectDirectCostPence:
        patch.otherProjectDirectCostPence !== undefined
          ? patch.otherProjectDirectCostPence
          : current.otherProjectDirectCostPence,
      invoiceSystemScope:
        patch.invoiceSystemScope !== undefined
          ? patch.invoiceSystemScope
          : current.invoiceSystemScope,
      invoiceStage1DepositPence:
        patch.invoiceStage1DepositPence !== undefined
          ? patch.invoiceStage1DepositPence
          : current.invoiceStage1DepositPence,
      invoiceStage2HardwarePence:
        patch.invoiceStage2HardwarePence !== undefined
          ? patch.invoiceStage2HardwarePence
          : current.invoiceStage2HardwarePence,
      invoiceStage3BalancePence:
        patch.invoiceStage3BalancePence !== undefined
          ? patch.invoiceStage3BalancePence
          : current.invoiceStage3BalancePence,
    };

    await pool.query(
      `UPDATE "QuoteRequest"
       SET "status"=$2,
           "agreedTotalPricePence"=$3,
           "paymentTermsNotes"=$4,
           "panelsOrdered"=$5,
           "batteryInverterSecured"=$6,
           "scaffoldingBooked"=$7,
           "dnoFiled"=$8,
           "panelCostPence"=$9,
           "batteryInverterCostPence"=$10,
           "scaffoldingCostPence"=$11,
           "contractorLaborCostPence"=$12,
           "rackingCablesCostPence"=$13,
           "otherProjectDirectCostPence"=$14,
           "invoiceSystemScope"=$15,
           "invoiceStage1DepositPence"=$16,
           "invoiceStage2HardwarePence"=$17,
           "invoiceStage3BalancePence"=$18
       WHERE "id"=$1`,
      [
        id,
        next.status,
        next.agreedTotalPricePence,
        next.paymentTermsNotes,
        next.panelsOrdered,
        next.batteryInverterSecured,
        next.scaffoldingBooked,
        next.dnoFiled,
        next.panelCostPence,
        next.batteryInverterCostPence,
        next.scaffoldingCostPence,
        next.contractorLaborCostPence,
        next.rackingCablesCostPence,
        next.otherProjectDirectCostPence,
        next.invoiceSystemScope,
        next.invoiceStage1DepositPence,
        next.invoiceStage2HardwarePence,
        next.invoiceStage3BalancePence,
      ]
    );
    return getQuoteLeadById(id);
  }

  const prisma = await getLocalPrisma();
  const updated = await prisma.quoteRequest.update({
    where: { id },
    data: {
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.agreedTotalPricePence !== undefined
        ? { agreedTotalPricePence: patch.agreedTotalPricePence }
        : {}),
      ...(patch.paymentTermsNotes !== undefined
        ? { paymentTermsNotes: patch.paymentTermsNotes }
        : {}),
      ...(patch.panelsOrdered !== undefined ? { panelsOrdered: patch.panelsOrdered } : {}),
      ...(patch.batteryInverterSecured !== undefined
        ? { batteryInverterSecured: patch.batteryInverterSecured }
        : {}),
      ...(patch.scaffoldingBooked !== undefined
        ? { scaffoldingBooked: patch.scaffoldingBooked }
        : {}),
      ...(patch.dnoFiled !== undefined ? { dnoFiled: patch.dnoFiled } : {}),
      ...(patch.panelCostPence !== undefined ? { panelCostPence: patch.panelCostPence } : {}),
      ...(patch.batteryInverterCostPence !== undefined
        ? { batteryInverterCostPence: patch.batteryInverterCostPence }
        : {}),
      ...(patch.scaffoldingCostPence !== undefined
        ? { scaffoldingCostPence: patch.scaffoldingCostPence }
        : {}),
      ...(patch.contractorLaborCostPence !== undefined
        ? { contractorLaborCostPence: patch.contractorLaborCostPence }
        : {}),
      ...(patch.rackingCablesCostPence !== undefined
        ? { rackingCablesCostPence: patch.rackingCablesCostPence }
        : {}),
      ...(patch.otherProjectDirectCostPence !== undefined
        ? { otherProjectDirectCostPence: patch.otherProjectDirectCostPence }
        : {}),
      ...(patch.invoiceSystemScope !== undefined
        ? { invoiceSystemScope: patch.invoiceSystemScope }
        : {}),
      ...(patch.invoiceStage1DepositPence !== undefined
        ? { invoiceStage1DepositPence: patch.invoiceStage1DepositPence }
        : {}),
      ...(patch.invoiceStage2HardwarePence !== undefined
        ? { invoiceStage2HardwarePence: patch.invoiceStage2HardwarePence }
        : {}),
      ...(patch.invoiceStage3BalancePence !== undefined
        ? { invoiceStage3BalancePence: patch.invoiceStage3BalancePence }
        : {}),
    },
  });

  return mapQuoteRow(updated as unknown as Record<string, unknown>);
}

export async function deleteQuoteLead(id: string) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(`DELETE FROM "QuoteRequest" WHERE "id" = $1`, [id]);
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.quoteRequest.delete({ where: { id } });
}

export async function updateContactLead(input: {
  id: string;
  name: string;
  email: string;
  message: string;
}) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(
      `UPDATE "ContactEnquiry"
       SET "name"=$2, "email"=$3, "message"=$4
       WHERE "id"=$1`,
      [input.id, input.name, input.email, input.message]
    );
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.contactEnquiry.update({
    where: { id: input.id },
    data: { name: input.name, email: input.email, message: input.message },
  });
}

export async function deleteContactLead(id: string) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(`DELETE FROM "ContactEnquiry" WHERE "id" = $1`, [id]);
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.contactEnquiry.delete({ where: { id } });
}
