import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Define protected routes that require authentication
  const protectedRoutes = ['/', '/mail', '/write', '/dashboard']
  const { pathname } = request.nextUrl
  
  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // First, update the session (this handles refreshing tokens)
  const response = await updateSession(request)
  
  if (isProtectedRoute) {
    // Create a Supabase client using the request cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // This is handled by updateSession
          },
          remove(name: string, options: CookieOptions) {
            // This is handled by updateSession
          },
        },
      }
    )
    
    // Get the session - this will use the cookies from the request
    const { data: { session } } = await supabase.auth.getSession()
    
    // If no session exists, redirect to the login page without the redirectTo parameter
    if (!session) {
      const redirectUrl = new URL('/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}