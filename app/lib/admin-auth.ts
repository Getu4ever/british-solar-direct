import { cookies } from 'next/headers';
import { createAdminSessionToken, verifyAdminSessionToken } from './admin-token';

const COOKIE_NAME = 'bsd_admin_session';

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return verifyAdminSessionToken(session, password);
}

export async function setAdminSession(): Promise<void> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is not configured');

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createAdminSessionToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
