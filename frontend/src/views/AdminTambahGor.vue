<template>
  <div class="min-h-screen flex">

    <aside class="w-64 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white p-6 hidden md:block">
      <h2 class="text-2xl font-bold mb-10">🏸 Admin GOR</h2>
      <nav class="space-y-4">
        <RouterLink to="/admin" class="block hover:bg-orange-800 px-4 py-2 rounded transition">📊 Dashboard</RouterLink>
        <RouterLink to="/admin/tambah-gor" class="block bg-orange-800 px-4 py-2 rounded">➕ Tambah GOR</RouterLink>
        <RouterLink
            to="#"
            @click.prevent="handleLogout"
            class="block px-4 py-2 rounded hover:bg-orange-800 transition"
            >
            🚪 Logout
        </RouterLink>
      </nav>
    </aside>
    
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow border border-orange-200">
      <h1 class="text-2xl font-bold text-orange-700 mb-6">Tambah GOR Baru</h1>

      <form @submit.prevent="submitForm" class="space-y-5">
        <input v-model="nama" type="text" placeholder="Nama GOR" class="input" required />
        <input v-model.number="rating" type="number" min="1" max="5" step="0.1" placeholder="Rating (1-5)" class="input" required />
        <input v-model.number="hargaSewa" type="number" placeholder="Harga Sewa (Rp)" class="input" required />
        <input v-model.number="jumlahLapangan" type="number" placeholder="Jumlah Lapangan" class="input" required />

        <select v-model="jenisLapanganId" class="input" required>
          <option disabled value="">Pilih Jenis Lapangan</option>
          <option v-for="jenis in jenisLapanganList" :value="jenis.id" :key="jenis.id">
            {{ jenis.nama }} (Skor: {{ jenis.skor }})
          </option>
        </select>

        <div class="grid sm:grid-cols-2 gap-4">
        <div>
            <label class="block text-sm mb-1">Kota</label>
            <input v-model="kota" type="text" placeholder="Contoh: Depok" class="input" required />
        </div>
        <div>
            <label class="block text-sm mb-1">Provinsi</label>
            <input v-model="provinsi" type="text" placeholder="Contoh: Jawa Barat" class="input" required />
        </div>
        </div>

        <!-- Search -->
        <div>
          <label class="text-sm block mb-1">Cari Lokasi GOR:</label>
          <div class="flex gap-2">
            <input v-model="searchQuery" type="text" placeholder="Misal: GOR Sima Depok" class="input flex-1" />
            <button type="button" @click="cariLokasi" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Cari</button>
          </div>
          <!-- Hasil pencarian -->
        <div v-if="hasilPencarian.length > 0" class="bg-white border mt-2 rounded shadow">
        <ul>
            <li v-for="(r, i) in hasilPencarian" :key="i" @click="pilihLokasi(r)"
                class="px-4 py-2 hover:bg-orange-50 cursor-pointer border-b last:border-none text-sm">
            {{ r.formatted_address }}
            </li>
        </ul>
        </div>
        </div>

        

        <!-- Google Map -->
        <div>
          <div id="map" class="w-full h-64 rounded border"></div>
          <p v-if="alamatTerpilih" class="text-sm mt-2 text-gray-600">📌 Alamat: {{ alamatTerpilih }}</p>
          <p class="text-sm mt-2 text-gray-600">📍 Lat: {{ latitude }} | Lng: {{ longitude }}</p>
        </div>

        

        <!-- Fasilitas -->
        <div class="mt-6 space-y-6">
        <h2 class="text-lg font-semibold text-orange-700">Checklist Penilaian Fasilitas</h2>

        <div v-for="(items, kategori) in checklistItems" :key="kategori" class="border p-4 rounded-lg">
            <h3 class="text-md font-bold mb-2 capitalize text-orange-600">🛠 {{ kategori }}</h3>
            <div class="grid sm:grid-cols-2 gap-2 text-sm">
            <label v-for="item in items" :key="item" class="flex gap-2">
                <input type="checkbox" :value="item" v-model="checklist[kategori]" />
                <span>{{ item }}</span>
            </label>
            </div>
            <p class="text-sm text-gray-500 mt-2">
            Jumlah dipilih: {{ checklist[kategori].length }} &mdash;
            Skor: {{ hitungSkor(checklist[kategori].length, items.length) }}
            </p>
        </div>
        </div>

        <button type="submit" class="w-full py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
          Simpan GOR
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

let typingTimeout = null

const router = useRouter()
const toast = useToast()

// State
const nama = ref('')
const rating = ref()
const hargaSewa = ref()
const jumlahLapangan = ref()
const jenisLapanganId = ref('')
const latitude = ref(-6.2)
const longitude = ref(106.816)
const searchQuery = ref('')
const hasilPencarian = ref([])
const alamatTerpilih = ref('')
const kota = ref('')
const provinsi = ref('')

const checklist = ref({
  parkir: [],
  kamarMandi: [],
  kamarGanti: [],
  kantin: []
})

const checklistItems = {
  parkir: [
    '≥ 10 mobil / ≥ 20 motor',
    'Area motor terpisah',
    'Permukaan rata tidak berlubang',
    'Penjaga parkir',
    'Ada kanopi',
    'Tempat sampah',
    'CCTV',
    'Akses keluar-masuk mudah'
  ],
  kamarMandi: [
    'Air panas tersedia',
    'Air dingin tersedia',
    'Shower terpisah',
    '≥ 2 toilet/shower',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Tidak berbau/wangi',
    'Sabun/hand sanitizer tersedia',
    'Tempat sampah',
    'Pintu/kunci aman'
  ],
  kamarGanti: [
    'Luas ≥ 2 m²',
    '≥ 2 loker',
    'Cermin & wastafel',
    'Kursi/bangku tersedia',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Pencahayaan cukup',
    'Sabun/hand sanitizer tersedia',
    'Tempat sampah tertutup',
    'Pintu/loker aman'
  ],
  kantin: [
    '≥ 2 gerai makanan/minuman',
    'Variasi menu ≥ 5 jenis',
    'Meja & kursi memadai',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Pencahayaan cukup',
    'Tisu tersedia',
    'Tempat sampah',
    'WiFi atau stopkontak',
    'Pengawasan staff'
  ]
}

const fasilitas = ref({
  parkir: false,
  kamarMandi: false,
  kamarGanti: false,
  kantin: false
})

const hitungSkor = (jumlah, max) => {
  if (jumlah <= 2) return 0
  if (jumlah <= 5) return 1
  if (jumlah <= 7) return 2
  return 3
}

const jenisLapanganList = ref([
  { id: 'd852fac2-a743-4114-a428-7067091645e4', nama: 'Karpet Vinyl', skor: 3 },
  { id: '7bc42c09-c25a-4dea-a128-9c726852f049', nama: 'Vinyl', skor: 3 },
  { id: 'a548de65-0fe5-44f8-94d6-6f814cc13b6e', nama: 'Interlock', skor: 2 },
  { id: '5cea6755-b1ef-4777-9a68-f961927c7e55', nama: 'Premium Synthetic Rubber', skor: 2 },
  { id: 'a6b4dac0-815e-4b2f-ab8e-ffad066f8da0', nama: 'Lantai', skor: 1 }
])

const admin = JSON.parse(localStorage.getItem('user') || '{}')
const createdBy = admin.user_id || null

let map, marker

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user || user.role !== 'admin') {
    router.push('/login')
  }

  const initMap = () => {
    const center = { lat: latitude.value, lng: longitude.value }

    map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 14
    })

    marker = new google.maps.Marker({
      map,
      position: center,
      draggable: true
    })

    marker.addListener('dragend', () => {
      const pos = marker.getPosition()
      latitude.value = pos.lat()
      longitude.value = pos.lng()
    })
  }

  if (!window.google || !window.google.maps) {
    toast.error('Google Maps belum dimuat. Pastikan API-nya tersedia.')
  } else {
    initMap()
  }
})

watch(searchQuery, (val) => {
  clearTimeout(typingTimeout)

  if (!val || val.length < 3) {
    hasilPencarian.value = []
    return
  }

  // Tunggu 500ms setelah user selesai mengetik
  typingTimeout = setTimeout(() => {
    cariLokasi(val)
  }, 500)
})

const cariLokasi = async (query) => {
  try {
    const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: query,
        key: 'AIzaSyCBCK7ZodYE41G8KehOGK3SUCSOcW80J2k'
      }
    })

    if (res.data.status !== 'OK') {
      hasilPencarian.value = []
      return
    }

    hasilPencarian.value = res.data.results
  } catch (err) {
    toast.error('Gagal mencari lokasi: ' + err.message)
  }
}



const pilihLokasi = (result) => {
  const loc = result.geometry.location
  latitude.value = loc.lat
  longitude.value = loc.lng
  alamatTerpilih.value = result.formatted_address

  if (map && marker) {
    map.setCenter(loc)
    marker.setPosition(loc)
  }

  hasilPencarian.value = [] // kosongkan daftar setelah dipilih
}

const submitForm = async () => {
  try {
    if (!createdBy) return toast.error('Admin tidak dikenali')

    const fasilitasScore = Object.values(fasilitas.value).filter(Boolean).length

await axios.post('http://localhost:3000/api/admin/gor/tambahgor', {
  nama: nama.value,
  rating: rating.value,
  hargaSewa: hargaSewa.value,
  jumlahLapangan: jumlahLapangan.value,
  jenisLapanganId: jenisLapanganId.value,
  checklist: checklist.value,
  latitude: latitude.value,
  longitude: longitude.value,
  alamat: alamatTerpilih.value,
  kota: kota.value,
  provinsi: provinsi.value,
  createdBy
})

    toast.success('GOR berhasil ditambahkan!')
    router.push('/admin')
  } catch (err) {
        const msg = err.response?.data?.error || err.message
        toast.error('Gagal menyimpan: ' + msg)
    }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-orange-300 rounded focus:ring-2 focus:ring-orange-400 focus:outline-none;
}
</style>
