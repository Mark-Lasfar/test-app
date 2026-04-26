import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.cookies.has('__prerender_bypass')) {
    const url = request.nextUrl.clone()
    url.searchParams.set('_draft', Date.now().toString())
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/test', '/test/:path*'],
}