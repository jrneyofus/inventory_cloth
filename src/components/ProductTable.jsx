import { colorToHex } from '../colorMap'

function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n || 0)
}

function BahanTag({ bahan }) {
  return (
    <span className="stitch-border text-indigo font-tag text-xs font-bold px-2 py-0.5 rounded">
      {bahan}
    </span>
  )
}

function StokGauge({ stok, stokMinimum }) {
  const isLow = stok <= stokMinimum
  const pct = Math.min(100, Math.round((stok / Math.max(stok, stokMinimum * 2, 1)) * 100))
  return (
    <div className="w-24">
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`font-bold text-sm ${isLow ? 'text-jahit' : 'text-tinta'}`}>{stok}</span>
        <span className="text-xs text-tinta/40">pcs</span>
      </div>
      <div className="h-1.5 w-full bg-garis rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isLow ? 'bg-jahit' : 'bg-sage'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function ProductTable({ products, onAdjustStock, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="text-center py-16 text-tinta/50 font-tag text-sm">
        Memuat data stok...
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-garis rounded-xl">
        <p className="font-tag text-tinta/60">Belum ada produk yang cocok.</p>
        <p className="text-sm text-tinta/40 mt-1">
          Coba ubah filter, atau tambahkan produk baru lewat tombol di atas.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-garis rounded-xl overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-kertas2 text-left text-xs uppercase tracking-wide text-tinta/50 font-tag">
              <th className="px-4 py-3 font-medium">Produk</th>
              <th className="px-4 py-3 font-medium">Bahan</th>
              <th className="px-4 py-3 font-medium">Warna</th>
              <th className="px-4 py-3 font-medium">Ukuran</th>
              <th className="px-4 py-3 font-medium">Stok</th>
              <th className="px-4 py-3 font-medium">Harga</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-garis">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-kertas/60 transition-colors align-middle">
                <td className="px-4 py-3 font-medium text-tinta">{p.nama_produk}</td>
                <td className="px-4 py-3">
                  <BahanTag bahan={p.bahan} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-tinta/20 shrink-0"
                      style={{ backgroundColor: colorToHex(p.warna) }}
                    />
                    <span className="text-tinta/80">{p.warna}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-tag font-bold text-tinta/80">{p.ukuran}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAdjustStock(p, -1)}
                      disabled={p.stok <= 0}
                      className="w-6 h-6 rounded-md border border-garis text-tinta/60 hover:bg-kertas2 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                      aria-label="Kurangi stok 1"
                    >
                      −
                    </button>
                    <StokGauge stok={p.stok} stokMinimum={p.stok_minimum ?? 5} />
                    <button
                      onClick={() => onAdjustStock(p, 1)}
                      className="w-6 h-6 rounded-md border border-garis text-tinta/60 hover:bg-kertas2 shrink-0"
                      aria-label="Tambah stok 1"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-tinta/70 whitespace-nowrap">
                  {formatRupiah(p.harga)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-xs font-medium text-indigo hover:underline"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="text-xs font-medium text-jahit hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
