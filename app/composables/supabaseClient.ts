import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

const useSupabase = () => {
  if (!supabaseInstance) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl as string
    const supabaseAnonKey = config.public.supabaseAnonKey as string

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}

export default useSupabase;