create table if not exists contact_aanvragen (
  id          uuid primary key default gen_random_uuid(),
  naam        text not null,
  email       text not null,
  telefoon    text,
  hondenras   text,
  bericht     text not null,
  gelezen     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Alleen de service role mag aanvragen toevoegen en lezen
alter table contact_aanvragen enable row level security;

create policy "service role only" on contact_aanvragen
  using (false)
  with check (false);
