<template>
  <div class="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
    <!-- Background Animation -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Navbar (atas) khusus mobile -->
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

    <!-- Sidebar desktop -->
    <aside class="hidden md:flex flex-col w-64 h-screen 
  bg-gradient-to-b from-orange-300/70 via-orange-300/60 to-orange-400/70 
  backdrop-blur-xl text-orange-900 
  fixed top-0 left-0 z-40 p-6 shadow-2xl border-r border-orange-600/30">
      <div class="flex items-center mb-12">
        <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <span class="text-white text-xl">🏸</span>
        </div>
        <h2 class="text-xl font-bold bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent">DSS GOR</h2>
      </div>
      <nav class="space-y-2 text-sm">
        <RouterLink to="/dashboard" class="group flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100/60 to-orange-200/60 font-semibold shadow-lg border border-orange-300/50">
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

    <!-- Sidebar drawer mobile -->
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

    <main class="flex-1 md:ml-64 px-2 sm:px-4 md:px-6 py-4 md:py-10 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 relative z-10">
      <!-- Header -->
      <div class="mb-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
          <div class="flex items-center">
            <div class="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl md:rounded-3xl flex items-center justify-center mr-4 md:mr-6 shadow-2xl animate-bounce">
              <span class="text-white text-2xl md:text-3xl">🎯</span>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                Dashboard GOR
              </h1>
              <p class="text-gray-600 mt-1 text-sm md:text-base">Selamat datang, {{ user.nama_lengkap }}! 👋</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs md:text-sm text-gray-500">{{ currentDate }}</div>
            <div class="text-xs text-gray-400">{{ currentTime }}</div>
          </div>
        </div>
        <!-- Status Preferensi Card -->
        <div class="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl border border-orange-200/50 p-4 md:p-8 mb-8 hover:shadow-3xl transition-all duration-300">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 shadow-lg">
                <span class="text-white text-xl md:text-2xl">🔎</span>
              </div>
              <div>
                <h3 class="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Status Preferensi</h3>
                <div v-if="sudahSurvey" class="space-y-1 md:space-y-2">
                  <p class="text-green-600 font-semibold flex items-center text-sm">
                    <span class="mr-2">✅</span>
                    Preferensi sudah diisi
                  </p>
                  <div class="flex flex-wrap gap-2 mt-2 md:mt-3">
                    <span v-for="(val, key) in preferensiDisplay" :key="key" 
                          class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs md:text-sm font-medium capitalize">
                      {{ key }}: {{ val }}/5
                    </span>
                  </div>
                </div>
                <div v-else class="space-y-1">
                  <p class="text-amber-600 font-semibold flex items-center text-sm">
                    <span class="mr-2">⚠️</span>
                    Belum mengisi preferensi
                  </p>
                  <p class="text-gray-600 text-xs md:text-sm">Isi preferensi untuk mendapatkan rekomendasi yang akurat</p>
                </div>
              </div>
            </div>
            <button @click="showModal = true" 
                    class="w-full md:w-auto mt-3 md:mt-0 px-4 md:px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              {{ sudahSurvey ? 'Ubah Preferensi' : 'Isi Preferensi' }}
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div class="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <span class="text-white text-lg md:text-xl">🏸</span>
              </div>
              <div>
                <p class="text-xs md:text-sm text-gray-600">Total GOR</p>
                <p class="text-lg md:text-2xl font-bold text-gray-800">{{ totalGOR }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <span class="text-white text-lg md:text-xl">⭐</span>
              </div>
              <div>
                <p class="text-xs md:text-sm text-gray-600">Rata-rata Rating</p>
                <p class="text-lg md:text-2xl font-bold text-gray-800">{{ averageRating }}/5</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <span class="text-white text-lg md:text-xl">💰</span>
              </div>
              <div>
                <p class="text-xs md:text-sm text-gray-600">Harga Rata-rata</p>
                <p class="text-lg md:text-2xl font-bold text-gray-800">{{ averagePrice/1000 }}k</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div class="flex items-center">
              <div class="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <span class="text-white text-lg md:text-xl">📊</span>
              </div>
              <div>
                <p class="text-xs md:text-sm text-gray-600">Total Pencarian</p>
                <p class="text-lg md:text-2xl font-bold text-gray-800">{{ totalSearches }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-1 bg-white/60 backdrop-blur-lg p-2 rounded-xl md:rounded-2xl shadow-lg border border-orange-200/50">
          <button @click="activeTab = 'ranking'" 
                  :class="[
                    'flex-1 py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold transition-all duration-300',
                    activeTab === 'ranking' 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-orange-100/50'
                  ]">
            <span class="mr-2">🏆</span>
            Perangkingan Terakhir
          </button>
          <button @click="activeTab = 'list'" 
                  :class="[
                    'flex-1 py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold transition-all duration-300',
                    activeTab === 'list' 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-orange-100/50'
                  ]">
            <span class="mr-2">📋</span>
            Daftar Semua GOR
          </button>
        </div>
      </div>

      <div class="transition-all duration-500">
        <div v-if="activeTab === 'list'" class="space-y-6">
          <div class="bg-white/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 shadow-lg border border-orange-200/50">
            <div class="relative">
              <input v-model="searchQuery" 
                type="text" 
                placeholder="Cari GOR berdasarkan nama atau lokasi..."
                class="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-lg rounded-lg md:rounded-xl shadow-lg border border-orange-200/50 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 transition-all duration-300 text-sm md:text-base"/>
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="gor in filteredGORList" :key="gor.id_gor"
              class="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-xl border border-orange-200/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div class="p-4 md:p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span class="text-white text-lg md:text-xl">🏸</span>
                  </div>
                  <div class="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <span class="text-yellow-500 mr-1">⭐</span>
                    <span class="text-xs font-semibold">{{ gor.rating }}</span>
                  </div>
                </div>
                <h3 class="font-bold text-base md:text-lg text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {{ gor.nama_gor }}
                </h3>
                <div class="space-y-2 text-xs md:text-sm text-gray-600 mb-4">
                  <div class="flex items-center">
                    <span class="mr-2">📍</span>
                    {{ gor.kota }}, {{ gor.provinsi }}
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">💰</span>
                    Rp {{ formatPrice(gor.harga_sewa) }}/jam
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">🏟️</span>
                    {{ gor.jumlah_lapangan }} lapangan
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">🏸</span>
                    {{ gor.jenis_lapangan || 'Standar' }}
                  </div>
                </div>
                <div class="pt-4 border-t border-gray-200">
                  <button class="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredGORList.length === 0" class="text-center py-16">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-base md:text-xl font-bold text-gray-700 mb-2">Tidak Ada GOR Ditemukan</h3>
            <p class="text-gray-600 text-sm">Coba ubah kata kunci pencarian Anda</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center md:p-4">
      <div class="bg-white w-full h-full md:max-w-2xl md:max-h-[90vh] md:rounded-3xl md:h-auto md:w-auto rounded-none overflow-y-auto shadow-2xl relative">
        <div class="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-4 md:p-6 rounded-t-none md:rounded-t-3xl">
          <div class="flex items-center justify-between">
            <h2 class="text-lg md:text-2xl font-bold text-white flex items-center">
              <span class="mr-2 md:mr-3">📝</span>
              Survey Preferensi
            </h2>
            <button @click="showModal = false" 
                    class="text-white hover:text-orange-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-300">
              ×
            </button>
          </div>
          <p class="text-orange-100 text-xs md:text-sm mt-2">Bantu kami memberikan rekomendasi terbaik untuk Anda</p>
        </div>
        <form @submit.prevent="submitSurvey" class="p-4 md:p-6 space-y-6">
          <div v-for="p in pertanyaan" :key="p.key" class="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-all duration-300">
            <label class="block font-bold text-gray-800 mb-2 md:mb-4 text-base md:text-lg">{{ p.teks }}</label>
            <div class="grid grid-cols-1 gap-3">
              <label v-for="opt in p.opsi" :key="opt.label" 
                     class="flex items-center gap-3 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 cursor-pointer">
                <input type="radio" :name="p.key" :value="opt.skor" v-model="jawaban[p.key]" 
                       class="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500" required />
                <span class="text-gray-700 font-medium text-xs md:text-base">{{ opt.label }}</span>
              </label>
            </div>
          </div>
          <div class="pt-4 md:pt-6 border-t border-gray-200">
            <button type="submit" 
                    class="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span class="mr-2">💾</span>
              Simpan Preferensi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = ref(null)
const sidebarOpen = ref(false)

// Reactive data
const activeTab = ref('ranking')
const showModal = ref(false)
const sudahSurvey = ref(false)
const preferensiData = ref({})
const searchQuery = ref('')
const currentDate = ref('')
const currentTime = ref('')
const totalGOR = ref(0)
const averageRating = ref(0)
const averagePrice = ref(0)
const totalSearches = ref(0)
const lastRanking = ref([])
const lastRankingDate = ref('')
const gorList = ref([])

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

      { label: 'Cukup penting', skor: 4 },
      { label: 'Sangat penting', skor: 5 }
    ]
  },
  {
    key: 'waktu',
    teks: 'Seberapa penting waktu/ketersediaan jam main bagimu?',
    opsi: [
      { label: 'Tidak Peduli', skor: 1 },
      { label: 'Kurang Penting', skor: 2 },
      { label: 'Netral', skor: 3 },
      { label: 'Cukup Penting', skor: 4 },
      { label: 'Sangat Penting', skor: 5 }
    ]
  }
]

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/me', { withCredentials: true })
    userId.value = res.data.id
    // Setelah userId berhasil didapat, baru fetch lainnya:
    await fetchSurvey()
    await fetchRanking()
    await fetchGORList()
  } catch (err) {
    toast.error('Gagal mengambil data pengguna')
  }
}

onMounted(() => {
  setDateTime()
  fetchUser()
})

const setDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  currentTime.value = now.toLocaleTimeString('id-ID')
}

const fetchSurvey = async () => {
  try {
    const res = await axios.get(`/api/preferensi/${userId.value}`)
    if (res.data.found) {
      sudahSurvey.value = true
      const data = res.data.data
      preferensiData.value = {
        harga: data.preferensi_harga,
        rating: data.preferensi_rating,
        jarak: data.preferensi_jarak,
        lapangan: data.preferensi_lapangan,
        fasilitas: data.preferensi_fasilitas,
        jumlah: data.preferensi_jumlah_lapangan
      }
    } else {
      sudahSurvey.value = false
    }
  } catch (err) {
    toast.error('Gagal memuat preferensi')
  }
}

const fetchRanking = async () => {
  try {
    const res = await axios.get(`/api/rekomendasi/ranking/${userId.value}`)
    if (res.data && res.data.ranking) {
      lastRanking.value = res.data.ranking
      lastRankingDate.value = res.data.tanggal
    }
  } catch (err) {
    toast.error('Gagal memuat perangkingan')
  }
}

const fetchGORList = async () => {
  try {
    const res = await axios.get('/api/admin/gor')
    gorList.value = Array.isArray(res.data) ? res.data : res.data.data || []
    totalGOR.value = res.data.length
    totalSearches.value = res.data.reduce((acc, cur) => acc + (cur.dipilih || 0), 0)
    averageRating.value = (
      res.data.reduce((sum, g) => sum + (parseFloat(g.rating) || 0), 0) / res.data.length
    ).toFixed(1)
    averagePrice.value = (
      res.data.reduce((sum, g) => sum + (parseFloat(g.harga_sewa) || 0), 0) / res.data.length
    ).toFixed(0)
  } catch (err) {
    toast.error('Gagal memuat data GOR')
  }
}

const formatDate = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

const getMaxScore = (list) => {
  if (!list || list.length === 0) return 1
  return Math.max(...list.map(item => item.skor))
}

const filteredGORList = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return gorList.value.filter(gor => gor.nama_gor.toLowerCase().includes(q) || gor.kota.toLowerCase().includes(q) || gor.provinsi.toLowerCase().includes(q))
})

const preferensiDisplay = computed(() => {
  const mapping = {
    harga: 'Harga',
    rating: 'Rating',
    jarak: 'Jarak',
    lapangan: 'Lapangan',
    fasilitas: 'Fasilitas',
    jumlah: 'Jumlah'
  }
  const obj = {}
  for (const key in preferensiData.value) {
    if (preferensiData.value[key]) {
      obj[mapping[key]] = preferensiData.value[key]
    }
  }
  return obj
})

const submitSurvey = async () => {
  try {
    const payload = { user_id: userId.value, ...jawaban.value }
    const res = await axios.post('/api/preferensi', payload)
    toast.success(res.data.message || 'Preferensi berhasil disimpan')
    showModal.value = false
    fetchSurvey()
    fetchRanking()
  } catch (err) {
    toast.error('Gagal menyimpan preferensi')
  }
}

const handleLogout = async () => {
  try {
    await axios.post('/api/logout', null, { withCredentials: true })
    localStorage.removeItem('user') // kalau kamu nyimpan cache
    router.push('/login') // arahkan kembali ke halaman login
  } catch (err) {
    toast.error('Gagal logout')
  }
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

/* Animation classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #fb923c, #f97316);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #f97316, #ea580c);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-orange-600 {
  color: #ea580c;
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid-cols-1.md\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

/* Enhanced button animations */
button:active {
  transform: scale(0.98);
}

/* Loading animation for progress bars */
@keyframes progressAnimation {
  0% {
    width: 0%;
  }
  100% {
    width: var(--target-width);
  }
}

.transition-all.duration-1000 {
  animation: progressAnimation 1s ease-out;
}

/* Tab transition effects */
.transition-all.duration-500 {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Enhanced card shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Pulse animation for stats */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Gradient text animation */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r.from-orange-700.via-orange-600.to-orange-500 {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* Enhanced table hover effects */
tbody tr:hover {
  transform: translateX(4px);
  transition: transform 0.2s ease;
}

/* Radio button custom styling */
input[type="radio"]:checked {
  background-color: #ea580c;
  border-color: #ea580c;
}

input[type="radio"]:focus {
  ring-color: #fb923c;
  ring-opacity: 0.5;
}

/* Enhanced search input */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(251, 146, 60, 0.15);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-10 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
}

/* Enhanced loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #fb923c;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
@media (max-width: 640px) {
  .overflow-y-auto {
    max-height: 90vh;
  }
  .rounded-3xl {
    border-radius: 0.5rem;
  }
  .text-4xl, .text-3xl { font-size: 1.5rem; }
}
</style>