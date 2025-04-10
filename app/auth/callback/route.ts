import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    
    try {
      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (err) {
      console.error('Exception during code exchange:', err)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect to the home page after successful authentication
  return NextResponse.redirect(new URL('/', request.url))
}
