<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- MOBILE NAVBAR -->
    <nav class="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span class="text-2xl">🏸</span>
          </div>
          <h2 class="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Admin GOR</h2>
        </div>
        <button @click="toggleMobileMenu" class="text-white focus:outline-none p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
          <svg class="w-6 h-6 transform transition-transform duration-300" :class="{'rotate-180': isMobileMenuOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path :class="{'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path :class="{'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-show="isMobileMenuOpen" class="mt-6 space-y-3 animate-fade-in">
        <RouterLink to="/admin" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path === '/admin' }" @click="closeMobileMenu"><span class="text-xl">📊</span><span class="font-medium">Dashboard</span></RouterLink>
        <RouterLink to="/admin/tambah-gor" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path === '/admin/tambah-gor' }" @click="closeMobileMenu"><span class="text-xl">➕</span><span class="font-medium">Tambah GOR</span></RouterLink>
        <RouterLink to="/admin/riwayat" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path === '/admin/histori-dss' }" @click="closeMobileMenu"><span class="text-xl">📈</span><span class="font-medium">Histori DSS</span></RouterLink>
        <a href="#" @click.prevent="handleLogout" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 transform hover:scale-105"><span class="text-xl">🚪</span><span class="font-medium">Logout</span></a>
      </div>
    </nav>

    <div class="flex">
      <!-- SIDEBAR DESKTOP -->
      <aside class="w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white p-6 hidden md:block min-h-screen shadow-2xl relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div class="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10">
          <div class="flex items-center space-x-4 mb-12">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"><span class="text-2xl">🏸</span></div>
            <div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Admin GOR</h2>
              <p class="text-blue-200 text-sm opacity-80">Management Panel</p>
            </div>
          </div>
          <nav class="space-y-3">
            <RouterLink to="/admin" class="sidebar-link" :class="{ 'active-sidebar': $route.path === '/admin' }"><span class="text-xl">📊</span><span class="font-semibold">Dashboard</span></RouterLink>
            <RouterLink to="/admin/tambah-gor" class="sidebar-link" :class="{ 'active-sidebar': $route.path === '/admin/tambah-gor' }"><span class="text-xl">➕</span><span class="font-semibold">Tambah GOR</span></RouterLink>
            <RouterLink to="/admin/riwayat" class="sidebar-link" :class="{ 'active-sidebar': $route.path === '/admin/histori-dss' }"><span class="text-xl">📈</span><span class="font-semibold">Histori DSS</span></RouterLink>
            <a href="#" @click.prevent="handleLogout" class="sidebar-link hover:bg-red-500/20"><span class="text-xl">🚪</span><span class="font-semibold">Logout</span></a>
          </nav>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 p-4 md:p-10">
        <!-- Header -->
        <div class="mb-10">
          <div class="bg-gradient-to-r from-white to-blue-50 rounded-3xl p-8 shadow-lg border border-blue-100">
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Histori DSS Seluruh User
            </h1>
            <p class="text-gray-600 text-lg">
              Rekap seluruh pemakaian DSS, GOR terpopuler, dan statistik otomatis.
            </p>
          </div>
        </div>

        <!-- Stats Kecil -->
        <div class="grid gap-6 md:grid-cols-3 mb-10">
          <div class="group bg-gradient-to-br from-indigo-400 to-blue-500 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div class="relative z-10">
              <div class="flex items-center text-3xl gap-2 mb-3"><span>🏆</span>Ranking 1 Terbanyak</div>
              <div class="text-2xl font-bold">{{ top1GorLabel }}</div>
              <div class="text-blue-100 text-md mt-1">{{ top1Count }}x Ranking #1</div>
            </div>
          </div>
          <div class="group bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div class="relative z-10 flex flex-col">
              <div class="flex items-center text-3xl gap-2 mb-3"><span>🔥</span>GOR Terpopuler</div>
              <div class="text-2xl font-bold">{{ populerGorLabel }}</div>
              <div class="text-pink-100 text-md mt-1">{{ populerCount }}x masuk Top 3</div>
            </div>
          </div>
          <div class="group bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="relative z-10">
              <div class="flex items-center text-3xl gap-2 mb-3"><span>👤</span>User</div>
              <div class="text-2xl font-bold">{{ userCount }}</div>
              <div class="text-emerald-100 text-md mt-1">{{ totalRecords }} histori</div>
            </div>
          </div>
        </div>
        
        <!-- Filter Kota/Provinsi -->
        <div class="mb-7 flex gap-3 items-end flex-wrap">
          <div>
            <label class="text-sm font-semibold text-indigo-600 block mb-1">Filter Kota</label>
            <select v-model="filterKota" class="input input-bordered px-4 py-2 rounded-2xl border-2 bg-white/80 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500">
              <option value="">Semua</option>
              <option v-for="k in allKota" :key="k">{{ k }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-semibold text-indigo-600 block mb-1">Filter Provinsi</label>
            <select v-model="filterProvinsi" class="input input-bordered px-4 py-2 rounded-2xl border-2 bg-white/80 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500">
              <option value="">Semua</option>
              <option v-for="k in allProvinsi" :key="k">{{ k }}</option>
            </select>
          </div>
          <button v-if="filterKota || filterProvinsi" @click="resetFilter" class="py-2 px-6 ml-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-2xl font-semibold shadow-sm hover:from-red-500 hover:to-pink-600 transition">Reset</button>
        </div>

        <!-- Table -->
        <div class="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Daftar Histori Pemakaian DSS
          </h2>
          <div v-if="loading" class="py-16 text-center text-lg">Memuat data...</div>
          <div v-else-if="flatHistory.length === 0" class="py-16 text-center">
            <div class="text-7xl mb-6">📉</div>
            <div class="text-xl font-bold text-gray-600 mb-2">Belum ada histori pemakaian DSS</div>
          </div>
          <div v-else class="overflow-x-auto">
            <table class="min-w-full table-auto text-left">
              <thead>
                <tr class="text-indigo-700 font-bold border-b border-indigo-200 text-sm">
                  <th class="py-3 px-4">Waktu</th>
                  <th class="py-3 px-4">User</th>
                  <th class="py-3 px-4">Ranking #1</th>
                  <th class="py-3 px-4">Top 3</th>
                  <th class="py-3 px-4">Kota</th>
                  <th class="py-3 px-4">Provinsi</th>
                  <th class="py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in filteredHistory" :key="h.user_input_id" class="hover:bg-indigo-50 transition-all cursor-pointer group" @click="openDetail(h)">
                  <td class="py-3 px-4 font-mono">{{ formatDate(h.waktu_submit) }}</td>
                  <td class="py-3 px-4">{{ h.user_nama }}</td>
                  <td class="py-3 px-4 font-bold"><span class="inline-block px-3 py-1 bg-gradient-to-r from-yellow-300 to-yellow-200 text-yellow-900 rounded-full font-bold shadow">{{
                    h.top1?.nama_gor || '-'
                  }}</span></td>
                  <td class="py-3 px-4">
                    <span v-for="g in h.top3" :key="g.nama_gor" class="inline-block mr-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-full text-indigo-800 font-semibold shadow">
                      {{ g.nama_gor }}
                    </span>
                  </td>
                  <td class="py-3 px-4">{{ h.kota }}</td>
                  <td class="py-3 px-4">{{ h.provinsi }}</td>
                  <td class="py-3 px-4"><button class="px-4 py-2 bg-indigo-600 text-white rounded-2xl shadow hover:scale-105 transition" @click.stop="openDetail(h)">Detail</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal/detail pop up konten -->
        <div v-if="showDetail" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div class="bg-white/95 rounded-3xl max-w-2xl w-full p-10 shadow-xl border border-indigo-200 animate-fade-in">
            <div class="mb-6 flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg text-2xl">📊</div>
                <div>
                  <h3 class="text-xl font-bold text-indigo-800 mb-1">History DSS Detail</h3>
                  <span class="text-sm text-gray-500">User: <b>{{ detailUser?.user_nama }}</b></span>
                  <div class="text-sm text-gray-400">{{ formatDate(detailUser?.waktu_submit) }}</div>
                </div>
              </div>
              <button @click="closeDetail" class="text-gray-600 hover:text-red-500 text-3xl font-bold p-2 rounded-xl hover:bg-red-50 transition"><span>&times;</span></button>
            </div>
            <div>
              <h4 class="text-md font-semibold text-indigo-700 mb-3">Ranking GOR:</h4>
              <table class="w-full table-auto text-left">
                <thead>
                  <tr class="bg-indigo-50">
                    <th class="py-2 px-3">Ranking</th>
                    <th class="py-2 px-3">Nama GOR</th>
                    <th class="py-2 px-3">Skor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in detailUser?.rekomendasi || []" :key="row.id_gor" class="hover:bg-indigo-100">
                    <td class="py-2 px-3 font-bold">{{ row.ranking }}</td>
                    <td class="py-2 px-3">{{ row.nama_gor }}</td>
                    <td class="py-2 px-3">{{ Math.round(row.skor * 100) / 100 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const $route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)
function toggleMobileMenu() { isMobileMenuOpen.value = !isMobileMenuOpen.value }
function closeMobileMenu() { isMobileMenuOpen.value = false }
function handleLogout() { localStorage.removeItem('user'); router.push('/login') }

const loading = ref(true)
const flatHistory = ref([])
const showDetail = ref(false)
const detailUser = ref(null)

const filterKota = ref('')
const filterProvinsi = ref('')

const allKota = ref([])
const allProvinsi = ref([])

// --- Untuk statistik di atas
const top1GorLabel = ref('-')
const top1Count = ref(0)
const populerGorLabel = ref('-')
const populerCount = ref(0)
const userCount = ref(0)
const totalRecords = ref(0)

onMounted(async () => {
  try {
    // NOTE: ganti API/endpoint jadi endpoint admin-history-ALL (data join ke user/user_input/gor/history) 
    // atau bentuk apapun asalkan datanya ada user, waktu, kota, provinsi, hasil ranking setiap history.
    const { data } = await axios.get('https://eligo-gor-backend-1013400068110.asia-east1.run.app/api/admin/history-all')
    // Data contoh: [{ user_input_id, waktu_submit, user_id, user_nama, kota, provinsi, rekomendasi: [ ...{id_gor, nama_gor, skor, ranking} ] }]

    // "flatHistory" diharuskan = satu array semua submit seluruh user
    flatHistory.value = data.history.map(u => {
      const topSorted = [...u.rekomendasi].sort((a, b) => a.ranking - b.ranking)
      const top1 = topSorted[0] || null
      const top3 = topSorted.slice(0,3)
      return { ...u, top1, top3 }
    })

    // === Ringkasan
    const ranking1Tally = {}
    const popTally = {}
    const _users = new Set()
    const kotaSet = new Set(), provSet = new Set()
    flatHistory.value.forEach(h => {
      h.kota && kotaSet.add(h.kota)
      h.provinsi && provSet.add(h.provinsi)
      _users.add(h.user_nama || h.user_id)
      if (h.top1?.nama_gor) {
        ranking1Tally[h.top1.nama_gor] = (ranking1Tally[h.top1.nama_gor]||0) + 1
      }
      h.top3 && h.top3.forEach(x => {
        popTally[x.nama_gor] = (popTally[x.nama_gor]||0) + 1
      })
    })
    allKota.value = Array.from(kotaSet).sort()
    allProvinsi.value = Array.from(provSet).sort()
    userCount.value = _users.size
        totalRecords.value = flatHistory.value.length;

    // GOR paling sering ranking 1
    let mostRanked = Object.entries(ranking1Tally).sort((a, b) => b[1] - a[1])[0] || [];
    top1GorLabel.value = mostRanked[0] || '-';
    top1Count.value = mostRanked[1] || 0;

    // GOR paling sering muncul top 3
    let mostPop = Object.entries(popTally).sort((a, b) => b[1] - a[1])[0] || [];
    populerGorLabel.value = mostPop[0] || '-';
    populerCount.value = mostPop[1] || 0;

    loading.value = false;
  } catch (err) {
    loading.value = false;
    alert("Gagal mengambil history DSS: " + err.message);
  }
});

// Filtering list berdasarkan filter kota/provinsi (search bar bisa ditambah jika perlu)
const filteredHistory = computed(() => {
  return flatHistory.value.filter(h => {
    const byKota = !filterKota.value || h.kota === filterKota.value;
    const byProvinsi = !filterProvinsi.value || h.provinsi === filterProvinsi.value;
    return byKota && byProvinsi;
  });
});

// Filter reset
function resetFilter() {
  filterKota.value = '';
  filterProvinsi.value = '';
}

// Modal/detail handler
function openDetail(h) {
  detailUser.value = h;
  showDetail.value = true;
}
function closeDetail() {
  showDetail.value = false;
  detailUser.value = null;
}

// Date formatting helper
function formatDate(ts) {
  if (!ts) return "-";
  const date = new Date(ts);
  return date.toLocaleString("id-ID", { dateStyle: 'medium', timeStyle: 'short' });
}
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  color: rgba(255,255,255,0.9);
  font-size: 1rem;
  transition: all 0.2s ease;
  font-weight: 500;
}
.sidebar-link:not(.active-sidebar):hover {
  background: rgba(255,255,255,0.05);
  transform: translateX(5px);
  color: #a5b4fc !important;
}
.active-sidebar {
  background: linear-gradient(to right,#fff,#e0e7ff,#f3e8ff);
  color: #3730a3 !important;
  font-weight: bold;
  border: 1.5px solid #c7d2fe;
  box-shadow: 0 6px 24px 0 rgba(99,102,241,0.16);
  z-index: 1;
}
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-size: 1.09rem;
  color: #fff;
  transition: all 0.2s;
  font-weight: 500;
}
.mobile-nav-link:not(.mobile-nav-active):hover {
  background: rgba(255,255,255,0.20);
  color: #e0e7ff !important;
  transform: translateX(5px);
}
.mobile-nav-active {
  background: rgba(255,255,255,0.30);
  color: #3730a3 !important;
  font-weight: bold;
  box-shadow: 0 2px 18px 0 rgba(99,102,241,0.12);
  font-size: 1.15rem;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.input {
  @apply w-full py-3 text-base rounded-2xl border-2 transition-all bg-white/80 shadow-sm focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500;
}
</style>