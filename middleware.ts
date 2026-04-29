import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('[Middleware] URL:', request.url);
  console.log('[Middleware] SearchParams:', Object.fromEntries(request.nextUrl.searchParams));
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-debug-searchparams', JSON.stringify(Object.fromEntries(request.nextUrl.searchParams)));
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/test', '/api/render'], 
};