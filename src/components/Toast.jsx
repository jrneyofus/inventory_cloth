export default function Toast({ toast }) {
  if (!toast) return null

  const isError = toast.type === 'error'

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
      <div
        className={`px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg border ${
          isError
            ? 'bg-jahit text-kertas border-jahit'
            : 'bg-tinta text-kertas border-tinta'
        }`}
      >
        {toast.message}
      </div>
    </div>
  )
}
