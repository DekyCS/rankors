import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

/**
 * Server-side utility to require authentication for a page
 * Use this in your server components or page.tsx files
 * 
 * @returns The session object if authenticated
 */
export async function requireAuth() {
  // Use the existing server-side Supabase client that's already working
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login page without any parameters
    redirect('/login')
  }

  return session
}
