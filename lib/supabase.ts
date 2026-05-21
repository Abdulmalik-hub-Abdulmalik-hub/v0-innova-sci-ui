import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function getEnv(key: string, fallback = ''): string {
  return process.env[key] || fallback
}

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://placeholder.supabase.co')
const supabaseKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'placeholder-key')

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export function isConfigured(): boolean {
  const url = getEnv('NEXT_PUBLIC_SUPABASE_URL')
  return !!(url && !url.includes('placeholder'))
}

export async function getCurrentUser() {
  if (!isConfigured()) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const ADMIN_EMAIL = 'webuildandtarinbuilders@gmail.com'
