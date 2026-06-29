-- LastingWords Database Schema
-- Run this in your Supabase SQL Editor

create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  deceased_name text not null,
  input_data jsonb not null,
  generated_content text not null,
  status text default 'generated' check (status in ('generated', 'paid')),
  stripe_session_id text,
  paid_at timestamptz,
  revision_used boolean default false,
  revision_notes text,
  customer_email text
);

-- Enable RLS
alter table orders enable row level security;

-- No public access - only service role can read/write
create policy "Service role full access" on orders
  for all using (auth.role() = 'service_role');

-- Index for analytics queries
create index idx_orders_status on orders(status);
create index idx_orders_created_at on orders(created_at);
