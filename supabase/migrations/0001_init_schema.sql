-- ============================================================================
-- Government Girls Degree College Nawabshah — Database Schema
-- Run this once in your Supabase project's SQL Editor (or via CLI) to set
-- up every table, storage bucket, and security policy the site needs.
-- ============================================================================

-- Helper: auto-update `updated_at` on row changes
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------
-- 1. NOTICES / ANNOUNCEMENTS (Notice Board)
-- ----------------------------------------------------------------------------
create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Admissions','Exams','Notice','Events','Urgent')),
  summary text not null,
  file_url text,
  is_new boolean not null default true,
  published_date date not null default current_date,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.notices enable row level security;
create policy "Public read notices" on public.notices for select to anon, authenticated using (true);
create policy "Admin write notices" on public.notices for insert to authenticated with check (true);
create policy "Admin update notices" on public.notices for update to authenticated using (true) with check (true);
create policy "Admin delete notices" on public.notices for delete to authenticated using (true);
create trigger notices_set_updated_at before update on public.notices for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. FACILITIES
-- ----------------------------------------------------------------------------
create table public.facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  category text not null check (category in ('Academic','Infrastructure','Technology','Sports & Culture','Security & Amenities')),
  icon_name text not null default 'Building2',
  highlight text,
  image_url text,
  features text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.facilities enable row level security;
create policy "Public read facilities" on public.facilities for select to anon, authenticated using (true);
create policy "Admin write facilities" on public.facilities for insert to authenticated with check (true);
create policy "Admin update facilities" on public.facilities for update to authenticated using (true) with check (true);
create policy "Admin delete facilities" on public.facilities for delete to authenticated using (true);
create trigger facilities_set_updated_at before update on public.facilities for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 3. GALLERY MEDIA (photos AND videos)
-- ----------------------------------------------------------------------------
create table public.gallery_media (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text not null check (media_type in ('photo','video')) default 'photo',
  category text not null check (category in ('Campus & Gardens','Events & Sports','Labs & Tech','Auditorium','Academics')),
  media_url text not null,
  thumbnail_url text,
  caption text,
  media_date date not null default current_date,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.gallery_media enable row level security;
create policy "Public read gallery" on public.gallery_media for select to anon, authenticated using (true);
create policy "Admin write gallery" on public.gallery_media for insert to authenticated with check (true);
create policy "Admin update gallery" on public.gallery_media for update to authenticated using (true) with check (true);
create policy "Admin delete gallery" on public.gallery_media for delete to authenticated using (true);
create trigger gallery_set_updated_at before update on public.gallery_media for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. HEADS OF DEPARTMENT
-- ----------------------------------------------------------------------------
create table public.hods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  department text not null,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.hods enable row level security;
create policy "Public read hods" on public.hods for select to anon, authenticated using (true);
create policy "Admin write hods" on public.hods for insert to authenticated with check (true);
create policy "Admin update hods" on public.hods for update to authenticated using (true) with check (true);
create policy "Admin delete hods" on public.hods for delete to authenticated using (true);
create trigger hods_set_updated_at before update on public.hods for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. DOWNLOADS (forms, prospectus, policies)
-- ----------------------------------------------------------------------------
create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Admission Forms','Academic Policies','Certificates & NOC','Prospectus','Challan')),
  file_url text not null,
  file_format text not null default 'PDF',
  size_label text,
  description text,
  updated_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.downloads enable row level security;
create policy "Public read downloads" on public.downloads for select to anon, authenticated using (true);
create policy "Admin write downloads" on public.downloads for insert to authenticated with check (true);
create policy "Admin update downloads" on public.downloads for update to authenticated using (true) with check (true);
create policy "Admin delete downloads" on public.downloads for delete to authenticated using (true);
create trigger downloads_set_updated_at before update on public.downloads for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 6. SANCTIONED POSTS
-- ----------------------------------------------------------------------------
create table public.sanctioned_posts (
  id uuid primary key default gen_random_uuid(),
  designation text not null,
  department text not null,
  sanctioned_quota int not null default 1,
  qualification_required text,
  role text,
  status text not null default 'Active Position',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.sanctioned_posts enable row level security;
create policy "Public read posts" on public.sanctioned_posts for select to anon, authenticated using (true);
create policy "Admin write posts" on public.sanctioned_posts for insert to authenticated with check (true);
create policy "Admin update posts" on public.sanctioned_posts for update to authenticated using (true) with check (true);
create policy "Admin delete posts" on public.sanctioned_posts for delete to authenticated using (true);
create trigger posts_set_updated_at before update on public.sanctioned_posts for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 7. GRIEVANCES (student/guardian submissions — write is public, read is admin-only)
-- ----------------------------------------------------------------------------
create table public.grievances (
  id uuid primary key default gen_random_uuid(),
  tracking_id text not null unique default upper(substr(md5(random()::text), 1, 8)),
  full_name text not null,
  contact_info text not null,
  category text not null,
  description text not null,
  status text not null default 'Submitted' check (status in ('Submitted','Under Review','Resolved','Rejected')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.grievances enable row level security;
-- Anyone can submit a grievance (student portal), but only admins can read/manage the list
create policy "Public can submit grievance" on public.grievances for insert to anon, authenticated with check (true);
create policy "Admin read grievances" on public.grievances for select to authenticated using (true);
create policy "Admin update grievances" on public.grievances for update to authenticated using (true) with check (true);
create policy "Admin delete grievances" on public.grievances for delete to authenticated using (true);
create trigger grievances_set_updated_at before update on public.grievances for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 8. SITE SETTINGS (single-row table: college info, principal/regional director messages)
-- ----------------------------------------------------------------------------
create table public.site_settings (
  id int primary key default 1,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
alter table public.site_settings enable row level security;
create policy "Public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admin update settings" on public.site_settings for update to authenticated using (true) with check (true);
create policy "Admin insert settings" on public.site_settings for insert to authenticated with check (true);
create trigger settings_set_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
insert into public.site_settings (id, data) values (1, '{}') on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 9. STORAGE BUCKET for media (images + videos, admin-uploaded)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('site-media', 'site-media', true, 209715200) -- 200 MB limit, enough for short campus videos
on conflict (id) do nothing;

create policy "Public read site-media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-media');

create policy "Admin upload site-media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-media');

create policy "Admin update site-media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-media');

create policy "Admin delete site-media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-media');

-- ============================================================================
-- IMPORTANT — Creating your first admin login:
-- This schema does NOT create a login for you. After running this file:
--   1. Go to Authentication → Users in your Supabase dashboard
--   2. Click "Add User" → enter the Principal/Admin's email and a password
--   3. That email + password is now used to log into /admin on the website
-- Any number of admin users can be added the same way — no code changes needed.
-- ============================================================================
