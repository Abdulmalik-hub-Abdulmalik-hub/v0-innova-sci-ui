import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Null-safe client initialization for build/CI environments
function getSupabaseEnvVar(key: string, fallback = ''): string {
  return process.env[key] || fallback
}

const supabaseUrl = getSupabaseEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://placeholder.supabase.co')
const supabaseAnonKey = getSupabaseEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'placeholder-key')

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
})

// Check if client is properly configured (not using placeholders)
export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && !url.includes('placeholder'))
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export const ADMIN_EMAIL = 'webuildandtarinbuilders@gmail.com'