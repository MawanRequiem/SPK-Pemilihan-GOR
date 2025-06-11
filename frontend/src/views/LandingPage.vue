<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-white px-4">
    <h1
      class="text-4xl md:text-5xl font-bold text-orange-800 mb-4 text-center"
      data-aos="fade-down"
    >
      Selamat Datang di DSS GOR Bulu Tangkis
    </h1>
    <p class="mb-8 text-gray-700 max-w-xl text-center" data-aos="fade-up" data-aos-delay="200">
      Sistem pendukung keputusan untuk memilih GOR terbaik berdasarkan waktu bermain dan preferensi kamu.
    </p>
    <div class="space-x-4" data-aos="zoom-in" data-aos-delay="400">
      <router-link
        to="/login"
        class="px-6 py-3 rounded text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition"
      >
        Masuk
      </router-link>
      <router-link
        to="/register"
        class="px-6 py-3 rounded border border-orange-500 text-orange-700 font-semibold hover:bg-orange-100 transition"
      >
        Daftar
      </router-link>
    </div>
  </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()
</script>
