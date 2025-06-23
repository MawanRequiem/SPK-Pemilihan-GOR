<template>

    <header class="md:hidden flex items-center justify-between w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-3 z-40 shadow-lg relative">
      <div class="flex items-center">
        <span class="text-2xl mr-3">🏸</span>
        <span class="font-bold text-lg tracking-wide">DSS GOR</span>
      </div>
      <button @click="sidebarOpen = !sidebarOpen" class="focus:outline-none">
        <svg v-if="!sidebarOpen" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <span v-else class="text-3xl">&times;</span>
      </button>
    </header>

    <transition name="mobile-nav-slide">
      <div v-if="sidebarOpen" class="fixed inset-0 z-50 md:hidden">
        <div class="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-gradient-to-b from-orange-300/80 via-orange-300/60 to-orange-400/80 backdrop-blur-xl shadow-2xl p-6 text-orange-900 mobile-nav-drawer z-50">
          <div class="flex items-center mb-12">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <span class="text-white text-xl">🏸</span>
            </div>
            <h2 class="text-xl font-bold bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent">DSS GOR</h2>
          </div>
          <nav class="space-y-2 text-sm">
            <RouterLink @click="sidebarOpen=false" to="/dashboard" class="group flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100/60 to-orange-200/60 font-semibold shadow-lg border border-orange-300/50">
              <span class="mr-3 text-lg">🏠</span>
              <span>Dashboard</span>
            </RouterLink>
            <RouterLink @click="sidebarOpen=false" to="/user/rekomendasi" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
              <span class="mr-3 text-lg group-hover:scale-110 transition-transform">⭐</span>
              <span class="font-medium">Rekomendasi</span>
            </RouterLink>
            <RouterLink @click="sidebarOpen=false" to="/user/riwayat" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
              <span class="mr-3 text-lg group-hover:scale-110 transition-transform">📜</span>
              <span class="font-medium">Riwayat</span>
            </RouterLink>
            <RouterLink @click="sidebarOpen=false" to="/user/profil" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
              <span class="mr-3 text-lg group-hover:scale-110 transition-transform">👤</span>
              <span class="font-medium">Profil</span>
            </RouterLink>
            <button @click="handleLogout" class="group flex items-center w-full px-4 py-3 rounded-xl hover:bg-red-100/50 text-red-600 transition-all duration-300 hover:scale-105 mt-8">
              <span class="mr-3 text-lg group-hover:scale-110 transition-transform">🚪</span>
              <span class="font-medium">Logout</span>
            </button>
          </nav>
        </div>
        <div class="absolute inset-0 bg-black/40 z-40" @click="sidebarOpen=false"></div>
      </div>
    </transition>

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
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">🏠</span>
          <span class="font-medium">Dashboard</span>
        </RouterLink>
        <RouterLink to="/user/rekomendasi" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">⭐</span>
          <span class="font-medium">Rekomendasi</span>
        </RouterLink>
        <RouterLink to="/user/riwayat" class="group flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100/60 to-orange-200/60 font-semibold shadow-lg border border-orange-300/50">
          <span class="mr-3 text-lg">📜</span>
          <span>Riwayat</span>
        </RouterLink>
        <RouterLink to="/user/profil" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">👤</span>
          <span class="font-medium">Profil</span>
        </RouterLink>
        <button @click="handleLogout" class="group flex items-center w-full px-4 py-3 rounded-xl hover:bg-red-100/50 text-red-600 transition-all duration-300 hover:scale-105 mt-8">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">🚪</span>
          <span class="font-medium">Logout</span>
        </button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 md:ml-64 px-6 py-10 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 relative z-10">
      <!-- Header Section -->
      <div class="mb-10">
        <div class="flex items-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl animate-bounce">
            <span class="text-white text-2xl">📜</span>
          </div>
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Histori Rekomendasi
            </h1>
            <p class="text-gray-600 mt-2">Lihat semua riwayat rekomendasi GOR yang pernah Anda buat</p>
          </div>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <span class="text-white text-xl">📊</span>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Total Pencarian</p>
                <p class="text-2xl font-bold text-gray-800">{{ history.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <span class="text-white text-xl">🏆</span>
              </div>
              <div>
                <p class="text-gray-600 text-sm">GOR Terekomendasi</p>
                <p class="text-2xl font-bold text-gray-800">{{ totalRecommendations }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span class="text-white text-xl">⚡</span>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Terakhir Dicari</p>
                <p class="text-sm font-medium text-gray-800">{{ lastSearchDate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berdasarkan tanggal atau nama GOR..."
              class="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200/50 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 transition-all duration-300"
            >
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <select
            v-model="sortBy"
            class="px-4 py-3 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200/50 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 transition-all duration-300"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!filteredHistory.length && !searchQuery" class="text-center py-20">
        <div class="w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span class="text-4xl">🏸</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-700 mb-4">Belum Ada Histori</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Mulai cari rekomendasi GOR terbaik untuk mendapatkan histori pencarian Anda
        </p>
        <RouterLink
          to="/user/rekomendasi"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span class="mr-2">⭐</span>
          Mulai Cari Rekomendasi
        </RouterLink>
      </div>

      <!-- No Search Results -->
      <div v-else-if="!filteredHistory.length && searchQuery" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🔍</span>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Tidak Ada Hasil</h3>
        <p class="text-gray-600">Coba ubah kata kunci pencarian Anda</p>
      </div>

      <!-- History Items -->
      <div v-else class="space-y-0">
        <TransitionGroup name="list" tag="div">
          <div
            v-for="(run, idx) in filteredHistory"
            :key="run.user_input_id"
            class="group mb-8"
          >
            <button
              @click="toggle(idx)"
              class="w-full flex justify-between items-center bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-orange-200/50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div class="flex items-center">
                <div class="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white text-xl">🏸</span>
                </div>
                <div class="text-left">
                  <h3 class="font-bold text-gray-800 text-lg">{{ formatDateOnly(run.waktu_submit) }}</h3>
                  <p class="text-gray-600">{{ formatTimeOnly(run.waktu_submit) }}</p>
                  <div class="flex items-center mt-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <span class="mr-1">🏆</span>
                      {{ run.rekomendasi.length }} GOR
                    </span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                      <span class="mr-1">⭐</span>
                      Skor: {{ getTopScore(run.rekomendasi) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="mr-4 text-right">
                  <div class="text-sm text-gray-500">{{ getTimeAgo(run.waktu_submit) }}</div>
                </div>
                <svg
                  :class="{'rotate-180': openIndex === idx}"
                  class="w-6 h-6 transition-all duration-300 text-orange-600 group-hover:text-orange-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <Transition
              name="slide"
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="transform -translate-y-4 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-4 opacity-0"
            >
              <div v-show="openIndex === idx" class="mt-4">
                <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-orange-100/50 overflow-hidden">
                  <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                    <h4 class="text-white font-bold text-lg flex items-center">
                      <span class="mr-2">🏆</span>
                      Hasil Rekomendasi
                    </h4>
                  </div>
                  
                  <div class="p-0">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-gradient-to-r from-orange-100 to-orange-200">
                          <tr>
                            <th class="px-6 py-4 text-left font-bold text-orange-800">Peringkat</th>
                            <th class="px-6 py-4 text-left font-bold text-orange-800">Nama GOR</th>
                            <th class="px-6 py-4 text-left font-bold text-orange-800">Skor</th>
                            <th class="px-6 py-4 text-left font-bold text-orange-800">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(r, i) in run.rekomendasi"
                            :key="r.id_gor"
                            :class="[
                              'border-t border-orange-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-white transition-all duration-300',
                              { 'bg-gradient-to-r from-yellow-50 to-orange-50': i === 0 }
                            ]"
                          >
                            <td class="px-6 py-4">
                              <div class="flex items-center">
                                <span v-if="i === 0" class="text-5xl">🥇</span>
                                <span v-else-if="i === 1" class="text-5xl">🥈</span>
                                <span v-else-if="i === 2" class="text-5xl">🥉</span>
                                <span v-else class="text-4xl">🏸</span>
                              </div>
                            </td>
                            <td class="px-6 py-4">
                              <div class="font-semibold text-gray-800">{{ r.nama_gor }}</div>
                            </td>
                            <td class="px-6 py-4">
                              <div class="flex items-center">
                                <div class="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                  <div
                                    class="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000"
                                    :style="{ width: (r.skor / getTopScore(run.rekomendasi) * 100) + '%' }"
                                  ></div>
                                </div>
                                <span class="font-bold text-orange-600">{{ r.skor }}</span>
                              </div>
                            </td>
                            <td class="px-6 py-4">
                              <span :class="[
                                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                                i === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              ]">
                                {{ i === 0 ? '🏆 Terbaik' : '⭐ Rekomendasi' }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user.user_id
const history = ref([])
const openIndex = ref(null)
const searchQuery = ref('')
const sortBy = ref('newest')
const toast = useToast()
const sidebarOpen = ref(false)

// Computed properties
const filteredHistory = computed(() => {
  let filtered = history.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(run => {
      const date = formatDate(run.waktu_submit).toLowerCase()
      const gorNames = run.rekomendasi.map(r => r.nama_gor.toLowerCase()).join(' ')
      return date.includes(query) || gorNames.includes(query)
    })
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    const dateA = new Date(a.waktu_submit)
    const dateB = new Date(b.waktu_submit)
    return sortBy.value === 'newest' ? dateB - dateA : dateA - dateB
  })

  return filtered
})

const totalRecommendations = computed(() => {
  return history.value.reduce((total, run) => total + run.rekomendasi.length, 0)
})

const lastSearchDate = computed(() => {
  if (!history.value.length) return 'Belum ada'
  const latest = history.value.reduce((latest, run) => {
    return new Date(run.waktu_submit) > new Date(latest.waktu_submit) ? run : latest
  })
  return formatDate(latest.waktu_submit)
})

onMounted(async () => {
  try {
    const res = await axios.get(`https://eligo-gor-backend-1013400068110.asia-east1.run.app/api/riwayat/${userId}`)
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

const formatDateOnly = (dt) => {
  const d = new Date(dt)
  return d.toLocaleDateString('id-ID', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTimeOnly = (dt) => {
  const d = new Date(dt)
  return d.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getTimeAgo = (dt) => {
  const now = new Date()
  const date = new Date(dt)
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 0) return `${diffDays} hari lalu`
  if (diffHours > 0) return `${diffHours} jam lalu`
  if (diffMinutes > 0) return `${diffMinutes} menit lalu`
  return 'Baru saja'
}

const getTopScore = (rekomendasi) => {
  if (!rekomendasi.length) return 0
  return Math.max(...rekomendasi.map(r => r.skor))
}

const handleLogout = () => {
  localStorage.removeItem('user')
  // Navigate to login
}
</script>

<style scoped>
.mobile-nav-slide-enter-active, .mobile-nav-slide-leave-active {
  transition: opacity 0.2s, transform 0.3s cubic-bezier(.6,.1,.3,1.1);
}
.mobile-nav-slide-enter-from,
.mobile-nav-slide-leave-to {
  opacity: 0;
}
.mobile-nav-slide-enter-from .mobile-nav-drawer {
  transform: translateX(-100%);
}
.mobile-nav-slide-enter-to .mobile-nav-drawer {
  transform: translateX(0%);
}
.mobile-nav-slide-leave-from .mobile-nav-drawer {
  transform: translateX(0%);
}
.mobile-nav-slide-leave-to .mobile-nav-drawer {
  transform: translateX(-100%);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #fb923c, #f97316);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #f97316, #ea580c);
}
</style>