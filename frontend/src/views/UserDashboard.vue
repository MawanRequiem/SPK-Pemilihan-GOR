<template>
<main class="flex-1 md:ml-52 px-6 py-10 bg-gradient-to-br from-orange-50 to-white min-h-screen">
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

    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-orange-700 mb-4">🎯 Dashboard GOR Kamu</h1>

      <!-- STATUS PREFERENSI -->
      <div class="bg-white shadow-lg border border-orange-200 p-6 rounded-xl mb-6 flex items-center justify-between">
        <div>
          <p class="text-gray-800">🔎 Preferensi kamu saat ini:</p>
          <ul v-if="sudahSurvey" class="mt-2 text-sm text-gray-700 space-y-1">
            <li v-for="(val, key) in preferensi" :key="key" class="capitalize">
              {{ key }}: <span class="font-semibold">{{ val }}</span>
            </li>
          </ul>
          <p v-else class="text-gray-600 mt-1">Kamu belum mengisi preferensi. Yuk isi dulu agar bisa dapat rekomendasi!</p>
        </div>
        <button @click="showModal = true" class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
          {{ sudahSurvey ? 'Ubah Preferensi' : 'Isi Preferensi' }}
        </button>
      </div>

      <!-- KONTEN LAINNYA -->
      <div class="bg-white/60 backdrop-blur p-6 rounded-lg shadow">
        <p class="text-gray-700">👋 Selamat datang, {{ user.nama_lengkap }}!</p>
        <p class="text-sm text-gray-500">Silakan isi preferensi di atas lalu kamu bisa melihat rekomendasi GOR terbaik buatmu di halaman selanjutnya.</p>
      </div>
    </div>

    <!-- MODAL SURVEY -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 backdrop-blur z-50 flex items-center justify-center">
      <div class="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
        <button @click="showModal = false" class="absolute top-2 right-4 text-gray-400 hover:text-orange-600 text-xl">&times;</button>
        <h2 class="text-xl font-bold text-orange-700 mb-4">Survey Preferensi</h2>

        <form @submit.prevent="submitSurvey" class="space-y-4">
          <div v-for="p in pertanyaan" :key="p.key">
            <label class="block font-semibold text-gray-700 mb-2">{{ p.teks }}</label>
            <div class="space-y-1">
              <label v-for="opt in p.opsi" :key="opt.label" class="flex items-center gap-2 text-sm">
                <input type="radio" :name="p.key" :value="opt.skor" v-model="jawaban[p.key]" required />
                {{ opt.label }}
              </label>
            </div>
          </div>

          <button type="submit" class="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">Simpan Preferensi</button>
        </form>
      </div>
    </div>
</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user.user_id

const showModal = ref(false)
const sudahSurvey = ref(false)
const preferensi = ref({})

const jawaban = ref({
  harga: null,
  rating: null,
  jarak: null,
  lapangan: null,
  fasilitas: null,
  jumlah: null
})

const pertanyaan = [
  {
    key: 'harga',
    teks: 'Seberapa penting harga murah bagi kamu saat memilih GOR?',
    opsi: [
      { label: 'Tidak penting', skor: 1 },
      { label: 'Kurang penting', skor: 2 },
      { label: 'Biasa saja', skor: 3 },
      { label: 'Penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'rating',
    teks: 'Apakah kamu lebih percaya GOR dengan rating tinggi?',
    opsi: [
      { label: 'Tidak percaya', skor: 1 },
      { label: 'Kadang saja', skor: 2 },
      { label: 'Netral', skor: 3 },
      { label: 'Lumayan penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'jarak',
    teks: 'Seberapa penting jarak dekat ke GOR dari lokasi kamu?',
    opsi: [
      { label: 'Tidak penting', skor: 1 },
      { label: 'Saya rela jauh', skor: 2 },
      { label: 'Biasa saja', skor: 3 },
      { label: 'Cukup penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'lapangan',
    teks: 'Apakah jenis lantai lapangan memengaruhi kenyamanan bermainmu?',
    opsi: [
      { label: 'Tidak peduli', skor: 1 },
      { label: 'Sedikit peduli', skor: 2 },
      { label: 'Netral', skor: 3 },
      { label: 'Cukup penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'fasilitas',
    teks: 'Apakah fasilitas (toilet, parkir, kantin) penting untuk kamu?',
    opsi: [
      { label: 'Tidak penting', skor: 1 },
      { label: 'Kurang penting', skor: 2 },
      { label: 'Biasa saja', skor: 3 },
      { label: 'Penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'jumlah',
    teks: 'Kamu lebih suka GOR dengan banyak lapangan agar tidak antre?',
    opsi: [
      { label: 'Tidak peduli', skor: 1 },
      { label: 'Lebih penting harga', skor: 2 },
      { label: 'Netral', skor: 3 },
      { label: 'Saya pertimbangkan', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  }
]

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/preferensi/${userId}`)
    if (res.data.found) {
      sudahSurvey.value = true
      preferensi.value = {
        harga: res.data.data.preferensi_harga,
        rating: res.data.data.preferensi_rating,
        jarak: res.data.data.preferensi_jarak,
        lapangan: res.data.data.preferensi_lapangan,
        fasilitas: res.data.data.preferensi_fasilitas,
        jumlah: res.data.data.preferensi_jumlah_lapangan
      }
    }
  } catch (err) {
    console.log('Belum ada preferensi')
  }
})

const submitSurvey = async () => {
  const valid = Object.values(jawaban.value).every(val => val !== null)
  if (!valid) return toast.error('Semua pertanyaan wajib diisi')

  try {
    await axios.post('http://localhost:3000/api/preferensi', {
      user_id: userId,
      ...jawaban.value
    })
    toast.success('Preferensi berhasil disimpan!')
    showModal.value = false
    sudahSurvey.value = true
    preferensi.value = { ...jawaban.value }
  } catch (err) {
    toast.error('Gagal menyimpan: ' + (err.response?.data?.error || err.message))
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
