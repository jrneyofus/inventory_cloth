const BAHAN_LIST = ['Semua', '20s', '24s', '30s']

export default function Filters({ search, setSearch, bahan, setBahan, showLowStockOnly, setShowLowStockOnly }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama produk, warna, atau ukuran..."
          className="w-full bg-white border border-garis rounded-lg pl-4 pr-4 py-2.5 text-sm focus:border-indigo transition-colors"
        />
      </div>

      <div className="flex items-center gap-1.5 bg-white border border-garis rounded-lg p-1 shrink-0">
        {BAHAN_LIST.map((b) => (
          <button
            key={b}
            onClick={() => setBahan(b)}
            className={`font-tag text-xs sm:text-sm px-3 py-1.5 rounded-md transition-colors ${
              bahan === b
                ? 'bg-indigo text-kertas'
                : 'text-tinta/60 hover:bg-kertas2'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm text-tinta/70 shrink-0 select-none cursor-pointer bg-white border border-garis rounded-lg px-3 py-2.5">
        <input
          type="checkbox"
          checked={showLowStockOnly}
          onChange={(e) => setShowLowStockOnly(e.target.checked)}
          className="accent-jahit w-4 h-4"
        />
        Stok menipis saja
      </label>
    </div>
  )
}
