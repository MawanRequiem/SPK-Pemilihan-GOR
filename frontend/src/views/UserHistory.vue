<template>
  <div class="min-h-screen flex">
    <!-- SIDEBAR -->
    <aside class="hidden md:flex flex-col w-52 h-screen bg-gradient-to-b from-orange-300/50 to-orange-400/50 backdrop-blur-md text-orange-900 fixed top-0 left-0 p-4 z-40 shadow-lg border-r border-orange-600">
      <h2 class="text-lg font-bold mb-10">🏸 DSS GOR</h2>
      <nav class="space-y-3 text-sm">
        <RouterLink to="/dashboard" class="block px-3 py-2 rounded hover:bg-orange-100/50">🏠 Dashboard</RouterLink>
        <RouterLink to="/user/rekomendasi" class="block px-3 py-2 rounded hover:bg-orange-100/50">⭐ Rekomendasi</RouterLink>
        <RouterLink to="/user/riwayat" class="block px-3 py-2 rounded bg-orange-100/30 font-semibold">📜 Riwayat</RouterLink>
        <RouterLink to="/user/profil" class="block px-3 py-2 rounded hover:bg-orange-100/50">👤 Profil</RouterLink>
        <button @click="handleLogout" class="block w-full text-left px-3 py-2 rounded hover:bg-orange-100/50 text-red-600">🚪 Logout</button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 md:ml-52 px-6 py-10 bg-gradient-to-br from-orange-50 to-white">
      <h1 class="text-3xl font-bold text-orange-700 mb-6">📜 Histori Rekomendasi</h1>

      <div v-if="!history.length" class="text-gray-600">
        Belum ada histori rekomendasi. Yuk coba fitur rekomendasi dulu!
      </div>

      <div v-for="(run, idx) in history" :key="run.user_input_id" class="mb-6">
        <button
          @click="toggle(idx)"
          class="w-full flex justify-between items-center bg-white/80 backdrop-blur p-4 rounded-lg shadow border border-orange-200 hover:bg-orange-50 transition"
        >
          <span class="font-medium">Run pada {{ formatDate(run.waktu_submit) }}</span>
          <svg
            :class="{'rotate-180': openIndex === idx}"
            class="w-5 h-5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openIndex === idx" class="mt-2 bg-white p-4 rounded-lg shadow border border-orange-100">
          <table class="w-full text-sm">
            <thead class="bg-orange-100">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">Nama GOR</th>
                <th class="p-2 text-left">Skor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(r, i) in run.rekomendasi"
                :key="r.id_gor"
                class="border-t hover:bg-orange-50"
              >
                <td class="p-2">{{ r.ranking }}</td>
                <td class="p-2">{{ r.nama_gor }}</td>
                <td class="p-2">{{ r.skor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user.user_id
const history = ref([])
const openIndex = ref(null)
const toast = useToast()

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/riwayat/${userId}`)
    history.value = res.data.history
  } catch (err) {
    toast.error('Gagal memuat histori')
  }
})

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i
}

const formatDate = (dt) => {
  const d = new Date(dt)
  return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped>
</style>
