import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

const useDatabase = () => {
  if (!supabaseInstance) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl as string
    const supabaseAnonKey = config.public.supabaseAnonKey as string

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}

// TODO: Voir dans le futur pour assurer un singleton
export default useDatabase; 