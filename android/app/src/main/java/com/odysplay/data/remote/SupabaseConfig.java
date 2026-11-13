package com.odysplay.data.remote;

/**
 * Supabase Configuration for OdysPlay.
 * Place your Supabase Project URL and Anon/Public Key here or configure them via gradle.properties / BuildConfig.
 *
 * NOTE: Never commit service_role secret keys to client-side mobile apps!
 * Use only the anon public key with Row Level Security (RLS) enabled on your tables.
 */
public class SupabaseConfig {

    // Configure your real Supabase Project credentials here:
    public static final String SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
    public static final String SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_PUBLIC_KEY";

    public static boolean isConfigured() {
        return SUPABASE_URL != null &&
               !SUPABASE_URL.contains("YOUR_PROJECT_ID") &&
               SUPABASE_ANON_KEY != null &&
               !SUPABASE_ANON_KEY.contains("YOUR_SUPABASE_ANON_PUBLIC_KEY") &&
               !SUPABASE_ANON_KEY.trim().isEmpty();
    }
}
