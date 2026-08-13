import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// True once the site owner has created a Supabase project and set the two
// environment variables above (in .env locally, or in Vercel's dashboard).
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// When not configured, `supabase` is null and every page falls back to the
// bundled static data (src/data/collegeData.ts) — the site never breaks,
// it just runs in "read-only demo" mode until a real backend is connected.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string)
  : null;

export const MEDIA_BUCKET = 'site-media';

/** Upload a file (image or video) to Supabase Storage and return its public URL. */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error('Backend not configured yet.');
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
