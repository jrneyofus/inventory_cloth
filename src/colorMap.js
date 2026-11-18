// Pemetaan nama warna umum (Bahasa Indonesia & Inggris) ke kode hex,
// dipakai untuk menampilkan bulatan swatch warna di tabel produk.
export const COLOR_MAP = {
  hitam: '#1C1C1C',
  putih: '#F5F5F0',
  navy: '#1F2A44',
  'biru dongker': '#1F2A44',
  biru: '#2D5FA6',
  'biru muda': '#8FB8E0',
  merah: '#C1352B',
  maroon: '#6E2A2A',
  marun: '#6E2A2A',
  hijau: '#4C7A3D',
  'hijau army': '#5A6B47',
  army: '#5A6B47',
  kuning: '#E0B23C',
  oren: '#D9772E',
  orange: '#D9772E',
  abu: '#8C8C88',
  'abu-abu': '#8C8C88',
  grey: '#8C8C88',
  gray: '#8C8C88',
  krem: '#D8CBAF',
  cream: '#D8CBAF',
  coklat: '#6B4A34',
  cokelat: '#6B4A34',
  brown: '#6B4A34',
  ungu: '#6A4C93',
  purple: '#6A4C93',
  pink: '#D98BA7',
  merahmuda: '#D98BA7',
  tosca: '#3E9C93',
  toska: '#3E9C93',
  mustard: '#C9A227',
  sand: '#C7B291',
}

export function colorToHex(name = '') {
  const key = name.trim().toLowerCase()
  return COLOR_MAP[key] || '#B9B2A0'
}
