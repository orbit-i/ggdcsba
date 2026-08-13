# Government Girls Degree College Nawabshah — Official Website

Official web portal for Government Girls Degree College Nawabshah, District Shaheed Benazirabad, Sindh, Pakistan.

Includes academic programs, admissions info, fee structure, notice board, downloads, staff/HOD directory, facilities, photo & video gallery, contact, and grievance redressal — all manageable through an admin portal.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Build for Production

`npm run build` → output goes to `dist/`, ready to deploy on Vercel or any static host.

---

## Connecting the Backend (Database + Admin Login + Video Uploads)

The site works out of the box on bundled demo data — but to make the Notice
Board, Gallery/Video uploads, and Admin Portal actually save data
permanently, you need to connect a free Supabase project. This takes about
10 minutes and only needs to be done once.

### Step 1 — Create a Supabase account & project
1. Go to [supabase.com](https://supabase.com) → Sign up (free tier is enough).
2. Click **New Project**. Choose any name (e.g. `ggdc-nawabshah`), set a
   database password (save it somewhere safe), pick the region closest to
   Pakistan (e.g. Singapore), and create the project. Wait ~2 minutes for it
   to finish provisioning.

### Step 2 — Run the database schema
1. In your new project, open the **SQL Editor** (left sidebar).
2. Open the file `supabase/migrations/0001_init_schema.sql` from this
   project, copy its entire contents, paste into the SQL Editor, and click
   **Run**. This creates every table, security policy, and the media
   storage bucket the site needs.

### Step 3 — Create the admin login
1. In Supabase, go to **Authentication → Users → Add User**.
2. Enter the Principal/Admin's email and a password. This is now the login
   for `/admin` (or wherever the Administrative Portal link is) on the live
   website. You can add more admin users the same way at any time.

### Step 4 — Connect the website to your project
1. In Supabase, go to **Project Settings → API**. Copy the **Project URL**
   and the **anon / public** key (do NOT use the `service_role` key).
2. In Vercel: **Project → Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy the project on Vercel (Deployments → ⋯ → Redeploy).

That's it — the Notice Board, Gallery, Video uploads, and Admin Portal will
now read and write to your real database, and the admin login will require
the real email/password created in Step 3 instead of a demo PIN.

### Local development with the backend
Copy `.env.example` to `.env` and fill in the same two values, then
`npm run dev`.

### Notes
- Uploaded photos/videos are stored in Supabase Storage (`site-media`
  bucket), publicly viewable, admin-only upload/delete — free tier includes
  1GB storage and 2GB monthly bandwidth, sufficient for a college site.
  Videos are capped at 200MB per file at the database level (can be raised
  in the storage bucket settings if needed).
- Until Steps 1–4 are done, the site runs in **read-only demo mode** on the
  bundled sample data — nothing breaks, but admin changes won't be saved
  permanently and the login uses a temporary PIN shown on screen.
