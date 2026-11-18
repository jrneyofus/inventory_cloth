export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-tinta/40">
      <div className="bg-kertas w-full max-w-sm rounded-2xl border border-garis shadow-xl p-6">
        <h3 className="font-tag font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-tinta/60 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-tinta/60 hover:bg-kertas2"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-jahit text-kertas hover:bg-jahit/90 disabled:opacity-60"
          >
            {loading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  )
}
