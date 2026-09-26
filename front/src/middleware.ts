import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES_PREFIX = '/auth';
const DASHBOARD_REDIRECT = '/dashboard';
const LOGIN_REDIRECT = '/auth/login';
const REFRESH_COOKIE_KEY = 'REFRESH_KEY';
// Требуют авторизации только эти разделы. Остальные пути (лендинг, юридические страницы,
// несуществующие адреса) пропускаются: неизвестный путь должен отдавать 404, а не редирект на вход.
const PROTECTED_PREFIXES = ['/dashboard', '/profile'];

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function isRefreshTokenValid(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = matchesPrefix(pathname, AUTH_ROUTES_PREFIX);
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));

  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value;
  const isAuthenticated = refreshToken ? isRefreshTokenValid(refreshToken) : false;

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(DASHBOARD_REDIRECT, request.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\..*).*)',
  ],
};
