import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSessionToken } from './app/lib/admin-token-edge';

const COOKIE_NAME = 'bsd_admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(COOKIE_NAME)?.value;
  const password = process.env.ADMIN_PASSWORD;
  const valid = await verifyAdminSessionToken(session, password);

  // Protect GA analytics API (JSON 401 — used by the admin dashboard widget).
  if (pathname.startsWith('/api/analytics')) {
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!valid) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/analytics/:path*'],
};
