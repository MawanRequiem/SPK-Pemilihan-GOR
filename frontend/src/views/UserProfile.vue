<template>
  <div class="min-h-screen flex">
    <!-- SIDEBAR -->
    <aside class="hidden md:flex flex-col w-52 h-screen bg-gradient-to-b from-orange-300/50 to-orange-400/50 backdrop-blur-md text-orange-900 fixed top-0 left-0 p-4 z-40 shadow-lg border-r border-orange-600">
      <h2 class="text-lg font-bold mb-10">🏸 DSS GOR</h2>
      <nav class="space-y-3 text-sm">
        <RouterLink to="/dashboard" class="block px-3 py-2 rounded hover:bg-orange-100/50">🏠 Dashboard</RouterLink>
        <RouterLink to="/user/rekomendasi" class="block px-3 py-2 rounded hover:bg-orange-100/50">⭐ Rekomendasi</RouterLink>
        <RouterLink to="/user/riwayat" class="block px-3 py-2 rounded hover:bg-orange-100/50">📜 Riwayat</RouterLink>
        <RouterLink to="/user/profil" class="block px-3 py-2 rounded hover:bg-orange-100/50">👤 Profil</RouterLink>
        <button @click="handleLogout" class="block w-full text-left px-3 py-2 rounded hover:bg-orange-100/50 text-red-600">🚪 Logout</button>
      </nav>
    </aside>

    <!-- KONTEN -->
    <main class="flex-1 md:ml-52 px-6 py-10 bg-gradient-to-br from-orange-50 to-white">
      <div class="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow border border-orange-200">
        <h1 class="text-2xl font-bold text-orange-700 mb-6">👤 Edit Profil Pengguna</h1>

        <!-- EDIT PROFIL -->
        <form @submit.prevent="updateProfile" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div>
            <label>Nama Lengkap</label>
            <input v-model="user.nama_lengkap" class="input" />
          </div>
          <div>
            <label>Email</label>
            <input v-model="user.email" class="input" type="email" />
          </div>
          <div>
            <label>Provinsi</label>
            <input v-model="user.provinsi" class="input" />
          </div>
          <div>
            <label>Kota</label>
            <input v-model="user.kota" class="input" />
          </div>
          <div>
            <label>Kecamatan</label>
            <input v-model="user.kecamatan" class="input" />
          </div>
<div>
  <label>Cari Lokasi</label>
  <div class="flex gap-2 relative">
    <input v-model="searchQuery" class="input flex-1" />
  </div>

  <!-- Hasil pencarian -->
  <div
    v-if="hasilPencarian.length"
    class="absolute mt-1 bg-white border rounded shadow z-50 w-full max-w-md"
  >
    <ul>
      <li
        v-for="(r, i) in hasilPencarian"
        :key="i"
        @click="pilihLokasi(r)"
        class="px-4 py-2 text-sm hover:bg-orange-50 cursor-pointer border-b last:border-none"
      >
        {{ r.formatted_address }}
      </li>
    </ul>
  </div>
</div>
          <div class="col-span-2">
            <div id="map" class="w-full h-64 rounded border mt-2"></div>
            <p class="text-sm mt-2 text-gray-500">📍 Lat: {{ user.lokasi_lat }} | Lng: {{ user.lokasi_lng }}</p>
          </div>
          <div class="col-span-2 text-right">
            <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Simpan Perubahan</button>
          </div>
        </form>

        <!-- GANTI PASSWORD -->
        <h2 class="text-xl font-bold text-orange-700 mt-10 mb-4">🔒 Ganti Password</h2>
        <form @submit.prevent="ubahPassword" class="space-y-4 text-sm">
          <input v-model="password.old" type="password" class="input" placeholder="Password Lama" />
          <input v-model="password.new1" type="password" class="input" placeholder="Password Baru" />
          <input v-model="password.new2" type="password" class="input" placeholder="Konfirmasi Password Baru" />
          <button type="submit" class="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Simpan Password</button>
        </form>
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
    hasilPencarian.value = res.data.results || [] // jika kamu return array
  } catch (err) {
    hasilPencarian.value = []
  }
})

onMounted(async () => {
  if (!userId) return router.push('/login')

  try {
    const res = await axios.get(`http://localhost:3000/api/${userId}`)
    user.value = res.data
    initMap()
  } catch (err) {
    toast.error('Gagal mengambil data user')
  }
})

const initMap = () => {
  const center = {
    lat: user.value.lokasi_lat || -6.2,
    lng: user.value.lokasi_lng || 106.816
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 13
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

const cariLokasi = async () => {
  if (!searchQuery.value.trim()) return toast.error('Isi pencarian dulu')

  try {
    const res = await axios.get('http://localhost:3000/api/maps/geocode', {
      params: { query: searchQuery.value }
    })

    const lokasi = res.data
    user.value.lokasi_lat = lokasi.latitude
    user.value.lokasi_lng = lokasi.longitude
    map.setCenter({ lat: lokasi.latitude, lng: lokasi.longitude })
    marker.setPosition({ lat: lokasi.latitude, lng: lokasi.longitude })

    toast.success(`📍 ${lokasi.formatted_address}`)
  } catch (err) {
    toast.error('Gagal mencari lokasi')
  }
}

const pilihLokasi = (lokasi) => {
  const loc = lokasi.geometry.location
  user.value.lokasi_lat = loc.lat
  user.value.lokasi_lng = loc.lng
  alamatDipilih.value = lokasi.formatted_address

  map.setCenter(loc)
  marker.setPosition(loc)

  hasilPencarian.value = [] // sembunyikan daftar
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
  if (password.value.new1 !== password.value.new2) {
    return toast.error('Konfirmasi password tidak cocok')
  }

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
.input {
  @apply w-full px-4 py-2 border border-orange-300 rounded focus:ring-2 focus:ring-orange-400 focus:outline-none;
}
</style>
