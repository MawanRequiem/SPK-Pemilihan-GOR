<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white p-6 hidden md:block">
      <h2 class="text-2xl font-bold mb-10">🏸 Admin GOR</h2>
      <nav class="space-y-4">
        <RouterLink to="/admin" class="block bg-orange-800 px-4 py-2 rounded">📊 Dashboard</RouterLink>
        <RouterLink to="/admin/tambah-gor" class="block hover:bg-orange-800 px-4 py-2 rounded">➕ Tambah GOR</RouterLink>
        <RouterLink
            to="#"
            @click.prevent="handleLogout"
            class="block px-4 py-2 rounded hover:bg-orange-800 transition"
            >
            🚪 Logout
        </RouterLink>
      </nav>
    </aside>

    <!-- Main -->
    <main class="flex-1 p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-orange-800 mb-2">Halo, {{ adminName }}! 👋</h1>
        <p class="text-gray-600">Selamat datang di dashboard admin. Di sini kamu bisa mengelola data GOR.</p>
      </div>

      <!-- List GOR -->
      <div>
        <h2 class="text-xl font-semibold text-orange-700 mb-4">Daftar GOR Terdaftar</h2>

        <div v-if="loading" class="text-gray-500">Memuat data...</div>
        <div v-else-if="daftarGOR.length === 0" class="text-gray-500">Belum ada GOR yang ditambahkan.</div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="gor in daftarGOR"
            :key="gor.id_gor"
            class="bg-white border border-orange-200 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 class="text-lg font-semibold text-orange-700">{{ gor.nama_gor }}</h3>
            <p class="text-sm text-gray-600">Rating: {{ gor.rating }}</p>
            <p class="text-sm text-gray-600">Harga: Rp {{ gor.harga_sewa }}</p>
            <p class="text-sm text-gray-600">Jumlah Lapangan: {{ gor.jumlah_lapangan }}</p>
            <p class="text-sm text-gray-600">Jenis: {{ gor.jenis_lapangan || '-' }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Ambil data admin dari localStorage
const user = JSON.parse(localStorage.getItem('user') || '{}')
const adminName = user.nama_lengkap || 'Admin'

const daftarGOR = ref([])
const loading = ref(true)
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}


const fetchGOR = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/admin/gor')
    daftarGOR.value = res.data || []
  } catch (err) {
    console.error('Gagal memuat GOR:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchGOR)
</script>
