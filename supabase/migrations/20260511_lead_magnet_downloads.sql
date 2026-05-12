-- Lead magnet downloads tracking
-- Separate from website_leads — downloads are audience signals, not pipeline leads

create table if not exists public.lead_magnet_downloads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  guide_slug text not null,
  source_url text,
  ip_address text,
  user_agent text,
  consent boolean not null default true
);

-- RLS: server-side inserts only (via service role key)
alter table public.lead_magnet_downloads enable row level security;

-- No select/update/delete policies for anon — server-only access
create policy "Service role can insert lead magnet downloads"
  on public.lead_magnet_downloads
  for insert
  to service_role
  with check (true);

create policy "Service role can select lead magnet downloads"
  on public.lead_magnet_downloads
  for select
  to service_role
  using (true);
