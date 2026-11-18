export default function Header({ onAddClick }) {
  return (
    <header className="border-b border-garis bg-kertas">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-tinta flex items-center justify-center font-tag font-bold text-lg shrink-0">
            GK
          </div>
          <div>
            <h1 className="font-tag font-bold text-xl sm:text-2xl tracking-tight leading-none">
              GUDANG KAOS
            </h1>
            <p className="text-sm text-tinta/60 mt-1">
              Kartu stok kaos polosan &mdash; bahan, ukuran &amp; warna
            </p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          className="bg-indigo hover:bg-indigo-dark text-kertas font-semibold px-4 py-2.5 rounded-lg text-sm sm:text-base transition-colors shrink-0"
        >
          + Tambah Produk
        </button>
      </div>
    </header>
  )
}
