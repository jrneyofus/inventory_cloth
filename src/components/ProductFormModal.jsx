import { useEffect, useState } from 'react'

const BAHAN_OPTIONS = ['20s', '24s', '30s']
const UKURAN_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const EMPTY_FORM = {
  nama_produk: '',
  bahan: '20s',
  warna: '',
  ukuran: 'M',
  stok: 0,
  harga: 0,
  stok_minimum: 5,
}

export default function ProductFormModal({ open, onClose, onSubmit, initialData, saving }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...initialData } : EMPTY_FORM)
      setError('')
    }
  }, [open, initialData])

  if (!open) return null

  const isEdit = Boolean(initialData)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nama_produk.trim()) {
      setError('Nama produk wajib diisi.')
      return
    }
    if (!form.warna.trim()) {
      setError('Warna wajib diisi.')
      return
    }
    setError('')
    onSubmit({
      ...form,
      stok: Number(form.stok) || 0,
      harga: Number(form.harga) || 0,
      stok_minimum: Number(form.stok_minimum) || 0,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-tinta/40">
      <div className="bg-kertas w-full max-w-lg rounded-2xl border border-garis shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-garis">
          <h2 className="font-tag font-bold text-lg">
            {isEdit ? 'Ubah Produk' : 'Tambah Produk Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-tinta/50 hover:text-tinta text-xl leading-none"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <p className="text-sm text-jahit bg-jahit/10 border border-jahit/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
              Nama produk
            </label>
            <input
              type="text"
              value={form.nama_produk}
              onChange={(e) => update('nama_produk', e.target.value)}
              placeholder="Contoh: Kaos Polos Combed"
              className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
                Bahan
              </label>
              <select
                value={form.bahan}
                onChange={(e) => update('bahan', e.target.value)}
                className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
              >
                {BAHAN_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
                Ukuran
              </label>
              <select
                value={form.ukuran}
                onChange={(e) => update('ukuran', e.target.value)}
                className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
              >
                {UKURAN_OPTIONS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
              Warna
            </label>
            <input
              type="text"
              value={form.warna}
              onChange={(e) => update('warna', e.target.value)}
              placeholder="Contoh: Hitam, Navy, Maroon"
              className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
                Stok (pcs)
              </label>
              <input
                type="number"
                min="0"
                value={form.stok}
                onChange={(e) => update('stok', e.target.value)}
                className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
              />
            </div>
            <div>
              <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
                Stok minimum
              </label>
              <input
                type="number"
                min="0"
                value={form.stok_minimum}
                onChange={(e) => update('stok_minimum', e.target.value)}
                className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
              />
            </div>
            <div>
              <label className="block text-xs font-tag uppercase tracking-wide text-tinta/50 mb-1.5">
                Harga (Rp)
              </label>
              <input
                type="number"
                min="0"
                value={form.harga}
                onChange={(e) => update('harga', e.target.value)}
                className="w-full bg-white border border-garis rounded-lg px-3 py-2.5 text-sm focus:border-indigo"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-tinta/60 hover:bg-kertas2"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-indigo text-kertas hover:bg-indigo-dark disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
