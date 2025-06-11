<template>
  <div class="min-h-screen flex">
    <!-- SIDEBAR -->
    <aside class="hidden md:flex flex-col w-52 h-screen bg-gradient-to-b from-orange-300/50 to-orange-400/50 backdrop-blur-md text-orange-900 fixed top-0 left-0 p-4 z-40 shadow-lg border-r border-orange-600">
      <h2 class="text-lg font-bold mb-10">🏸 DSS GOR</h2>
      <nav class="space-y-3 text-sm">
        <RouterLink to="/dashboard" class="block px-3 py-2 rounded hover:bg-orange-100/50">🏠 Dashboard</RouterLink>
        <RouterLink to="/user/rekomendasi" class="block px-3 py-2 rounded bg-orange-100/30 font-semibold">⭐ Rekomendasi</RouterLink>
        <RouterLink to="/user/riwayat" class="block px-3 py-2 rounded hover:bg-orange-100/50">📜 Riwayat</RouterLink>
        <RouterLink to="/user/profil" class="block px-3 py-2 rounded hover:bg-orange-100/50">👤 Profil</RouterLink>
        <button @click="handleLogout" class="block w-full text-left px-3 py-2 rounded hover:bg-orange-100/50 text-red-600">🚪 Logout</button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 md:ml-52 px-6 py-10 bg-gradient-to-br from-orange-50 to-white">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-orange-700 mb-6">📍 Rekomendasi GOR</h1>

        <!-- FORM PILIHAN -->
        <form @submit.prevent="hitungRekomendasi" class="space-y-6 bg-white rounded-xl shadow border p-6 mb-8">
          <!-- Metode jarak -->
          <div>
            <label class="font-medium text-sm mb-1 block">Pilih metode penghitungan jarak:</label>
            <select v-model="metodeJarak" class="input">
              <option value="otomatis">🔄 Otomatis (Google Maps)</option>
              <option value="manual">✍️ Manual (diisi sendiri)</option>
            </select>
          </div>

          <!-- Waktu Main -->
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium">Hari Main</label>
              <select v-model="hari" class="input">
                <option disabled value="">Pilih Hari</option>
                <option v-for="h in hariList" :key="h" :value="h">{{ h }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">Jam Main</label>
              <input v-model.number="jam" type="number" min="0" max="23" class="input" placeholder="0 - 23" />
            </div>
          </div>

          <!-- Input jarak manual -->
          <div v-if="metodeJarak === 'manual'">
            <label class="text-sm font-medium block mb-1">Input Jarak Manual (meter)</label>
            <div v-for="gor in gorList" :key="gor.id_gor" class="flex items-center gap-2 mb-2">
              <span class="w-40 text-sm truncate">{{ gor.nama_gor }}</span>
              <input v-model.number="jarakManual[gor.id_gor]" type="number" min="0" class="input flex-1" />
            </div>
          </div>

          <button type="submit" class="w-full py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
            🎯 Hitung Rekomendasi
          </button>
        </form>

        <!-- HASIL -->
        <div v-if="hasil.length">
          <h2 class="text-xl font-semibold text-orange-700 mb-4">🎓 Hasil Rekomendasi:</h2>
          <table class="w-full text-sm border shadow bg-white rounded overflow-hidden">
            <thead class="bg-orange-100">
              <tr>
                <th class="p-3 text-left">#</th>
                <th class="p-3 text-left">Nama GOR</th>
                <th class="p-3 text-left">Skor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in hasil" :key="r.id" class="border-t hover:bg-orange-50">
                <td class="p-3">{{ i + 1 }}</td>
                <td class="p-3 font-medium">{{ r.nama }}</td>
                <td class="p-3">{{ r.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

// Ambil user_id dari localStorage atau context lain
const userId = JSON.parse(localStorage.getItem('user') || '{}')?.user_id

// State untuk user profile (lat,lng)
const userProfile = ref({ lokasi_lat: null, lokasi_lng: null })

// Fetch user lat/lng dari backend
onMounted(async () => {
  if (!userId) return router.push('/login')
  try {
    const res = await axios.get(`http://localhost:3000/api/${userId}`)
    userProfile.value = res.data
    await loadGOR()
  } catch {
    toast.error('Gagal mengambil profil user')
  }
})

const gorList = ref([])
const hasil = ref([])
const metodeJarak = ref('otomatis')
const hari = ref('')
const jam = ref(18)
const jarakManual = ref({})
const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

// Load GOR list
const loadGOR = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/admin/gor')
    gorList.value = res.data
  } catch {
    toast.error('Gagal mengambil data GOR')
  }
}

// Hitung rekomendasi
const hitungRekomendasi = async () => {
  if (!hari.value || jam.value === null) {
    return toast.error('Isi hari dan jam main terlebih dahulu')
  }

  const enriched = [...gorList.value]

  if (metodeJarak.value === 'otomatis') {
    const { lokasi_lat: lat, lokasi_lng: lng } = userProfile.value
    if (!lat || !lng) {
      return toast.error('Lokasi user tidak tersedia')
    }

    for (const gor of enriched) {
      try {
        const r = await axios.get('http://localhost:3000/api/maps/distance', {
          params: { originLat: lat, originLng: lng, destLat: gor.latitude, destLng: gor.longitude }
        })
        gor.jarak_meter = r.data.distance
      } catch {
        gor.jarak_meter = 99999
      }
    }
  }

  try {
    const r = await axios.post('http://localhost:3000/api/rekomendasi', {
      user_id: userId,
      metodeJarak: metodeJarak.value,
      waktuMain: { hari: hari.value, jam: jam.value },
      jarakManual: jarakManual.value,
      gorData: enriched
    })
    hasil.value = r.data.rekomendasi
  } catch (err) {
    toast.error(err.response?.data?.error || 'Gagal menghitung rekomendasi')
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
