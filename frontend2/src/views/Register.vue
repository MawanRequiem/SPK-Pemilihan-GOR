<template>
  <div class="min-h-screen flex items-center justify-center bg-main-gradient px-4">
    <div
      class="relative w-full max-w-2xl py-10 px-6 md:px-14
        bg-gradient-to-br from-indigo-50/95 via-fuchsia-50/90 to-orange-50/95
        rounded-3xl shadow-2xl border border-indigo-100/70 backdrop-blur-2xl"
    >
      <div class="mb-7 flex flex-col items-center">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md">
          Registrasi
        </h2>
        <p class="text-base text-gray-700 text-center mt-1">
          Isi data dengan benar agar rekomendasi GOR sesuai!
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="input-label">Nama Lengkap</label>
          <input v-model="nama" placeholder="Nama Lengkap" class="input" />
        </div>
        <div>
          <label class="input-label">Email</label>
          <input v-model="email" placeholder="Email" class="input" />
        </div>
        <div class="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
          <div class="flex-1">
            <label class="input-label">Password</label>
            <input v-model="password" type="password" placeholder="Password" class="input" />
          </div>
          <div class="flex-1">
            <label class="input-label">Konfirmasi Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" class="input" />
          </div>
        </div>
        <div class="grid gap-2 md:grid-cols-3 md:gap-4">
          <div>
            <label class="input-label">Provinsi</label>
            <input v-model="provinsi" placeholder="Provinsi" class="input" />
          </div>
          <div>
            <label class="input-label">Kota</label>
            <input v-model="kota" placeholder="Kota" class="input" />
          </div>
          <div>
            <label class="input-label">Kecamatan</label>
            <input v-model="kecamatan" placeholder="Kecamatan" class="input" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Tentukan lokasi kamu:</label>
          <div id="googlemap" class="w-full h-56 rounded-2xl border border-orange-200 overflow-hidden"></div>
          <p class="text-xs text-gray-600 mt-1">📍 Latitude: <b>{{ lat }}</b> &nbsp; | &nbsp; Longitude: <b>{{ lng }}</b></p>
        </div>
        <button type="submit" class="primary-btn w-full mt-2">
          Daftar Akun
        </button>
        <p class="text-sm text-center text-gray-600 mt-4">
          Sudah punya akun?
          <router-link to="/login" class="text-orange-700 font-bold hover:underline ml-1">Login di sini</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const nama = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const provinsi = ref('')
const kota = ref('')
const kecamatan = ref('')
const lat = ref(-6.2)
const lng = ref(106.816666)

let map
let marker

onMounted(() => {
  // Pastikan Google Maps script sudah loaded lewat public/index.html !
  const center = { lat: lat.value, lng: lng.value }
  map = new window.google.maps.Map(document.getElementById('googlemap'), {
    center,
    zoom: 12
  })
  marker = new window.google.maps.Marker({
    position: center,
    map,
    draggable: true
  })
  marker.addListener('dragend', () => {
    const pos = marker.getPosition()
    lat.value = pos.lat()
    lng.value = pos.lng()
  })
})

// Form Validation + API Register
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
  if (!provinsi.value.trim() || !kota.value.trim() || !kecamatan.value.trim()) {
    toast.error('Alamat lengkap (provinsi, kota, kecamatan) wajib diisi.')
    return
  }
  if (!lat.value || !lng.value) {
    toast.error('Pilih lokasi di peta.')
    return
  }

  try {
    await axios.post('https://eligo-gor-backend-1013400068110.asia-east1.run.app/api/register', {
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
    toast.error(err.response?.data?.error || 'Registrasi gagal')
  }
}
</script>

<style scoped>
/* Gaya sama seperti sebelumnya */
.bg-main-gradient {
  background: linear-gradient(135deg,
    #818cf8 0%,
    #c7d2fe 20%,
    #f5d0fe 53%,
    #fdba74 100%
  );
}
.input-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #374151;
  display: block;
}
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 0.75rem;
  background: #fffdfaee;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s;
  outline: none;
}
.input:focus {
  border-color: #fb923c;
  box-shadow: 0 2px 8px -2px #fdba7433;
}
.primary-btn {
  padding: 0.75rem 2rem;
  border-radius: 1.25rem;
  font-weight: bold;
  font-size: 1.125rem;
  color: #fff;
  background: linear-gradient(to right, #f472b6, #6366f1 80%, #fb923c);
  transition: all 0.2s;
  border: none;
  box-shadow: 0 10px 32px -8px #a78bfa44;
  cursor: pointer;
}
.primary-btn:hover {
  background: linear-gradient(to right, #fb923c, #fdba74);
}
</style>