<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- MOBILE NAVBAR -->
    <nav class="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span class="text-2xl">🏸</span>
          </div>
          <h2 class="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Admin GOR</h2>
        </div>
        <button @click="toggleMobileMenu" class="text-white focus:outline-none p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
          <svg class="w-6 h-6 transform transition-transform duration-300" :class="{'rotate-180': isMobileMenuOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path :class="{'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path :class="{'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-show="isMobileMenuOpen" class="mt-6 space-y-3 animate-fade-in">
        <RouterLink to="/admin" class="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">📊</span>
          <span class="font-medium">Dashboard</span>
        </RouterLink>
        <RouterLink to="/admin/tambah-gor" class="flex items-center space-x-3 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">➕</span>
          <span class="font-medium">Tambah GOR</span>
        </RouterLink>
        <RouterLink to="/admin/riwayat" class="flex items-center space-x-3 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">📈</span>
          <span class="font-medium">Histori DSS</span>
        </RouterLink>
        <a href="#" @click.prevent="handleLogout" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 transform hover:scale-105">
          <span class="text-xl">🚪</span>
          <span class="font-medium">Logout</span>
        </a>
      </div>
    </nav>

    <div class="flex">
      <!-- SIDEBAR -->
      <aside class="w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white p-6 hidden md:block min-h-screen shadow-2xl relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div class="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center space-x-4 mb-12">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span class="text-2xl">🏸</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Admin GOR</h2>
              <p class="text-blue-200 text-sm opacity-80">Management Panel</p>
            </div>
          </div>
          
          <nav class="space-y-3">
            <RouterLink to="/admin" class="flex items-center space-x-4 hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">📊</span>
              <span class="font-semibold">Dashboard</span>
            </RouterLink>
            <RouterLink to="/admin/tambah-gor" class="flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 shadow-lg">
              <span class="text-xl">➕</span>
              <span class="font-semibold">Tambah GOR</span>
            </RouterLink>
            <RouterLink to="/admin/riwayat" class="flex items-center space-x-4 hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">📈</span>
              <span class="font-semibold">Histori DSS</span>
            </RouterLink>
            <a href="#" @click.prevent="handleLogout" class="flex items-center space-x-4 px-4 py-3 rounded-2xl hover:bg-red-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">🚪</span>
              <span class="font-semibold">Logout</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- MAIN FORM -->
      <main class="flex-1 flex justify-center items-start p-4 md:py-16 md:px-12">
        <div class="w-full max-w-4xl bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-100">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10">
            Tambah GOR Baru
          </h1>
          <!-- TAMBAH FORM-MU DISINI SESUAI CONTOH-->
          <form @submit.prevent="submitForm" class="space-y-10">
            <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
              <input v-model="nama" type="text" placeholder="Nama GOR"
                class="input input-bordered main-input" required />
              <input v-model.number="rating" type="number" min="1" max="5" step="0.1"
                placeholder="Rating (1-5)" class="input input-bordered main-input" required />
              <input v-model.number="hargaSewa" type="number" placeholder="Harga Sewa (Rp)"
                class="input input-bordered main-input" required />
              <input v-model.number="jumlahLapangan" type="number" placeholder="Jumlah Lapangan"
                class="input input-bordered main-input" required />
            </div>
            <select v-model="jenisLapanganId" class="input input-bordered main-input" required>
              <option disabled value="">Pilih Jenis Lapangan</option>
              <option v-for="jenis in jenisLapanganList" :value="jenis.id" :key="jenis.id">
                {{ jenis.nama }} (Skor: {{ jenis.skor }})
              </option>
            </select>
            <div class="grid sm:grid-cols-2 gap-8">
              <div>
                <label class="block text-sm font-semibold text-indigo-600 mb-2">Kota</label>
                <input v-model="kota" type="text" placeholder="Contoh: Depok" class="input input-bordered main-input" required />
              </div>
              <div>
                <label class="block text-sm font-semibold text-indigo-600 mb-2">Provinsi</label>
                <input v-model="provinsi" type="text" placeholder="Contoh: Jawa Barat" class="input input-bordered main-input" required />
              </div>
            </div>
            <div>
              <label class="text-sm font-semibold text-purple-600 block mb-2">Cari Lokasi GOR:</label>
              <div class="flex gap-2 mb-3">
                <input v-model="searchQuery" type="text" placeholder="Misal: GOR Sima Depok"
                  class="input flex-1 input-bordered main-input" />
                <button type="button" @click="cariLokasi"
                  class="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all">
                  Cari
                </button>
              </div>
              <div v-if="hasilPencarian.length > 0" class="bg-white/90 border-2 border-purple-200 rounded-2xl shadow-lg max-h-48 overflow-y-auto search-results">
                <ul>
                  <li v-for="(r, i) in hasilPencarian" :key="i" @click="pilihLokasi(r)"
                      class="search-result-item px-5 py-3 hover:bg-purple-50 cursor-pointer border-b border-purple-100 last:border-none text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-1 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                    <span class="text-gray-700">{{ r.formatted_address }}</span>
                  </li>
                </ul>
              </div>
              <div class="relative mt-4">
                <div id="map" class="w-full h-64 rounded-2xl border-4 border-emerald-200 shadow-lg overflow-hidden"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg text-sm flex items-center border border-emerald-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="font-medium text-gray-700">Lat: {{ latitude?.toFixed(5) || '0.00000' }}, Lng: {{ longitude?.toFixed(5) || '0.00000' }}</span>
                </div>
              </div>
              <p v-if="alamatTerpilih" class="text-sm mt-2 text-gray-500">📌 Alamat: {{ alamatTerpilih }}</p>
            </div>
            <div class="space-y-6">
              <h2 class="text-lg font-semibold text-purple-700">Checklist Penilaian Fasilitas</h2>
              <div v-for="(items, kategori) in checklistItems" :key="kategori" class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 class="text-md font-bold mb-3 capitalize text-purple-600 flex items-center">
                  <div class="w-7 h-7 mr-2 bg-purple-400 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  {{ kategori }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label v-for="item in items" :key="item" class="flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-purple-50 transition-colors font-medium text-gray-700 group">
                    <input type="checkbox" :value="item" v-model="checklist[kategori]" class="checkbox checkbox-primary rounded-lg border-2 group-hover:scale-110 transition-transform duration-200" />
                    <span class="group-hover:text-purple-600">{{ item }}</span>
                  </label>
                </div>
                <div class="mt-3 text-sm text-purple-600 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-lg flex justify-between border border-purple-200">
                  <div>
                    ✅ {{ checklist[kategori].length }} dari {{ items.length }} fasilitas
                  </div>
                  <div>
                    Skor: <b>{{ hitungSkor(checklist[kategori].length, items.length) }}</b>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="w-full py-3 mt-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-2xl transition-all">
              Simpan GOR
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const $route = useRoute()
const router = useRouter()
const toast = useToast()

// =============== MOBILE NAVBAR LOGIC ============
const isMobileMenuOpen = ref(false)
function toggleMobileMenu() { isMobileMenuOpen.value = !isMobileMenuOpen.value }
function closeMobileMenu() { isMobileMenuOpen.value = false }

// =============== FORM STATES ==============
const nama = ref('')
const rating = ref('')
const hargaSewa = ref('')
const jumlahLapangan = ref('')
const jenisLapanganId = ref('')
const latitude = ref(-6.2)
const longitude = ref(106.816)
const kota = ref('')
const provinsi = ref('')
const searchQuery = ref('')
const hasilPencarian = ref([])
const alamatTerpilih = ref('')

const jenisLapanganList = [
  { id: 'd852fac2-a743-4114-a428-7067091645e4', nama: 'Karpet Vinyl', skor: 3 },
  { id: '7bc42c09-c25a-4dea-a128-9c726852f049', nama: 'Vinyl', skor: 3 },
  { id: 'a548de65-0fe5-44f8-94d6-6f814cc13b6e', nama: 'Interlock', skor: 2 },
  { id: '5cea6755-b1ef-4777-9a68-f961927c7e55', nama: 'Premium Synthetic Rubber', skor: 2 },
  { id: 'a6b4dac0-815e-4b2f-ab8e-ffad066f8da0', nama: 'Lantai', skor: 1 }
]

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
};
const checklist = ref({
  parkir: [],
  kamarMandi: [],
  kamarGanti: [],
  kantin: []
})
const hitungSkor = (jumlah, max) => {
  if (jumlah <= 2) return 0
  if (jumlah <= 5) return 1
  if (jumlah <= 7) return 2
  return 3
}

// ========================== GOOGLE MAP ==============
let map = null
let marker = null

onMounted(() => {
  // Cek login
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user || user.role !== 'admin') {
    router.push('/login')
  }
  if (window.google && window.google.maps) {
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
})

// ================= PENCARIAN MAP ==================
let typingTimeout = null
watch(searchQuery, (val) => {
  clearTimeout(typingTimeout)
  if (!val || val.length < 3) { hasilPencarian.value = []; return }
  typingTimeout = setTimeout(() => { cariLokasi(val) }, 500)
})

const cariLokasi = async (query) => {
  try {
    // Ganti key-mu sesuai kebutuhan
    const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: query,
        key: 'AIzaSyA1M9zulCG74UZI0Q0_G9SPK0jAhjDroVg'
      }
    })
    if (res.data.status !== 'OK') { hasilPencarian.value = []; return }
    hasilPencarian.value = res.data.results
  } catch (err) { toast.error('Gagal mencari lokasi: ' + err.message) }
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
  hasilPencarian.value = []
}

// =============== SUBMIT FORM ==============
const admin = JSON.parse(localStorage.getItem('user') || '{}')
const createdBy = admin.user_id || null
const submitForm = async () => {
  try {
    if (!createdBy) return toast.error('Admin tidak dikenali')
    await axios.post('https://eligo-gor-backend-1013400068110.asia-east1.run.app/api/admin/gor/tambahgor', {
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

// ========== LOGOUT ==========
function handleLogout() {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
/* Sidebar/Sidebar-Link/Active-Imitate Dashboard */
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  color: rgba(255,255,255,0.9);
  font-size: 1rem;
  transition: all 0.2s ease;
  font-weight: 500;
}
.sidebar-link:not(.active-sidebar):hover {
  background: rgba(255,255,255,0.05);
  transform: translateX(5px);
  color: #a5b4fc !important;
}
.active-sidebar {
  background: linear-gradient(to right,#fff,#e0e7ff,#f3e8ff);
  color: #3730a3 !important;
  font-weight: bold;
  border: 1.5px solid #c7d2fe;
  box-shadow: 0 6px 24px 0 rgba(99,102,241,0.16);
  z-index: 1;
}
/* Mobile navbar/link */
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-size: 1.09rem;
  color: #fff;
  transition: all 0.2s;
  font-weight: 500;
}
.mobile-nav-link:not(.mobile-nav-active):hover {
  background: rgba(255,255,255,0.20);
  color: #e0e7ff !important;
  transform: translateX(5px);
}
.mobile-nav-active {
  background: rgba(255,255,255,0.30);
  color: #3730a3 !important;
  font-weight: bold;
  box-shadow: 0 2px 18px 0 rgba(99,102,241,0.12);
  font-size: 1.15rem;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.input.main-input {
  @apply w-full py-3 text-base rounded-2xl border-2 transition-all bg-white/80 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 focus:scale-105 focus:shadow-xl;
}
.search-result-item:hover {
  background: #f3e8ff;
  transform: translateX(3px);
  transition: all 0.2s;
}
.search-results::-webkit-scrollbar { width: 6px; }
.search-results::-webkit-scrollbar-thumb { background-color: #a78bfa; border-radius: 10px; }

/* Hover effects */
.group:hover .group-hover\:scale-150 {
  transform: scale(1.5);
}

.group:hover .group-hover\:text-orange-800 {
  color: #9a3412;
}

.group:hover .group-hover\:text-purple-600 {
  color: #9333ea;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Glass morphism effect */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Button hover effects */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Input focus effects */
.input:focus, .textarea:focus, .select:focus {
  transform: translateY(-1px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Card hover effects */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Animasi untuk card stats */
.stats-card {
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Efek untuk sidebar menu */
nav a {
  transition: all 0.2s ease;
}

nav a:hover {
  transform: translateX(5px);
}

/* Animasi untuk modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Animasi untuk konten modal */
.modal-content-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.1s;
}

.modal-content-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

/* Efek hover untuk hasil pencarian */
.search-result-item:hover {
  background-color: #ffedd5;
  transform: translateX(2px);
  transition: all 0.2s ease;
}

/* Custom scrollbar untuk hasil pencarian */
.search-results::-webkit-scrollbar {
  width: 6px;
}

.search-results::-webkit-scrollbar-track {
  background: #ffedd5;
}

.search-results::-webkit-scrollbar-thumb {
  background-color: #fb923c;
  border-radius: 10px;
}

/* Animasi untuk marker peta */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Style untuk tombol */
.btn-primary {
  background: linear-gradient(to right, #f97316, #fb923c);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #ea580c, #f97316);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(249, 115, 22, 0.3);
}

/* Style untuk input */
.input:focus {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.3);
  border-color: #f97316;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
}

/* Hover effects */
.group:hover .group-hover\:scale-150 {
  transform: scale(1.5);
}

.group:hover .group-hover\:text-orange-800 {
  color: #9a3412;
}

.group:hover .group-hover\:text-purple-600 {
  color: #9333ea;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Glass morphism effect */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Button hover effects */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Input focus effects */
.input:focus, .textarea:focus, .select:focus {
  transform: translateY(-1px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Card hover effects */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>