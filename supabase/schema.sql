-- ============================================================
-- Skema database untuk sistem inventory Kaos Polosan
-- Jalankan script ini di Supabase Dashboard > SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  nama_produk text not null,
  bahan text not null check (bahan in ('20s', '24s', '30s')),
  warna text not null,
  ukuran text not null check (ukuran in ('S', 'M', 'L', 'XL', 'XXL', 'XXXL')),
  stok integer not null default 0 check (stok >= 0),
  harga numeric(12, 2) not null default 0,
  stok_minimum integer not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index untuk pencarian & filter yang lebih cepat
create index if not exists idx_products_bahan on public.products (bahan);
create index if not exists idx_products_ukuran on public.products (ukuran);
create index if not exists idx_products_warna on public.products (warna);

-- Trigger untuk auto-update kolom updated_at setiap kali baris diubah
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- Untuk aplikasi internal/single-user, kita izinkan akses penuh
-- lewat anon key. Jika aplikasi akan diakses publik/banyak orang,
-- sebaiknya ganti policy ini dengan otentikasi (supabase auth).
-- ============================================================

alter table public.products enable row level security;

drop policy if exists "Public full access" on public.products;
create policy "Public full access"
  on public.products
  for all
  using (true)
  with check (true);

-- ============================================================
-- (Opsional) beberapa data contoh untuk mencoba aplikasi
-- ============================================================
insert into public.products (nama_produk, bahan, warna, ukuran, stok, harga, stok_minimum)
values
  ('Kaos Polos Combed', '30s', 'Hitam', 'M', 25, 45000, 10),
  ('Kaos Polos Combed', '30s', 'Hitam', 'L', 18, 45000, 10),
  ('Kaos Polos Combed', '24s', 'Putih', 'M', 4, 42000, 10),
  ('Kaos Polos Combed', '20s', 'Navy', 'XL', 12, 50000, 5)
on conflict do nothing;
