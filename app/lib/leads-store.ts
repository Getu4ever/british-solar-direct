import { randomUUID } from 'crypto';
import { Pool } from 'pg';
import {
  getRuntimeDatabaseUrl,
  isPostgresDatabaseUrl,
} from './runtime-database';

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

function getPgPool() {
  if (!globalWithPg.bsdPgPool) {
    globalWithPg.bsdPgPool = new Pool({
      connectionString: getRuntimeDatabaseUrl() ?? undefined,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  }

  return globalWithPg.bsdPgPool;
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
    })();
  }

  await globalWithPg.bsdPgSchemaReady;
}

export async function createQuoteLead(input: Omit<QuoteLeadRecord, 'id' | 'createdAt'>) {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    await pool.query(
      `INSERT INTO "QuoteRequest" (
        "id", "customerName", "contactEmail", "contactPhone", "deliveryPostcode", "productInterest", "quantity", "projectNotes", "propertyImages"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
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
      ]
    );
    return;
  }

  const prisma = await getLocalPrisma();
  await prisma.quoteRequest.create({ data: input });
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

export async function getDashboardLeads(): Promise<{ quotes: QuoteLeadRecord[]; contacts: ContactLeadRecord[] }> {
  if (isPostgresDatabaseUrl(getRuntimeDatabaseUrl())) {
    await ensurePgSchema();
    const pool = getPgPool();
    const [quoteRows, contactRows] = await Promise.all([
      pool.query(`SELECT * FROM "QuoteRequest" ORDER BY "createdAt" DESC`),
      pool.query(`SELECT * FROM "ContactEnquiry" ORDER BY "createdAt" DESC`),
    ]);

    return {
      quotes: quoteRows.rows.map((row) => ({
        id: row.id,
        customerName: row.customerName,
        contactEmail: row.contactEmail,
        contactPhone: row.contactPhone,
        deliveryPostcode: row.deliveryPostcode,
        productInterest: row.productInterest,
        quantity: row.quantity,
        projectNotes: row.projectNotes,
        propertyImages: row.propertyImages,
        createdAt: new Date(row.createdAt),
      })),
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

  return { quotes, contacts };
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
