<template>
  <div class="min-h-screen flex relative overflow-hidden">
    <!-- Background Animation -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- SIDEBAR -->
    <aside class="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-orange-300/70 via-orange-300/60 to-orange-400/70 backdrop-blur-xl text-orange-900 fixed top-0 left-0 p-6 z-40 shadow-2xl border-r border-orange-600/30">
      <div class="flex items-center mb-12">
        <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <span class="text-white text-xl">🏸</span>
        </div>
        <h2 class="text-xl font-bold bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent">DSS GOR</h2>
      </div>
      <nav class="space-y-2 text-sm">
        <RouterLink to="/dashboard" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg">🏠</span>
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/user/rekomendasi" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">⭐</span>
          <span class="font-medium">Rekomendasi</span>
        </RouterLink>
        <RouterLink to="/user/riwayat" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">📜</span>
          <span class="font-medium">Riwayat</span>
        </RouterLink>
        <RouterLink to="/user/profil" class="group flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100/60 to-orange-200/60 font-semibold shadow-lg border border-orange-300/50">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">👤</span>
          <span class="font-medium">Profil</span>
        </RouterLink>
        <button @click="handleLogout"
          class="group flex items-center w-full px-4 py-3 rounded-xl hover:bg-red-100/50 text-red-600 transition-all duration-300 hover:scale-105 mt-8">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">🚪</span>
          <span class="font-medium">Logout</span>
        </button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 md:ml-64 px-6 py-10 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 relative z-10">
      <div class="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-orange-200/60">
        <div class="flex items-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg animate-bounce">
            <span class="text-white text-3xl">👤</span>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 bg-clip-text text-transparent">Edit Profil Pengguna</h1>
            <p class="text-gray-500 mt-1">Perbarui data pribadi & lokasi kamu di bawah</p>
          </div>
        </div>

        <!-- FORM PROFILE -->
        <form @submit.prevent="updateProfile" class="space-y-7 text-gray-700">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="font-semibold mb-1 block">Nama Lengkap</label>
              <input v-model="user.nama_lengkap" class="profile-input" placeholder="Contoh: Hanafi Badminton" />
            </div>
            <div>
              <label class="font-semibold mb-1 block">Email</label>
              <input v-model="user.email" class="profile-input" type="email" placeholder="Email..." />
            </div>
            <div>
              <label class="font-semibold mb-1 block">Provinsi</label>
              <input v-model="user.provinsi" class="profile-input" placeholder="Provinsi..." />
            </div>
            <div>
              <label class="font-semibold mb-1 block">Kota</label>
              <input v-model="user.kota" class="profile-input" placeholder="Kota..." />
            </div>
            <div>
              <label class="font-semibold mb-1 block">Kecamatan</label>
              <input v-model="user.kecamatan" class="profile-input" placeholder="Kecamatan..." />
            </div>
            <div class="relative">
              <label class="font-semibold mb-1 block">Cari Lokasi</label>
              <input v-model="searchQuery" class="profile-input" placeholder="Cari alamat, contoh: GOR Ciputat..." />
              <!-- Hasil pencarian -->
              <div v-if="hasilPencarian.length" class="absolute left-0 right-0 z-50 mt-2 bg-white rounded-xl shadow-2xl border border-orange-100">
                <ul>
                  <li v-for="(r, i) in hasilPencarian"
                      :key="i"
                      @click="pilihLokasi(r)"
                      class="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b last:border-0 text-gray-800"
                    >
                    {{ r.formatted_address }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div id="map" class="w-full h-64 rounded-2xl border mt-4 shadow-lg"></div>
            <p class="text-sm mt-3 text-gray-500">📍 Lokasi: <b>Lat:</b> {{ user.lokasi_lat }} | <b>Lng:</b> {{ user.lokasi_lng }}</p>
          </div>
          <div class="text-right mt-2">
            <button type="submit" class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <span class="mr-2">💾</span>
              Simpan Perubahan
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-8">
          <div class="flex-1 h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-100"></div>
          <div class="mx-4 text-orange-500 font-bold">atau</div>
          <div class="flex-1 h-0.5 bg-gradient-to-r from-orange-100 via-orange-300 to-orange-200"></div>
        </div>

        <!-- FORM GANTI PASSWORD -->
        <div>
          <h2 class="text-2xl font-bold text-orange-700 mb-4 flex items-center">
            <span class="mr-2">🔒</span>
            Ganti Password
          </h2>
          <form @submit.prevent="ubahPassword" class="space-y-4">
            <input v-model="password.old" type="password" class="profile-input" placeholder="Password Lama" />
            <input v-model="password.new1" type="password" class="profile-input" placeholder="Password Baru" />
            <input v-model="password.new2" type="password" class="profile-input" placeholder="Konfirmasi Password Baru" />
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <span class="mr-2">💾</span>
              Simpan Password
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const userId = JSON.parse(localStorage.getItem('user') || '{}')?.user_id
const user = ref({})
const password = ref({ old: '', new1: '', new2: '' })
const searchQuery = ref('')
const hasilPencarian = ref([])
const alamatDipilih = ref('')
let map, marker

watch(searchQuery, async (val) => {
  if (!val || val.length < 3) {
    hasilPencarian.value = []
    return
  }
  try {
    const res = await axios.get('http://localhost:3000/api/maps/geocode', {
      params: { query: val }
    })
    hasilPencarian.value = res.data.results || []
  } catch (err) {
    hasilPencarian.value = []
  }
})

onMounted(async () => {
  if (!userId) return router.push('/login')
  try {
    const res = await axios.get(`http://localhost:3000/api/${userId}`)
    user.value = res.data
    setTimeout(initMap, 500) // better delay to ensure dom ready
  } catch (err) {
    toast.error('Gagal mengambil data user')
  }
})

const initMap = () => {
  if (!window.google) return
  const center = {
    lat: user.value.lokasi_lat || -6.2,
    lng: user.value.lokasi_lng || 106.816
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 13,
    styles: [
      // Optional: You can set orange-themed map styles here!
    ]
  })
  marker = new google.maps.Marker({
    map,
    position: center,
    draggable: true
  })
  marker.addListener('dragend', () => {
    const pos = marker.getPosition()
    user.value.lokasi_lat = pos.lat()
    user.value.lokasi_lng = pos.lng()
  })
}

const pilihLokasi = (lokasi) => {
  const loc = lokasi.geometry.location
  user.value.lokasi_lat = loc.lat
  user.value.lokasi_lng = loc.lng
  alamatDipilih.value = lokasi.formatted_address
  map.setCenter(loc)
  marker.setPosition(loc)
  hasilPencarian.value = []
  searchQuery.value = lokasi.formatted_address
}

const updateProfile = async () => {
  try {
    await axios.patch(`http://localhost:3000/api/update/${userId}`, user.value)
    toast.success('Profil berhasil diperbarui!')
  } catch (err) {
    toast.error('Gagal update: ' + err.response?.data?.error)
  }
}

const ubahPassword = async () => {
  if (password.value.new1 !== password.value.new2)
    return toast.error('Konfirmasi password tidak cocok')
  try {
    await axios.patch(`http://localhost:3000/api/password/${userId}`, {
      oldPassword: password.value.old,
      newPassword: password.value.new1
    })
    toast.success('Password berhasil diubah!')
    password.value = { old: '', new1: '', new2: '' }
  } catch (err) {
    toast.error('Gagal ganti password: ' + err.response?.data?.error)
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.profile-input {
  @apply w-full px-5 py-3 border border-orange-200 rounded-xl bg-white/70 backdrop-blur focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 text-gray-700 shadow transition-all duration-300;
}

.profile-input:focus {
  outline: none;
  background: #fff;
  border-color: #fb923c;
  box-shadow: 0 8px 25px rgba(251, 146, 60, 0.10);
}

::selection {
  background: #fed7aa;
}

.animate-bounce {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Map container enhanced styling */
#map {
  min-height: 256px;
  background: linear-gradient(90deg, #fff7ed 0%, #fef3c7 100%);
  border: 1px solid #fdba74;
}

/* Hide map controls if you want minimal */
.gm-fullscreen-control,
.gm-style-cc, 
.gm-svpc {
  display: none !important;
}
</style>