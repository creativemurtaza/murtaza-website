-- Personal Website Schema
-- Run this in your Supabase SQL editor to set up the database

-- Experience
create table experience (
  id text primary key,
  company text not null,
  role text not null,
  period text not null,
  description text,
  tags text[],
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Education
create table education (
  id text primary key,
  institution text not null,
  degree text not null,
  period text not null,
  description text,
  sort_order int default 0
);

-- Certifications
create table certifications (
  id text primary key,
  name text not null,
  issuer text not null,
  year text,
  sort_order int default 0
);

-- Skills
create table skills (
  id serial primary key,
  name text not null,
  category text not null check (category in ('business', 'design', 'technology', 'tools')),
  sort_order int default 0
);

-- Projects
create table projects (
  id text primary key,
  title text not null,
  category text not null check (category in ('product', 'development', 'animation', 'design')),
  description text,
  tags text[],
  status text,
  year text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Blog posts
create table blog_posts (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  tags text[],
  read_time text,
  published_at date,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table experience enable row level security;
alter table education enable row level security;
alter table certifications enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;

-- Public read policies
create policy "Public read experience" on experience for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read published posts" on blog_posts for select using (is_published = true);
