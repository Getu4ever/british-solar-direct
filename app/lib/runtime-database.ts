export function getRuntimeDatabaseUrl() {
  const sources = [
    ['STORAGE_PRISMA_DATABASE_URL', process.env.STORAGE_PRISMA_DATABASE_URL?.trim()],
    ['STORAGE_POSTGRES_URL', process.env.STORAGE_POSTGRES_URL?.trim()],
    ['STORAGE_DATABASE_URL', process.env.STORAGE_DATABASE_URL?.trim()],
    ['DATABASE_URL', process.env.DATABASE_URL?.trim()],
  ] as const;

  const selected = sources.find(([, value]) => Boolean(value));
  return selected?.[1] ?? null;
}

export function isPostgresDatabaseUrl(databaseUrl: string | null) {
  return Boolean(databaseUrl && (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://')));
}
