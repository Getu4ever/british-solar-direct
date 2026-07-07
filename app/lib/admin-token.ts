import { createHash, timingSafeEqual } from 'crypto';

const SALT = 'bsd-admin';

export function createAdminSessionToken(password: string): string {
  return createHash('sha256').update(`${password}:${SALT}`).digest('hex');
}

export function verifyAdminSessionToken(session: string | undefined, password: string | undefined): boolean {
  if (!session || !password) return false;

  const expected = createAdminSessionToken(password);

  try {
    const sessionBuf = Buffer.from(session);
    const expectedBuf = Buffer.from(expected);
    if (sessionBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(sessionBuf, expectedBuf);
  } catch {
    return false;
  }
}
