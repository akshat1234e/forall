// Environment variables - MUST be set in .env file
export const projectId = import.meta.env?.VITE_SUPABASE_PROJECT_ID || 'your-project-id';
export const publicAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!projectId || !publicAnonKey || projectId === 'your-project-id') {
  console.warn('Missing required environment variables: VITE_SUPABASE_PROJECT_ID and VITE_SUPABASE_ANON_KEY');
}