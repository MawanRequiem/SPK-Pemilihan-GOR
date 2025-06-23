<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Mobile Navbar -->
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
      
      <!-- Mobile Menu -->
      <div v-show="isMobileMenuOpen" class="mt-6 space-y-3 animate-fade-in">
        <RouterLink to="/admin" class="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">📊</span>
          <span class="font-medium">Dashboard</span>
        </RouterLink>
        <RouterLink to="/admin/tambah-gor" class="flex items-center space-x-3 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">➕</span>
          <span class="font-medium">Tambah GOR</span>
        </RouterLink>
        <RouterLink to="/admin/riwayat" class="flex items-center space-x-3 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105" @click="closeMobileMenu">
          <span class="text-xl">📈</span>
          <span class="font-medium">Histori DSS</span>
        </RouterLink>
        <a href="#" @click.prevent="handleLogout" class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 transform hover:scale-105">
          <span class="text-xl">🚪</span>
          <span class="font-medium">Logout</span>
        </a>
      </div>
    </nav>

    <div class="flex">
      <!-- Desktop Sidebar -->
      <aside class="w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white p-6 hidden md:block min-h-screen shadow-2xl relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div class="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center space-x-4 mb-12">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span class="text-2xl">🏸</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Admin GOR</h2>
              <p class="text-blue-200 text-sm opacity-80">Management Panel</p>
            </div>
          </div>
          
          <nav class="space-y-3">
            <RouterLink to="/admin" class="flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 shadow-lg">
              <span class="text-xl">📊</span>
              <span class="font-semibold">Dashboard</span>
            </RouterLink>
            <RouterLink to="/admin/tambah-gor" class="flex items-center space-x-4 hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">➕</span>
              <span class="font-semibold">Tambah GOR</span>
            </RouterLink>
            <RouterLink to="/admin/riwayat" class="flex items-center space-x-4 hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">📈</span>
              <span class="font-semibold">Histori DSS</span>
            </RouterLink>
            <a href="#" @click.prevent="handleLogout" class="flex items-center space-x-4 px-4 py-3 rounded-2xl hover:bg-red-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span class="text-xl">🚪</span>
              <span class="font-semibold">Logout</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-8">
        <!-- Header -->
        <div class="mb-10">
          <div class="bg-gradient-to-r from-white to-blue-50 rounded-3xl p-8 shadow-lg border border-blue-100">
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Halo, {{ adminName }}! 👋
            </h1>
            <p class="text-gray-600 text-lg">Selamat datang di dashboard admin. Di sini kamu bisa mengelola data GOR dengan mudah dan efisien.</p>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          <div class="group bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="text-4xl">🏸</div>
                <div class="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
              <p class="text-orange-100 text-sm font-medium">Total GOR</p>
              <p class="text-4xl font-bold">{{ daftarGOR.length }}</p>
            </div>
          </div>
          
          <div class="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="text-4xl">👥</div>
                <div class="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <p class="text-blue-100 text-sm font-medium">Penggunaan DSS</p>
              <p class="text-4xl font-bold">{{ totalDSSUsage }}</p>
            </div>
          </div>
          
          <div class="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="text-4xl">👤</div>
                <div class="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
              </div>
              <p class="text-emerald-100 text-sm font-medium">Jumlah User</p>
              <p class="text-4xl font-bold">{{ totalUsers }}</p>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-10 border border-white/20">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span class="text-2xl">📊</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Grafik Penggunaan DSS</h3>
              <p class="text-gray-500">7 Hari Terakhir</p>
            </div>
          </div>
          <div class="w-full h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
            <canvas ref="chartCanvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- List GOR -->
        <div class="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div class="flex items-center space-x-3 mb-4 md:mb-0">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <span class="text-2xl">🏸</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Daftar GOR Terdaftar</h2>
                <p class="text-gray-500">Kelola semua GOR yang terdaftar</p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  placeholder="Cari GOR..."
                  class="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div v-if="loading" class="text-center py-16">
            <div class="inline-flex items-center space-x-3">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
              <span class="text-xl font-medium text-gray-600">Memuat data...</span>
            </div>
          </div>
          
          <div v-else-if="filteredGOR.length === 0" class="text-center py-16">
            <div class="text-8xl mb-6">🏸</div>
            <h3 class="text-2xl font-bold text-gray-600 mb-2">{{ searchQuery ? 'Tidak ada GOR yang ditemukan' : 'Belum ada GOR yang ditambahkan' }}</h3>
            <p class="text-gray-500">{{ searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan menambahkan GOR pertama Anda' }}</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="gor in filteredGOR"
              :key="gor.id_gor"
              class="group bg-gradient-to-br from-white to-orange-50 border-2 border-orange-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              <!-- Background Pattern -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-orange-200/20 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-xl font-bold text-orange-700 flex-1 group-hover:text-orange-800 transition-colors">{{ gor.nama_gor }}</h3>
                  <div class="flex gap-2 ml-3">
                    <button
                      @click="editGOR(gor)"
                      class="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                      title="Edit GOR"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteGOR(gor.id_gor)"
                      class="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                      title="Hapus GOR"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-2xl">
                    <div class="flex items-center space-x-2">
                      <span class="text-yellow-500 text-lg">⭐</span>
                      <span class="text-gray-700 font-medium">Rating</span>
                    </div>
                    <span class="font-bold text-yellow-600">{{ gor.rating }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                    <div class="flex items-center space-x-2">
                      <span class="text-green-500 text-lg">💰</span>
                      <span class="text-gray-700 font-medium">Harga</span>
                    </div>
                    <span class="font-bold text-green-600">Rp {{ formatRupiah(gor.harga_sewa) }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                    <div class="flex items-center space-x-2">
                      <span class="text-blue-500 text-lg">🏟️</span>
                      <span class="text-gray-700 font-medium">Lapangan</span>
                    </div>
                    <span class="font-bold text-blue-600">{{ gor.jumlah_lapangan }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                    <div class="flex items-center space-x-2">
                      <span class="text-purple-500 text-lg">🏸</span>
                      <span class="text-gray-700 font-medium">Jenis</span>
                    </div>
                    <span class="font-bold text-purple-600">{{ gor.jenis_lapangan || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Enhanced Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl border border-white/20 animate-scale-in">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl">✏️</span>
              </div>
              <div>
                <h3 class="text-2xl font-bold">Edit GOR</h3>
                <p class="text-indigo-100">Perbarui informasi GOR</p>
              </div>
            </div>
            <button @click="closeEditModal" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="updateGOR" class="p-8 space-y-8">
          <!-- Basic Information -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
            <h4 class="text-xl font-bold text-indigo-700 mb-6 flex items-center">
              <div class="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              Informasi Dasar
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Nama GOR</span>
                </label>
                <input
                  v-model="editForm.nama_gor"
                  type="text"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Rating</span>
                </label>
                <input
                  v-model.number="editForm.rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Harga Sewa</span>
                </label>
                <input
                  v-model.number="editForm.harga_sewa"
                  type="number"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Jumlah Lapangan</span>
                </label>
                <input
                  v-model.number="editForm.jumlah_lapangan"
                  type="number"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Jenis Lapangan</span>
                </label>
                <select v-model="editForm.jenis_lapangan_id" class="select select-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80" required>
                  <option disabled value="">Pilih Jenis Lapangan</option>
                  <option v-for="jenis in jenisLapanganList" :value="jenis.id" :key="jenis.id">
                    {{ jenis.nama }}
                  </option>
                </select>
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Kota</span>
                </label>
                <input
                  v-model="editForm.kota"
                  type="text"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
              
              <div class="form-control md:col-span-2">
                <label class="label">
                  <span class="label-text font-semibold text-gray-700">Provinsi</span>
                </label>
                <input
                  v-model="editForm.provinsi"
                  type="text"
                  required
                  class="input input-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80"
                />
              </div>
            </div>

            <div class="form-control mt-6">
              <label class="label">
                <span class="label-text font-semibold text-gray-700">Alamat Lengkap</span>
              </label>
              <textarea
                v-model="editForm.alamat"
                class="textarea textarea-bordered rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80 h-24"
                required
              ></textarea>
            </div>
          </div>

          <!-- Location Section -->
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
            <h4 class="text-xl font-bold text-emerald-700 mb-6 flex items-center">
              <div class="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              Pilih Lokasi GOR
            </h4>
            
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold text-gray-700">Cari Lokasi</span>
              </label>
              <div class="flex gap-3">
                <div class="relative flex-1">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari alamat GOR..."
                    class="input input-bordered rounded-2xl border-2 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-white/80 pl-12 w-full"
                  />
                  <svg class="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <button type="button" @click="searchLocation" class="btn bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-2xl px-6 transition-all duration-300 hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                  Cari
                </button>
              </div>
            </div>
            
            <div v-if="searchResults.length > 0" class="mb-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-emerald-200 shadow-lg max-h-48 overflow-y-auto">
              <ul>
                <li 
                  v-for="(result, index) in searchResults" 
                  :key="index" 
                  @click="selectLocation(result)"
                  class="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-emerald-100 last:border-none text-sm flex items-start transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-1 mr-3 text-emerald-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ result.formatted_address }}</span>
                </li>
              </ul>
            </div>
            
            <div class="relative">
              <div id="mapEdit" class="w-full h-80 rounded-2xl border-4 border-emerald-200 shadow-lg overflow-hidden"></div>
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg text-sm flex items-center border border-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-gray-700">
                  Lat: {{ editForm.latitude?.toFixed(5) || '0.00000' }}, 
                  Lng: {{ editForm.longitude?.toFixed(5) || '0.00000' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Facilities Section -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
            <h4 class="text-xl font-bold text-purple-700 mb-6 flex items-center">
              <div class="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
              </div>
              Fasilitas GOR
            </h4>
            
            <div v-for="(items, kategori) in checklistItems" :key="kategori" class="mb-6 last:mb-0">
              <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                <h5 class="text-lg font-bold text-purple-600 capitalize mb-4 flex items-center">
                  <div class="w-6 h-6 bg-purple-400 rounded-lg flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  {{ kategori.split('_').join(' ') }}
                </h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="item in items" :key="item" class="form-control">
                    <label class="label cursor-pointer justify-start gap-4 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 group">
                      <input 
                        type="checkbox" 
                        :checked="editForm.checklist[kategori].includes(item)"
                        @change="toggleChecklistItem(kategori, item)"
                        class="checkbox checkbox-primary rounded-lg border-2 group-hover:scale-110 transition-transform duration-200" 
                      />
                      <span class="label-text font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{{ item }}</span>
                    </label>
                  </div>
                </div>
                <div class="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl flex items-center justify-between border border-purple-200">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <span class="font-semibold text-purple-700">
                      Skor: {{ hitungSkor(editForm.checklist[kategori].length, items.length) }}
                    </span>
                  </div>
                  <div class="text-sm text-purple-600 font-medium">
                    {{ editForm.checklist[kategori].length }}/{{ items.length }} fasilitas
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-6">
            <button
              type="submit"
              :disabled="updateLoading"
              class="btn flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-2xl h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              :class="{'loading': updateLoading}"
            >
              <svg v-if="!updateLoading" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ updateLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="btn flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white border-0 rounded-2xl h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { useToast } from 'vue-toastification';

// // Ketika modal edit dibuka, inisialisasi peta
// watch(showEditModal, (newVal) => {
//   if (newVal) {
//     nextTick(() => {
//       initMapEdit();
//     });
//   }
// });

// Tambahkan fungsi hitungSkor di frontend
const hitungSkor = (jumlah, max) => {
  if (jumlah <= 2) return 0;
  if (jumlah <= 5) return 1;
  if (jumlah <= 7) return 2;
  return 3;
};

// Ambil data admin dari localStorage
const user = JSON.parse(localStorage.getItem('user') || '{}')
const adminName = user.nama_lengkap || 'Admin'

const daftarGOR = ref([])
const loading = ref(true)
const router = useRouter()
const isMobileMenuOpen = ref(false)
const totalUsers = ref(0)
const toast = useToast();

// State untuk pemetaan
const searchQuery = ref('');
const searchResults = ref([]);
let mapEdit = null;
let markerEdit = null;
let geocoder = null;




const jenisLapanganList = ref([
  { id: 'd852fac2-a743-4114-a428-7067091645e4', nama: 'Karpet Vinyl' },
  { id: '7bc42c09-c25a-4dea-a128-9c726852f049', nama: 'Vinyl' },
  { id: 'a548de65-0fe5-44f8-94d6-6f814cc13b6e', nama: 'Interlock' },
  { id: '5cea6755-b1ef-4777-9a68-f961927c7e55', nama: 'Premium Synthetic Rubber' },
  { id: 'a6b4dac0-815e-4b2f-ab8e-ffad066f8da0', nama: 'Lantai' }
]);

const checklistItems = {
  parkir: [
    '≥ 10 mobil / ≥ 20 motor',
    'Area motor terpisah',
    'Permukaan rata tidak berlubang',
    'Penjaga parkir',
    'Ada kanopi',
    'Tempat sampah',
    'CCTV',
    'Akses keluar-masuk mudah'
  ],
  kamar_mandi: [
    'Air panas tersedia',
    'Air dingin tersedia',
    'Shower terpisah',
    '≥ 2 toilet/shower',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Tidak berbau/wangi',
    'Sabun/hand sanitizer tersedia',
    'Tempat sampah',
    'Pintu/kunci aman'
  ],
  kamar_ganti: [
    'Luas ≥ 2 m²',
    '≥ 2 loker',
    'Cermin & wastafel',
    'Kursi/bangku tersedia',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Pencahayaan cukup',
    'Sabun/hand sanitizer tersedia',
    'Tempat sampah tertutup',
    'Pintu/loker aman'
  ],
  kantin: [
    '≥ 2 gerai makanan/minuman',
    'Variasi menu ≥ 5 jenis',
    'Meja & kursi memadai',
    'Permukaan bersih',
    'Ventilasi/exhaust fan',
    'Pencahayaan cukup',
    'Tisu tersedia',
    'Tempat sampah',
    'WiFi atau stopkontak',
    'Pengawasan staff'
  ]
};

// Edit Modal
const showEditModal = ref(false)
// Di dalam editForm, tambahkan alamat, latitude, longitude
const editForm = ref({
  nama_gor: '',
  rating: 0,
  harga_sewa: 0,
  jumlah_lapangan: 0,
  jenis_lapangan_id: '',
  alamat: '',
  latitude: 0,
  longitude: 0,
  kota: '',
  provinsi: '',
  checklist: {
    parkir: [],
    kamar_mandi: [],
    kamar_ganti: [],
    kantin: []
  }
});
const updateLoading = ref(false)

// Chart
const chartCanvas = ref(null)
const chartInstance = ref(null)
const totalDSSUsage = ref(0)

// Computed
const filteredGOR = computed(() => {
  if (!searchQuery.value) return daftarGOR.value
  return daftarGOR.value.filter(gor => 
    gor.nama_gor.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID')
}

const fetchGOR = async () => {
  try {
    const res = await axios.get('/api/admin/gor')
    daftarGOR.value = res.data || []
  } catch (err) {
    console.error('Gagal memuat GOR:', err)
  } finally {
    loading.value = false
  }
}

const fetchTotalUsers = async () => {
  try {
    const res = await axios.get('/api/admin/total-users')
    totalUsers.value = res.data.total || 0
  } catch (err) {
    console.error('Gagal memuat jumlah user:', err)
  }
}

const initMapEdit = () => {
  // Pastikan elemen peta ada
  const mapElement = document.getElementById('mapEdit');
  if (!mapElement) return;
  
  // Hapus peta lama jika ada
  if (mapEdit) {
    mapEdit = null;
    markerEdit = null;
  }

  // Inisialisasi peta
  const center = { 
    lat: editForm.value.latitude || -6.2, 
    lng: editForm.value.longitude || 106.816 
  };
  
  mapEdit = new google.maps.Map(mapElement, {
    center,
    zoom: 14,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  });

  geocoder = new google.maps.Geocoder();

  // Tambahkan marker
  markerEdit = new google.maps.Marker({
    map: mapEdit,
    position: center,
    draggable: true,
    title: "Lokasi GOR",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#f97316",
      fillOpacity: 1,
      strokeColor: "#fff",
      strokeWeight: 2
    }
  });

  // Event saat marker di-drag
  markerEdit.addListener('dragend', () => {
    const newPosition = markerEdit.getPosition();
    editForm.value.latitude = newPosition.lat();
    editForm.value.longitude = newPosition.lng();
    updateAddressFromCoordinates(newPosition.lat(), newPosition.lng());
  });

  // Event klik peta untuk memindahkan marker
  mapEdit.addListener('click', (event) => {
    markerEdit.setPosition(event.latLng);
    editForm.value.latitude = event.latLng.lat();
    editForm.value.longitude = event.latLng.lng();
    updateAddressFromCoordinates(event.latLng.lat(), event.latLng.lng());
  });
};

const searchLocation = () => {
  if (!searchQuery.value.trim()) return;

  geocoder.geocode({ address: searchQuery.value }, (results, status) => {
    if (status === 'OK') {
      searchResults.value = results;
    } else {
      toast.error('Pencarian gagal: ' + status);
      searchResults.value = [];
    }
  });
};

const selectLocation = (result) => {
  const location = result.geometry.location;
  editForm.value.latitude = location.lat();
  editForm.value.longitude = location.lng();
  editForm.value.alamat = result.formatted_address;
  
  // Pindahkan peta dan marker
  if (mapEdit) {
    mapEdit.setCenter(location);
    mapEdit.setZoom(16);
    markerEdit.setPosition(location);
  }
  
  searchResults.value = []; // Kosongkan hasil pencarian
};

const updateAddressFromCoordinates = (lat, lng) => {
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === 'OK' && results[0]) {
      editForm.value.alamat = results[0].formatted_address;
      
      // Ekstrak kota dan provinsi dari hasil geocoding
      const addressComponents = results[0].address_components;
      addressComponents.forEach(component => {
        if (component.types.includes('locality')) {
          editForm.value.kota = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          editForm.value.provinsi = component.long_name;
        }
      });
    }
  });
};

// Dalam fungsi editGOR, pastikan set koordinat dan alamat
const editGOR = (gor) => {
  editForm.value = {
    ...gor,
    // Inisialisasi checklist
    checklist: {
      parkir: gor.parkir_items || [],
      kamar_mandi: gor.km_mandi_items || [],
      kamar_ganti: gor.km_ganti_items || [],
      kantin: gor.kantin_items || []
    },
    jenis_lapangan_id: gor.jenis_lapangan_id || '',
    kota: gor.kota || '',
    provinsi: gor.provinsi || '',
    alamat: gor.alamat || '',
    latitude: gor.latitude || -6.2,
    longitude: gor.longitude || 106.816
  };
  
  showEditModal.value = true;
  
  // Tunggu modal terbuka lalu inisialisasi peta
  nextTick(() => {
    if (window.google && window.google.maps) {
      initMapEdit();
    } else {
      toast.error('Google Maps tidak tersedia. Silakan muat ulang halaman.');
    }
  });
};

// Toggle checklist item
const toggleChecklistItem = (kategori, item) => {
  const index = editForm.value.checklist[kategori].indexOf(item);
  if (index === -1) {
    editForm.value.checklist[kategori].push(item);
  } else {
    editForm.value.checklist[kategori].splice(index, 1);
  }
};

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    nama_gor: '',
    rating: 0,
    harga_sewa: 0,
    jumlah_lapangan: 0,
    parkir_score: 0,
    km_mandi_score: 0,
    km_ganti_score: 0,
    kantin_score: 0
  }
}

// Modifikasi updateGOR function untuk mengirim checklist
const updateGOR = async () => {
  updateLoading.value = true;
  try {
    const payload = {
      ...editForm.value,
      parkir_items: editForm.value.checklist.parkir,
      km_mandi_items: editForm.value.checklist.kamar_mandi,
      km_ganti_items: editForm.value.checklist.kamar_ganti,
      kantin_items: editForm.value.checklist.kantin
    };
    
    await axios.put(`/api/admin/gor/${editForm.value.id_gor}`, payload);
    
    // Update local data
    const index = daftarGOR.value.findIndex(gor => gor.id_gor === editForm.value.id_gor);
    if (index !== -1) {
      daftarGOR.value[index] = { 
        ...daftarGOR.value[index],
        ...editForm.value,
        parkir_items: editForm.value.checklist.parkir,
        km_mandi_items: editForm.value.checklist.kamar_mandi,
        km_ganti_items: editForm.value.checklist.kamar_ganti,
        kantin_items: editForm.value.checklist.kantin
      };
    }
    
    closeEditModal();
    toast.success('GOR berhasil diupdate!');
  } catch (err) {
    console.error('Gagal update GOR:', err);
    toast.error('Gagal update GOR: ' + (err.response?.data?.error || err.message));
  } finally {
    updateLoading.value = false;
  }
};

const deleteGOR = async (id) => {
  if (!confirm('Yakin ingin menghapus GOR ini?')) return
  
  try {
    await axios.delete(`/api/admin/gor/${id}`)
    daftarGOR.value = daftarGOR.value.filter(gor => gor.id_gor !== id)
    alert('GOR berhasil dihapus!')
  } catch (err) {
    console.error('Gagal hapus GOR:', err)
    alert('Gagal hapus GOR: ' + (err.response?.data?.error || err.message))
  }
}

const fetchDSSStats = async () => {
  try {
    const res = await axios.get('/api/admin/dss-stats')
    totalDSSUsage.value = res.data.total || 0
    drawChart(res.data.daily || [])
  } catch (err) {
    console.error('Gagal memuat stats DSS:', err)
    // Generate dummy data for demo
    totalDSSUsage.value = Math.floor(Math.random() * 100) + 50
    const dummyData = Array.from({length: 7}, (_, i) => ({
      date: new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
      count: Math.floor(Math.random() * 20) + 5
    }))
    drawChart(dummyData)
  }
}

const drawChart = (data) => {
  if (!chartCanvas.value) return
  
  // Destroy previous chart instance if exists
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  
  const ctx = chartCanvas.value.getContext('2d')
  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: 'Penggunaan DSS',
        data: data.map(d => d.count),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f97316',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 12,
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            precision: 0,
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: 'Jumlah Penggunaan',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: 'Tanggal',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  })
}

onMounted(() => {
  fetchGOR()
  fetchDSSStats()
  fetchTotalUsers()
})
</script>

<style scoped>
/* Animasi untuk card stats */
.stats-card {
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Efek untuk sidebar menu */
nav a {
  transition: all 0.2s ease;
}

nav a:hover {
  transform: translateX(5px);
}

/* Animasi untuk modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Animasi untuk konten modal */
.modal-content-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.1s;
}

.modal-content-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

/* Efek hover untuk hasil pencarian */
.search-result-item:hover {
  background-color: #ffedd5;
  transform: translateX(2px);
  transition: all 0.2s ease;
}

/* Custom scrollbar untuk hasil pencarian */
.search-results::-webkit-scrollbar {
  width: 6px;
}

.search-results::-webkit-scrollbar-track {
  background: #ffedd5;
}

.search-results::-webkit-scrollbar-thumb {
  background-color: #fb923c;
  border-radius: 10px;
}

/* Animasi untuk marker peta */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Style untuk tombol */
.btn-primary {
  background: linear-gradient(to right, #f97316, #fb923c);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #ea580c, #f97316);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(249, 115, 22, 0.3);
}

/* Style untuk input */
.input:focus {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.3);
  border-color: #f97316;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);
}

/* Hover effects */
.group:hover .group-hover\:scale-150 {
  transform: scale(1.5);
}

.group:hover .group-hover\:text-orange-800 {
  color: #9a3412;
}

.group:hover .group-hover\:text-purple-600 {
  color: #9333ea;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Glass morphism effect */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Button hover effects */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Input focus effects */
.input:focus, .textarea:focus, .select:focus {
  transform: translateY(-1px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Card hover effects */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>