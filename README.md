# Gudang Kaos — Sistem Inventory Kaos Polosan

Aplikasi inventory sederhana untuk mencatat stok kaos polosan berdasarkan
bahan (20s, 24s, 30s), ukuran, dan warna. Dibangun dengan **Vite + React +
Tailwind CSS**, data disimpan di **Supabase**.

## Fitur

- Lihat semua stok kaos dalam satu tabel, lengkap dengan filter bahan,
  pencarian, dan filter "stok menipis".
- Tambah produk baru (nama, bahan, warna, ukuran, harga, stok awal, batas
  stok minimum).
- Ubah data produk & hapus produk.
- Tambah/kurangi stok cepat langsung dari tabel (tombol − / +).
- Ringkasan atas: total varian, total stok, jumlah stok menipis, dan
  estimasi nilai inventory.

## 1. Siapkan project Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, lalu jalankan seluruh isi file `supabase/schema.sql`
   yang ada di folder ini. Script ini akan membuat tabel `products`,
   index, trigger, kebijakan akses (RLS), dan beberapa data contoh.
3. Buka **Project Settings > API**, salin nilai `Project URL` dan
   `anon public key`.

> Catatan keamanan: schema di atas mengaktifkan RLS dengan policy "akses
> penuh" agar mudah dipakai untuk aplikasi internal toko. Jika aplikasi
> akan diakses banyak orang/publik, tambahkan Supabase Auth dan perketat
> policy-nya.

## 2. Jalankan aplikasi secara lokal

```bash
npm install
cp .env.example .env
```

Buka file `.env` yang baru dibuat, lalu isi dengan kredensial dari langkah
sebelumnya:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=isi-dengan-anon-key-anda
```

Lalu jalankan server pengembangan:

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

## 3. Build untuk produksi

```bash
npm run build
```

Hasil build akan ada di folder `dist/`, siap di-deploy ke Vercel, Netlify,
Cloudflare Pages, atau hosting statis lainnya. Jangan lupa atur environment
variable `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di platform
hosting yang dipakai.

## Struktur folder

```
kaos-inventory/
├─ index.html
├─ src/
│  ├─ App.jsx                 -> logika utama & pemanggilan Supabase
│  ├─ supabaseClient.js        -> koneksi ke Supabase
│  ├─ colorMap.js               -> pemetaan nama warna ke swatch
│  └─ components/
│     ├─ Header.jsx
│     ├─ StatsBar.jsx
│     ├─ Filters.jsx
│     ├─ ProductTable.jsx
│     ├─ ProductFormModal.jsx
│     ├─ ConfirmDialog.jsx
│     └─ Toast.jsx
└─ supabase/
   └─ schema.sql               -> jalankan di SQL Editor Supabase
```

## Menambah pilihan bahan/ukuran baru

- Bahan dibatasi ke `20s`, `24s`, `30s` lewat `check constraint` di
  `supabase/schema.sql` dan daftar `BAHAN_OPTIONS` di
  `src/components/ProductFormModal.jsx`. Tambahkan bahan baru di kedua
  tempat tersebut bila diperlukan.
- Ukuran diatur lewat `UKURAN_OPTIONS` di file yang sama dan `check
  constraint` kolom `ukuran` di `schema.sql`.
