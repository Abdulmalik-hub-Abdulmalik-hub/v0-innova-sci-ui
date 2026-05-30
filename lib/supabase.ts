import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Safe env getter
function getEnv(key: string): string {
  if (typeof process === 'undefined') return ''
  return process.env?.[key] || ''
}

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL')
const supabaseKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

// Validate at runtime
if (typeof window !== 'undefined' && !supabaseUrl) {
  console.error('[Supabase] FATAL: NEXT_PUBLIC_SUPABASE_URL missing!')
}

// Export null if not configured - app must check isConfigured()
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      }
    })
  : null

export function isConfigured(): boolean {
  return !!(supabaseUrl && supabaseKey && supabaseUrl.startsWith('http'))
}

export const ADMIN_EMAIL = 'webuildandtarinbuilders@gmail.com'
