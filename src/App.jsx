import { useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Filters from './components/Filters'
import ProductTable from './components/ProductTable'
import ProductFormModal from './components/ProductFormModal'
import ConfirmDialog from './components/ConfirmDialog'
import Toast from './components/Toast'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [search, setSearch] = useState('')
  const [bahan, setBahan] = useState('Semua')
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)

  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  const [toast, setToast] = useState(null)

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2800)
  }

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('nama_produk', { ascending: true })
      .order('warna', { ascending: true })

    if (error) {
      showToast(`Gagal memuat data: ${error.message}`, 'error')
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (bahan !== 'Semua' && p.bahan !== bahan) return false
      if (showLowStockOnly && p.stok > (p.stok_minimum ?? 5)) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        const haystack = `${p.nama_produk} ${p.warna} ${p.ukuran} ${p.bahan}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [products, search, bahan, showLowStockOnly])

  function openAddForm() {
    setEditingProduct(null)
    setFormOpen(true)
  }

  function openEditForm(product) {
    setEditingProduct(product)
    setFormOpen(true)
  }

  async function handleFormSubmit(values) {
    setSaving(true)
    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(values)
        .eq('id', editingProduct.id)

      if (error) {
        showToast(`Gagal menyimpan perubahan: ${error.message}`, 'error')
      } else {
        showToast('Perubahan produk disimpan.')
        setFormOpen(false)
        fetchProducts()
      }
    } else {
      const { error } = await supabase.from('products').insert(values)

      if (error) {
        showToast(`Gagal menambah produk: ${error.message}`, 'error')
      } else {
        showToast('Produk baru berhasil ditambahkan.')
        setFormOpen(false)
        fetchProducts()
      }
    }
    setSaving(false)
  }

  async function handleAdjustStock(product, delta) {
    const newStok = Math.max(0, (product.stok || 0) + delta)

    // Optimistic update supaya terasa instan di UI
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stok: newStok } : p))
    )

    const { error } = await supabase
      .from('products')
      .update({ stok: newStok })
      .eq('id', product.id)

    if (error) {
      showToast(`Gagal memperbarui stok: ${error.message}`, 'error')
      fetchProducts()
    }
  }

  async function handleDeleteConfirmed() {
    if (!productToDelete) return
    setDeleting(true)
    const { error } = await supabase.from('products').delete().eq('id', productToDelete.id)

    if (error) {
      showToast(`Gagal menghapus produk: ${error.message}`, 'error')
    } else {
      showToast('Produk dihapus.')
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id))
    }
    setDeleting(false)
    setProductToDelete(null)
  }

  return (
    <div className="min-h-screen bg-kertas font-body text-tinta">
      <Header onAddClick={openAddForm} />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-6 space-y-6">
        <StatsBar products={products} />

        <Filters
          search={search}
          setSearch={setSearch}
          bahan={bahan}
          setBahan={setBahan}
          showLowStockOnly={showLowStockOnly}
          setShowLowStockOnly={setShowLowStockOnly}
        />

        <ProductTable
          products={filteredProducts}
          loading={loading}
          onAdjustStock={handleAdjustStock}
          onEdit={openEditForm}
          onDelete={setProductToDelete}
        />
      </main>

      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        saving={saving}
      />

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="Hapus produk ini?"
        description={
          productToDelete
            ? `"${productToDelete.nama_produk}" — ${productToDelete.warna}, ukuran ${productToDelete.ukuran} akan dihapus permanen dari daftar stok.`
            : ''
        }
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setProductToDelete(null)}
        loading={deleting}
      />

      <Toast toast={toast} />
    </div>
  )
}
