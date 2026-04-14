import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const AUTH_ROUTES_PREFIX = '/auth';
const DASHBOARD_REDIRECT = '/dashboard';
const LOGIN_REDIRECT = '/auth/login';
const REFRESH_COOKIE_KEY = 'REFRESH_KEY';

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
  const refreshToken = request.cookies.get(REFRESH_COOKIE_KEY)?.value;
  const isAuthenticated = refreshToken ? isRefreshTokenValid(refreshToken) : false;
  const isAuthRoute = pathname.startsWith(AUTH_ROUTES_PREFIX);

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(DASHBOARD_REDIRECT, request.url));
  }

  if (!isAuthenticated && !isAuthRoute) {
    return NextResponse.redirect(new URL(LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
