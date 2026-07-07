const SALT = 'bsd-admin';

export async function createAdminSessionToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}:${SALT}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyAdminSessionToken(
  session: string | undefined,
  password: string | undefined
): Promise<boolean> {
  if (!session || !password) return false;
  const expected = await createAdminSessionToken(password);
  return session === expected;
}
