import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://crkifzbppbphkmscjbtj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNya2lmemJwcGJwaGttc2NqYnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2Njk5MDAsImV4cCI6MjA1ODI0NTkwMH0.02QcU06wNyB20JRpFioZd1Ou_I_6fE8YLJnN9egUXTk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})