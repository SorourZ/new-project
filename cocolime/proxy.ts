// proxy.ts — Next.js 16+ route protection (replaces middleware.ts)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = ['/account', '/checkout']
// Routes that should redirect if already authenticated
const AUTH_ROUTES = ['/auth/login', '/auth/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth token in httpOnly cookie (set by backend)
  const hasSession = request.cookies.has('access_token')

  // Protect account & checkout routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!hasSession) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (hasSession) {
      return NextResponse.redirect(new URL('/account', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account/:path*',
    '/checkout/:path*',
    '/auth/:path*',
  ],
}
