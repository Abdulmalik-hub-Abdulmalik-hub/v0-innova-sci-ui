import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Safe env getter that works in browser
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

// Create client
let client: SupabaseClient

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }
  })
} else {
  // Fallback to prevent crash
  console.warn('[Supabase] Using placeholder - env vars may be missing')
  client = createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
  )
}

export const supabase = client

export function isConfigured(): boolean {
  return !!(supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder'))
}

export const ADMIN_EMAIL = 'webuildandtarinbuilders@gmail.com'
