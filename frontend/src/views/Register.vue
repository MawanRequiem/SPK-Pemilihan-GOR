<template>
  <div class="min-h-screen flex items-center justify-center bg-orange-50 px-4">
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 border border-orange-200">
      <h2 class="text-3xl font-bold mb-6 text-orange-700 text-center">Registrasi</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">

        <input v-model="nama" placeholder="Nama Lengkap" class="input" />
        <input v-model="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Password" class="input" />
        <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" class="input" />

        <input v-model="provinsi" placeholder="Provinsi" class="input" />
        <input v-model="kota" placeholder="Kota" class="input" />
        <input v-model="kecamatan" placeholder="Kecamatan" class="input" />

        <div>
          <label class="block text-sm mb-1 text-gray-700">Tentukan lokasi kamu:</label>
          <div id="map" class="w-full h-60 rounded border"></div>
          <p class="text-xs text-gray-500 mt-1">📍 Latitude: {{ lat }} | Longitude: {{ lng }}</p>
        </div>

        <button type="submit" class="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
          Daftar
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

const router = useRouter()
const toast = useToast()

const nama = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const provinsi = ref('')
const kota = ref('')
const kecamatan = ref('')

const lat = ref(null)
const lng = ref(null)

onMounted(() => {
  // Default posisi awal (Jakarta)
  const defaultLat = -6.2
  const defaultLng = 106.816666

  lat.value = defaultLat
  lng.value = defaultLng

  const map = L.map('map').setView([defaultLat, defaultLng], 13)
  const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map)

  marker.on('dragend', () => {
    const pos = marker.getLatLng()
    lat.value = pos.lat
    lng.value = pos.lng
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
})

const handleRegister = async () => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  const nameRegex = /^[A-Za-z\s]{3,}$/
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  if (!nama.value.match(nameRegex)) {
    toast.error('Nama harus minimal 3 huruf dan hanya huruf/spasi.')
    return
  }

  if (!email.value.match(emailRegex)) {
    toast.error('Format email tidak valid.')
    return
  }

  if (!password.value.match(passRegex)) {
    toast.error('Password minimal 6 karakter dengan huruf dan angka.')
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.error('Konfirmasi password tidak cocok.')
    return
  }

  if (
    !provinsi.value.trim() ||
    !kota.value.trim() ||
    !kecamatan.value.trim()
  ) {
    toast.error('Alamat lengkap (provinsi, kota, kecamatan) wajib diisi.')
    return
  }

  if (!lat.value || !lng.value) {
    toast.error('Pilih lokasi kamu di peta.')
    return
  }

  // Jika lolos semua validasi, lanjut register
  try {
    await axios.post('http://localhost:3000/api/register', {
      nama_lengkap: nama.value,
      email: email.value,
      password: password.value,
      lokasi_lat: lat.value,
      lokasi_lng: lng.value,
      provinsi: provinsi.value,
      kota: kota.value,
      kecamatan: kecamatan.value
    })
    toast.success('Registrasi berhasil!')
    router.push('/login')
  } catch (err) {
    const msg = err.response?.data?.error || 'Registrasi gagal'
    toast.error(msg)
  }
}

</script>
