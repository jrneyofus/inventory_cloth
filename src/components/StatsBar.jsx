function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n || 0)
}

export default function StatsBar({ products }) {
  const totalVarian = products.length
  const totalStok = products.reduce((sum, p) => sum + (p.stok || 0), 0)
  const stokMenipis = products.filter((p) => p.stok <= (p.stok_minimum ?? 5)).length
  const nilaiInventory = products.reduce((sum, p) => sum + (p.stok || 0) * (p.harga || 0), 0)

  const items = [
    { label: 'Total varian', value: totalVarian, accent: 'text-tinta' },
    { label: 'Total stok (pcs)', value: totalStok.toLocaleString('id-ID'), accent: 'text-indigo' },
    {
      label: 'Stok menipis',
      value: stokMenipis,
      accent: stokMenipis > 0 ? 'text-jahit' : 'text-sage',
    },
    { label: 'Nilai inventory', value: formatRupiah(nilaiInventory), accent: 'text-tinta' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white border border-garis rounded-xl px-4 py-3.5"
        >
          <p className="text-xs uppercase tracking-wide text-tinta/50 font-tag mb-1">
            {item.label}
          </p>
          <p className={`text-xl sm:text-2xl font-bold ${item.accent} truncate`}>{item.value}</p>
        </div>
      ))}
    </div>
  )
}
