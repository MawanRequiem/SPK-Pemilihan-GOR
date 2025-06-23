<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-main-gradient relative overflow-hidden px-4">
    <!-- OUTER POPPED-OUT GLASS BORDER -->
    <div
      class="absolute z-10 flex items-center justify-center w-full h-full pointer-events-none"
      style="left:0;top:0;"
      aria-hidden="true"
    >
      <div
        class="backdrop-blur-2xl"
        style="
          width: 90vw;
          max-width: 1450px;
          height: 73vw;
          max-height: 776px;
          border-radius: 2.7rem;
          border: 2.8px solid rgba(255,255,255,0.7);
          box-shadow: 0 12px 54px 0 #6366f139, 0 6px 36px #fb923c26;
          background: rgba(255,255,255,0.14);
          margin: auto;
        "
      ></div>
    </div>
    <!-- BG Lapangan Badminton SVG : BESAR & FULL -->
    <div
      aria-hidden="true"
      class="absolute z-20 pointer-events-none"
      style="
        left:50%;top:50%;transform:translate(-50%,-50%);
        width:88vw;max-width:1410px;
        height:70vw;max-height:730px;"
    >
      <svg viewBox="0 0 800 480" fill="none" class="w-full h-full" style="opacity:0.59;">
        <rect x="60" y="40" width="680" height="400" rx="40" fill="#71d8bc"/>
        <rect x="399" y="40" width="2" height="400" rx="3" fill="#fff" />
        <rect x="60" y="239.5" width="680" height="1" fill="#fff" />
        <rect x="60" y="40" width="680" height="400" rx="40" stroke="#fff" stroke-width="10" />
        <rect x="170" y="40" width="460" height="400" rx="24" stroke="#fff" stroke-width="5" />
        <rect x="130" y="40" width="2" height="400" fill="#fff" />
        <rect x="668" y="40" width="2" height="400" fill="#fff" />
        <rect x="60" y="130" width="680" height="2" fill="#fff" />
        <rect x="60" y="350" width="680" height="2" fill="#fff" />
      </svg>
    </div>
    <!-- GLASS CARD CENTRE -->
    <div class="relative z-30 max-w-2xl w-full flex flex-col items-center justify-center
      bg-gradient-to-br from-indigo-50/95 via-fuchsia-50/90 to-orange-50/95
      rounded-3xl shadow-2xl backdrop-blur-2xl border border-indigo-100/70 p-8 md:p-12"
      data-aos="zoom-in"
    >
      <div class="mb-6 animate-bounce-slow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" class="h-16 w-16 mx-auto drop-shadow-xl">
          <ellipse cx="28" cy="44" rx="10" ry="7" fill="#fde68a" stroke="#fdba74" stroke-width="2" />
          <path d="M16 9 L28 44 L40 9" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>
          <path d="M20 11 L28 44 L36 11" stroke="#a5b4fc" stroke-width="2" />
          <ellipse cx="28" cy="7.2" rx="6" ry="3.5" fill="#fff" stroke="#fb923c" stroke-width="2" />
        </svg>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent mb-4 text-center drop-shadow"
        data-aos="fade-down"
      >
        DSS GOR Bulu Tangkis
      </h1>
      <p class="mb-8 text-gray-700/90 max-w-2xl text-center text-lg font-medium" data-aos="fade-up" data-aos-delay="200">
        Sistem pendukung keputusan cerdas untuk menemukan <span class="text-orange-700 font-bold">GOR bulutangkis terbaik</span> berdasarkan waktu main, lokasi, dan semua preferensi kamu!
      </p>
      <div class="flex flex-col md:flex-row md:space-x-7 space-y-4 md:space-y-0 justify-center items-center w-full" data-aos="zoom-in" data-aos-delay="400">
        <router-link
          to="/login"
          class="primary-btn"
        >
          Masuk Sekarang
        </router-link>
        <router-link
          to="/register"
          class="secondary-btn"
        >
          Daftar Gratis
        </router-link>
      </div>
      <p class="mt-10 text-center text-gray-400 text-xs">© 2024 DSS GOR Bulutangkis Indonesia</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
onMounted(() => { AOS.init() })
</script>

<style scoped>
.bg-main-gradient {
  background: linear-gradient(135deg,
    #818cf8 0%,    /* indigo-400 soft */
    #c7d2fe 20%,   /* indigo-200 */
    #f5d0fe 53%,   /* fuchsia-200 */
    #fdba74 100%   /* orange-200/300 */
  );
}
.primary-btn {
  @apply px-8 py-3 rounded-2xl font-bold text-lg text-white drop-shadow-xl 
    bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-orange-400
    hover:from-orange-400 hover:to-orange-500
    active:translate-y-[2px] active:shadow-none
    transition-all duration-150 border-2 border-pink-100/0 hover:border-orange-300;
  box-shadow: 0 10px 32px -8px #a78bfa44, 0 2px 6px #f472b6aa;
  outline: none;
}
.primary-btn:focus, .primary-btn:active {
  outline: 2px solid #fb923c;
  outline-offset: 2px;
  box-shadow: 0 8px 32px -8px #f5d0fe85;
}
.secondary-btn {
  @apply px-8 py-3 rounded-2xl font-bold text-lg text-orange-700 bg-white 
        hover:bg-orange-100 hover:text-orange-900 border-2 border-orange-200 shadow;
  box-shadow: 0 4px 18px -6px #fdba747b;
  transition: all 0.18s cubic-bezier(.4,2,.3,1);
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-14px);}
}
.animate-bounce-slow {
  animation: bounce-slow 2.7s infinite cubic-bezier(.83, 0, .17, 1);
}
</style>