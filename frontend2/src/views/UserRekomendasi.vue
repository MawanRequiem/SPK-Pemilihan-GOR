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

  <div class="min-h-screen flex">
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
        <RouterLink to="/user/rekomendasi" class="group flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-orange-100/60 to-orange-200/60 font-semibold shadow-lg border border-orange-300/50 ">
          <span class="mr-3 text-lg">⭐</span>
          <span class="font-medium">Rekomendasi</span>
        </RouterLink>
        <RouterLink to="/user/riwayat" class="group flex items-center px-4 py-3 rounded-xl hover:bg-orange-100/50 transition-all duration-300 hover:scale-105">
          <span class="mr-3 text-lg group-hover:scale-110 transition-transform">📜</span>
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
    <main class="flex-1 md:ml-52 px-6 py-10 bg-gradient-to-br from-orange-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-orange-700 mb-2">🏸 Rekomendasi GOR Terbaik</h1>
          <p class="text-orange-600">Temukan lapangan badminton terbaik di sekitar Anda</p>
        </div>

        <!-- FILTER SECTION -->
        <div class="bg-gradient-to-br from-white to-orange-50/30 p-8 rounded-3xl border-2 border-orange-100 shadow-xl mb-8 backdrop-blur-sm">
          <h3 class="text-xl font-bold text-orange-700 mb-6 flex items-center">
            <span class="mr-3 text-2xl">🔍</span> Filter & Pencarian
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Filter Kota -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-orange-700 mb-3">📍 Kota</label>
              <div class="relative">
                <select v-model="filterKota" class="input-select-modern">
                  <option value="">🌍 Semua Kota</option>
                  <option v-for="kota in uniqueKota" :key="kota" :value="kota">{{ kota }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Filter Provinsi -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-orange-700 mb-3">🗺️ Provinsi</label>
              <div class="relative">
                <select v-model="filterProvinsi" class="input-select-modern">
                  <option value="">🏛️ Semua Provinsi</option>
                  <option v-for="provinsi in uniqueProvinsi" :key="provinsi" :value="provinsi">{{ provinsi }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Filter Jarak -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-orange-700 mb-3">📏 Jarak Maksimal</label>
              <div class="relative">
                <select v-model="jarakRange" class="input-select-modern">
                  <option value="">🚶 Semua Jarak</option>
                  <option value="1000">🏃 Dalam 1 KM</option>
                  <option value="3000">🚴 Dalam 3 KM</option>
                  <option value="5000">🚗 Dalam 5 KM</option>
                  <option value="10000">🛣️ Dalam 10 KM</option>
                  <option value="custom">✏️ Input Manual</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Custom Distance Input -->
            <div v-if="jarakRange === 'custom'" class="space-y-2">
              <label class="block text-sm font-semibold text-orange-700 mb-3">📐 Jarak (KM)</label>
              <div class="relative">
                <input v-model.number="customJarak" type="number" min="0" step="0.1" placeholder="Contoh: 2.5" class="input-modern pl-10" />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-orange-400 text-sm">📏</span>
                </div>
              </div>
            </div>

            <!-- Sorting Options -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-orange-700 mb-3">🔄 Urutkan</label>
              <div class="relative">
                <select v-model="sortBy" class="input-select-modern">
                  <option value="default">📍 Default</option>
                  <option value="jarak">📏 Jarak Terdekat</option>
                  <option value="harga">💰 Harga Terendah</option>
                  <option value="nama">📝 Nama A-Z</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- WAKTU MAIN SECTION -->
        <div class="bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-3xl border-2 border-blue-100 shadow-xl mb-8 backdrop-blur-sm">
          <h3 class="text-xl font-bold text-blue-700 mb-6 flex items-center">
            <span class="mr-3 text-2xl">⏰</span> Waktu Main
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-blue-700 mb-3">📅 Hari</label>
              <div class="relative">
                <select v-model="hari" class="input-select-modern-blue">
                  <option disabled value="">📆 Pilih Hari</option>
                  <option v-for="h in hariList" :key="h" :value="h">{{ h }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-blue-700 mb-3">🕐 Jam</label>
              <div class="relative">
                <select v-model="jam" class="input-select-modern-blue">
                  <option disabled value="">⏰ Pilih Jam</option>
                  <option v-for="j in jamList" :key="j.value" :value="j.value">{{ j.label }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- STATS -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div class="text-3xl font-bold">{{ sortedGors.length }}</div>
            <div class="text-sm opacity-90">GOR Tersedia</div>
          </div>
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div class="text-3xl font-bold">{{ selectedGors.length }}</div>
            <div class="text-sm opacity-90">GOR Dipilih</div>
          </div>
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div class="text-3xl font-bold">{{ uniqueKota.length }}</div>
            <div class="text-sm opacity-90">Kota</div>
          </div>
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div class="text-3xl font-bold">{{ hasil.length }}</div>
            <div class="text-sm opacity-90">Rekomendasi</div>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex flex-wrap gap-4 mb-8">
          <button @click="selectAll" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
            ✅ Pilih Semua
          </button>
          <button @click="deselectAll" class="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
            ❌ Batal Pilih
          </button>
          <button @click="hitungRekomendasi" :disabled="!canCalculate" class="px-10 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-bold">
            🎯 Hitung Rekomendasi
          </button>
        </div>

        <!-- DEBUG INFO (remove in production) -->
        <div v-if="debugMode" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 class="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
          <div class="text-yellow-700 text-sm space-y-1">
            <p>Selected GORs: {{ selectedGors.length }}</p>
            <p>User Profile: {{ userProfile.lokasi_lat }}, {{ userProfile.lokasi_lng }}</p>
            <p>Hari: {{ hari }}, Jam: {{ jam }}</p>
            <p>First GOR jarak_meter: {{ gorList[0]?.jarak_meter }}</p>
            <p>Sort By: {{ sortBy }}</p>
          </div>
        </div>

        <!-- GOR CARDS -->
        <div class="mb-8">
          <h3 class="text-2xl font-bold text-orange-700 mb-6 flex items-center">
            <span class="mr-3 text-3xl">🏟️</span> Pilih GOR ({{ sortedGors.length }} tersedia)
          </h3>
          
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600"></div>
            <p class="mt-4 text-gray-600 text-lg">Memuat data GOR...</p>
          </div>
          
          <div v-else-if="sortedGors.length === 0" class="text-center py-16 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 shadow-xl">
            <div class="text-8xl mb-6">🔍</div>
            <h3 class="text-2xl font-bold text-gray-700 mb-4">Tidak ada GOR ditemukan</h3>
            <p class="text-gray-500 text-lg">Coba ubah filter pencarian Anda</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="gor in sortedGors" :key="gor.id_gor" 
                 class="bg-white rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 cursor-pointer relative"
                 :class="{ 'ring-4 ring-orange-400 bg-gradient-to-br from-orange-50 to-white border-orange-300': selectedGors.includes(gor.id_gor) }"
                 @click="toggleSelect(gor.id_gor)">
              
              <!-- Selection Badge -->
              <div v-if="selectedGors.includes(gor.id_gor)" class="absolute top-4 right-4 z-10">
                <div class="bg-orange-500 text-white rounded-full p-2 shadow-lg">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <!-- Card Header -->
              <div class="p-6 pb-4">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center">
                    <input type="checkbox" :checked="selectedGors.includes(gor.id_gor)" 
                           class="w-6 h-6 text-orange-600 rounded-lg focus:ring-orange-500 transition-all duration-200" 
                           @click.stop="toggleSelect(gor.id_gor)" />
                    <h4 class="text-xl font-bold text-gray-800 ml-4 leading-snug">{{ gor.nama_gor }}</h4>
                  </div>
                </div>
                
                <!-- Distance Badge -->
                <div v-if="gor.jarak_km && gor.jarak_km !== '99.9'" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-semibold mb-3">
                  <span class="mr-2">📍</span>
                  {{ gor.jarak_km }} km
                </div>
                
                <!-- Location -->
                <div class="flex items-center text-gray-600 mb-3">
                  <span class="mr-3 text-lg">🏙️</span>
                  <span class="text-sm font-medium">{{ gor.kota }}, {{ gor.provinsi }}</span>
                </div>
                
                <!-- Address -->
                <div v-if="gor.alamat" class="flex items-start text-gray-600 mb-4">
                  <span class="mr-3 mt-0.5 text-lg">📍</span>
                  <span class="text-sm">{{ gor.alamat }}</span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="px-6 pb-6">
                <!-- Facilities -->
                <div v-if="gor.fasilitas" class="mb-4">
                  <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <span class="mr-2">🏸</span> Fasilitas:
                  </h5>
                  <p class="text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border">{{ gor.fasilitas }}</p>
                </div>

                <!-- Price -->
                <div v-if="gor.harga_per_jam" class="mb-4">
                  <div class="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl border border-green-200">
                    <span class="text-sm font-bold text-green-700 flex items-center">
                      <span class="mr-2">💰</span> Harga:
                    </span>
                    <span class="text-lg font-bold text-green-600">Rp {{ formatCurrency(gor.harga_per_jam) }}/jam</span>
                  </div>
                </div>

                <!-- Rating or Additional Info -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div class="flex items-center text-yellow-500">
                    <span class="mr-2 text-lg">⭐</span>
                    <span class="text-sm font-bold">{{ gor.rating || '4.5' }}</span>
                  </div>
                  <div class="text-xs text-gray-500 font-medium">
                    ID: {{ gor.id_gor }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div v-if="hasil.length" class="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl border-2 border-purple-100 shadow-2xl p-8">
        <h2 class="text-3xl font-bold text-purple-700 mb-8 flex items-center">
          <span class="mr-4 text-4xl">🏆</span> Hasil Rekomendasi
        </h2>
        
        <!-- Info tentang scoring -->
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <span class="text-blue-500 mr-3 text-2xl">ℹ️</span>
            <div>
              <h4 class="font-bold text-blue-800 mb-2 text-lg">Cara Membaca Skor:</h4>
              <p class="text-blue-700">
                Skor menunjukkan jarak ke solusi ideal. <strong>Semakin kecil skor = semakin baik</strong>. 
                Ranking 1 memiliki jarak terdekat ke kriteria ideal Anda.
              </p>
            </div>
          </div>
        </div>
  
        <div class="grid gap-6">
          <div v-for="(r, i) in hasil" :key="r.id" 
              class="flex items-center p-6 bg-gradient-to-r rounded-2xl shadow-lg border-l-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              :class="{
                'from-yellow-50 to-yellow-100 border-yellow-500': i === 0,
                'from-gray-50 to-gray-100 border-gray-400': i === 1,
                'from-orange-50 to-orange-100 border-orange-400': i === 2,
                'from-blue-50 to-blue-100 border-blue-300': i > 2
              }">
            
            <!-- Ranking Badge -->
            <div class="flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-white mr-6 shadow-lg"
                :class="{
                  'bg-gradient-to-r from-yellow-400 to-yellow-500': i === 0,
                  'bg-gradient-to-r from-gray-400 to-gray-500': i === 1,
                  'bg-gradient-to-r from-orange-400 to-orange-500': i === 2,
                  'bg-gradient-to-r from-blue-400 to-blue-500': i > 2
                }">
              {{ i + 1 }}
            </div>
            
            <!-- GOR Info -->
            <div class="flex-1">
              <h3 class="font-bold text-xl text-gray-800 mb-2">{{ r.nama }}</h3>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <span class="flex items-center bg-white px-3 py-1 rounded-full shadow">
                  <span class="mr-2">📊</span>
                  Skor: <strong class="ml-1 text-gray-800">{{ formatScore(r.distance) }}</strong>
                </span>
                <span class="flex items-center" v-if="i === 0">
                  <span class="mr-2">🎯</span>
                  <span class="text-green-600 font-bold">Terbaik</span>
                </span>
                <span class="flex items-center" v-else-if="i === 1">
                  <span class="mr-2">⭐</span>
                  <span class="text-gray-600 font-bold">Sangat Baik</span>
                </span>
                <span class="flex items-center" v-else-if="i === 2">
                  <span class="mr-2">✨</span>
                  <span class="text-orange-600 font-bold">Baik</span>
                </span>
              </div>
            </div>
            
            <!-- Medal/Icon -->
            <div class="flex items-center">
              <span v-if="i === 0" class="text-5xl">🥇</span>
              <span v-else-if="i === 1" class="text-5xl">🥈</span>
              <span v-else-if="i === 2" class="text-5xl">🥉</span>
              <span v-else class="text-4xl">🏸</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from '../axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const loading = ref(true)
const debugMode = ref(false)

const userId = ref(null)
const userProfile = ref({ lokasi_lat: null, lokasi_lng: null })
const sidebarOpen = ref(false)

const gorList = ref([])
const selectedGors = ref([])
const hasil = ref([])
const hari = ref('')
const jam = ref('')
const sortBy = ref('default')
const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const filterKota = ref('')
const filterProvinsi = ref('')
const jarakRange = ref('')
const customJarak = ref(null)

const jamList = computed(() =>
  Array.from({ length: 24 }, (_, i) => ({
    value: i + 1,
    label: `${String(i + 1).padStart(2, '0')}:00`
  }))
)

const uniqueKota = computed(() =>
  [...new Set(gorList.value.map(g => g.kota).filter(Boolean))].sort()
)
const uniqueProvinsi = computed(() =>
  [...new Set(gorList.value.map(g => g.provinsi).filter(Boolean))].sort()
)
const maxJarak = computed(() => {
  if (jarakRange.value === 'custom') {
    return customJarak.value ? customJarak.value * 1000 : null
  }
  return jarakRange.value ? parseInt(jarakRange.value) : null
})

const sortedGors = computed(() => {
  let filtered = gorList.value.filter(gor => {
    if (filterKota.value && gor.kota !== filterKota.value) return false
    if (filterProvinsi.value && gor.provinsi !== filterProvinsi.value) return false
    if (maxJarak.value && gor.jarak_meter > maxJarak.value) return false
    return true
  })

  switch (sortBy.value) {
    case 'jarak':
      return filtered.sort((a, b) => a.jarak_meter - b.jarak_meter)
    case 'harga':
      return filtered.sort((a, b) => a.harga_per_jam - b.harga_per_jam)
    case 'nama':
      return filtered.sort((a, b) => a.nama_gor.localeCompare(b.nama_gor))
    default:
      return filtered
  }
})

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/me', { withCredentials: true })
    userId.value = res.data.id
    userProfile.value = res.data
  } catch (err) {
    toast.error('Gagal mengambil data user, silakan login ulang')
    router.push('/login')
  }
}

const loadGOR = async () => {
  try {
    const res = await axios.get('/api/admin/gor')
    gorList.value = Array.isArray(res.data) ? res.data : res.data.data || []
    console.log('GOR API response:', res.data)
    await enrichJarak()
    loading.value = false
  } catch (error) {
    toast.error('Gagal mengambil data GOR')
  }
}

const enrichJarak = async () => {
  const { lokasi_lat: lat, lokasi_lng: lng } = userProfile.value
  if (!lat || !lng) {
    gorList.value.forEach(gor => {
      gor.jarak_meter = 0
      gor.jarak_km = '0.0'
    })
    return
  }

  for (const gor of gorList.value) {
    try {
      if (!gor.latitude || !gor.longitude) {
        gor.jarak_meter = 0
        gor.jarak_km = '0.0'
        continue
      }

      const r = await axios.get('/api/maps/distance', {
        params: {
          originLat: lat,
          originLng: lng,
          destLat: gor.latitude,
          destLng: gor.longitude
        }
      })

      const distance = r.data.distance || 0
      gor.jarak_meter = distance
      gor.jarak_km = (distance / 1000).toFixed(1)
    } catch {
      gor.jarak_meter = 0
      gor.jarak_km = '0.0'
    }
  }
}

const validateGorData = (gorData) => {
  return gorData.map(gor => ({
    ...gor,
    harga_per_jam: parseFloat(gor.harga_per_jam) || 0,
    jarak_meter: parseFloat(gor.jarak_meter) || 0,
    latitude: parseFloat(gor.latitude) || 0,
    longitude: parseFloat(gor.longitude) || 0,
    nama_gor: gor.nama_gor || 'Unknown GOR',
    kota: gor.kota || 'Unknown City',
    provinsi: gor.provinsi || 'Unknown Province'
  }))
}

const hitungRekomendasi = async () => {
  if (!hari.value || jam.value === null || jam.value === '') {
    toast.error('Isi hari dan jam main terlebih dahulu')
    return
  }

  const dataDipilih = gorList.value.filter(g => selectedGors.value.includes(g.id_gor))
  if (!dataDipilih.length) {
    toast.error('Pilih setidaknya satu GOR')
    return
  }

  const validatedData = validateGorData(dataDipilih)
  loading.value = true

  try {
    const r = await axios.post('/api/rekomendasi', {
      user_id: userId.value,
      metodeJarak: 'otomatis',
      waktuMain: { hari: hari.value, jam: parseInt(jam.value) },
      jarakManual: {},
      gorData: validatedData
    })

    if (r.data.rekomendasi && Array.isArray(r.data.rekomendasi)) {
      hasil.value = r.data.rekomendasi
      toast.success(`Rekomendasi berhasil dihitung! ${hasil.value.length} GOR ditemukan.`)

      setTimeout(() => {
        document.querySelector('.bg-white.rounded-2xl.border.shadow-lg.p-6')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    } else {
      throw new Error('Format response server tidak valid')
    }
  } catch (err) {
    toast.error(err.response?.data?.error || 'Gagal menghitung rekomendasi')
  } finally {
    loading.value = false
  }
}

const selectAll = () => {
  selectedGors.value = sortedGors.value.map(g => g.id_gor)
}
const deselectAll = () => {
  selectedGors.value = []
}
const toggleSelect = (gorId) => {
  const index = selectedGors.value.indexOf(gorId)
  if (index > -1) selectedGors.value.splice(index, 1)
  else selectedGors.value.push(gorId)
}
const formatCurrency = (amount) => new Intl.NumberFormat('id-ID').format(amount)
const formatScore = (score) => parseFloat(score).toFixed(4)

const canCalculate = computed(() => {
  return selectedGors.value.length > 0 && hari.value && jam.value
})

const handleLogout = async () => {
  try {
    await axios.post('/api/logout', null, { withCredentials: true })
    localStorage.removeItem('user') // kalau kamu nyimpan cache
    router.push('/login') // arahkan kembali ke halaman login
  } catch (err) {
    toast.error('Gagal logout')
  }
}


onMounted(async () => {
  await fetchUser()
  await loadGOR()
})
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

/* Modern Input Styles */
.input-modern {
  @apply w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md;
}

.input-select-modern {
  @apply w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm hover:shadow-md appearance-none cursor-pointer;
}

.input-select-modern-blue {
  @apply w-full px-4 py-3 rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm hover:shadow-md appearance-none cursor-pointer;
}

/* Custom Select Arrow Animation */
.input-select-modern:focus + .absolute svg,
.input-select-modern-blue:focus + .absolute svg {
  @apply rotate-180 transition-transform duration-200;
}

/* Hover effects for cards */
.gor-card {
  @apply transform transition-all duration-300 hover:scale-105 hover:shadow-2xl;
}

/* Smooth animations for stats cards */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-card {
  animation: slideUp 0.5s ease-out forwards;
}

/* Enhanced button styles */
.btn-modern {
  @apply px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl;
}

.btn-primary {
  @apply bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700;
}

.btn-secondary {
  @apply bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700;
}

.btn-success {
  @apply bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
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
  background: linear-gradient(45deg, #f59e0b, #d97706);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #d97706, #b45309);
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .grid-responsive {
    @apply grid-cols-1;
  }
  
  .text-responsive {
    @apply text-2xl;
  }
  
  .px-responsive {
    @apply px-4;
  }
}

/* Glassmorphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Enhanced focus states */
.input-modern:focus,
.input-select-modern:focus,
.input-select-modern-blue:focus {
  @apply transform scale-105;
}

/* Card animation on load */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-animate {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Enhanced selection state */
.selected-card {
  @apply ring-4 ring-orange-400 bg-gradient-to-br from-orange-50 to-white border-orange-300 shadow-2xl;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Improved checkbox styling */
input[type="checkbox"] {
  @apply w-5 h-5 text-orange-600 bg-white border-2 border-orange-300 rounded-lg focus:ring-orange-500 focus:ring-2 transition-all duration-200;
}

input[type="checkbox"]:checked {
  @apply bg-orange-600 border-orange-600;
}

/* Enhanced dropdown arrow */
.dropdown-arrow {
  transition: transform 0.2s ease-in-out;
}

.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

/* Improved number input */
input[type="number"] {
  @apply appearance-none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Enhanced gradient backgrounds */
.gradient-orange {
  background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
}

.gradient-blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.gradient-purple {
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
}

/* Improved shadow system */
.shadow-modern {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-modern-lg {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Enhanced hover states */
.hover-lift {
  @apply transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg;
}

/* Better spacing system */
.space-modern > * + * {
  margin-top: 1.5rem;
}

/* Enhanced border system */
.border-modern {
  @apply border-2 border-gray-200 hover:border-orange-300 transition-colors duration-300;
}

/* Improved text gradients */
.text-gradient {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced animation delays for staggered effects */
.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-400 { animation-delay: 0.4s; }

/* Improved backdrop blur */
.backdrop-blur-modern {
  backdrop-filter: blur(12px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.8);
}

/* Enhanced loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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