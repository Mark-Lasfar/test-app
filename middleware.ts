import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if Draft Mode cookie exists (set by draftMode().enable())
  if (request.cookies.has('__prerender_bypass')) {
    const response = NextResponse.next()
    
    // Bypass all caching layers when Draft Mode is active
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    response.headers.set('x-middleware-cache', 'no-cache')
    
    return response
  }
  
  return NextResponse.next()
}