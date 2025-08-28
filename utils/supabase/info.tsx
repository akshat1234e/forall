// Environment variables - MUST be set in .env file
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!projectId || !publicAnonKey) {
  throw new Error('Missing required environment variables: VITE_SUPABASE_PROJECT_ID and VITE_SUPABASE_ANON_KEY');
}