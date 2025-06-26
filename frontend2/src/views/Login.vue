<template>
  <div class="min-h-screen w-full grid lg:grid-cols-2 bg-main-gradient relative overflow-hidden">
    <!-- KIRI: Banner dengan Ilustrasi dan Text -->
    <div
      class="hidden lg:flex items-center justify-center relative select-none"
      data-aos="fade-right" data-aos-duration="900"
    >
      <!-- Ornamen Glass Blur Border -->
      <div
        class="absolute z-10 flex items-center justify-center pointer-events-none"
        style="width: 91%; height: 89%; left: 4%; top: 5%;"
        aria-hidden="true"
      >
        <div
          class="backdrop-blur-2xl"
          style="
            width: 100%;
            height: 100%;
            border-radius: 2.7rem;
            border: 2.8px solid rgba(255,255,255,0.70);
            box-shadow: 0 12px 54px 0 #6366f139, 0 6px 36px #fb923c26;
            background: rgba(255,255,255,0.16);
          "
        ></div>
      </div>
      <!-- Ilustrasi SVG Badminton Court -->
      <div class="relative z-20 flex flex-col items-center justify-center p-10" data-aos="fade-down" data-aos-delay="250">
        <svg viewBox="0 0 320 200" fill="none" class="w-[340px] h-[220px]" style="opacity:0.9;">
          <!-- Lapangan + Shuttlecock (tidak berubah) -->
          <rect x="20" y="20" width="280" height="160" rx="22" fill="#71d8bc"/>
          <rect x="120" y="20" width="2" height="160" rx="2" fill="#fff"/>
          <rect x="198" y="20" width="2" height="160" rx="2" fill="#fff"/>
          <rect x="20" y="98" width="280" height="2" fill="#fff"/>
          <rect x="20" y="20" width="280" height="160" rx="22" stroke="#fff" stroke-width="6"/>
          <rect x="80" y="20" width="160" height="160" rx="14" stroke="#fff" stroke-width="2"/>
          <rect x="60" y="20" width="2" height="160" fill="#fff"/>
          <rect x="258" y="20" width="2" height="160" fill="#fff"/>
          <rect x="20" y="57" width="280" height="2" fill="#fff"/>
          <rect x="20" y="141" width="280" height="2" fill="#fff"/>
          <g>
            <ellipse cx="277" cy="54" rx="8" ry="4" fill="#fde68a" stroke="#fdba74" stroke-width="1"/>
            <path d="M273 44 L277 58 L281 44" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
            <path d="M275 46 L277 58 L279 46" stroke="#a5b4fc" stroke-width="1" />
            <ellipse cx="277" cy="42" rx="5" ry="2" fill="#fff" stroke="#fb923c" stroke-width="1"/>
          </g>
        </svg>
        <div class="mt-6 text-white drop-shadow-lg text-center">
          <h1 class="text-3xl font-extrabold bg-gradient-to-r from-indigo-200 via-fuchsia-100 to-orange-200 bg-clip-text text-transparent">
            Explore GOR Bulu Tangkis
          </h1>
          <p class="mt-2 text-lg font-medium text-orange-100">
            Temukan lapangan terbaik & jadwal favoritmu!
          </p>
        </div>
      </div>
    </div>

    <!-- KANAN: Form Login -->
    <div class="flex items-center justify-center p-6 sm:p-12" data-aos="zoom-in" data-aos-delay="400">
      <div class="w-full max-w-xl bg-gradient-to-br from-indigo-50/95 via-fuchsia-50/90 to-orange-50/95 shadow-2xl rounded-3xl p-8 md:p-12 backdrop-blur-2xl border border-indigo-100/70" data-aos="fade-up" data-aos-delay="650">
        <div class="mb-6 flex justify-center">
          <!-- Ikon Shuttlecock dari landing page -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 56" class="h-14 w-14 drop-shadow-xl" data-aos="fade" data-aos-delay="750">
            <ellipse cx="28" cy="44" rx="10" ry="7" fill="#fde68a" stroke="#fdba74" stroke-width="2" />
            <path d="M16 9 L28 44 L40 9" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>
            <path d="M20 11 L28 44 L36 11" stroke="#a5b4fc" stroke-width="2" />
            <ellipse cx="28" cy="7.2" rx="6" ry="3.5" fill="#fff" stroke="#fb923c" stroke-width="2" />
          </svg>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent drop-shadow">
          Login
        </h2>
        <form @submit.prevent="handleLogin" class="space-y-5 mt-8">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 border border-indigo-200 rounded-xl bg-white/80 text-gray-800 font-semibold focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            required
            data-aos="fade-right" data-aos-delay="950"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 border border-indigo-200 rounded-xl bg-white/80 text-gray-800 font-semibold focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
            required
            data-aos="fade-right" data-aos-delay="1050"
          />
          <button type="submit" class="primary-btn w-full" data-aos="zoom-in" data-aos-delay="1200">
            Masuk
          </button>
        </form>
        <p class="mt-8 text-sm text-center text-gray-500" data-aos="fade" data-aos-delay="1400">
          Belum punya akun?
          <router-link to="/register" class="text-orange-700 font-bold hover:underline ml-1">Daftar Gratis</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from '../axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

onMounted(() => { AOS.init() })
const handleLogin = async () => {
  try {
    const { data } = await axios.post('/api/login', {
      email: email.value,
      password: password.value
    }, { withCredentials: true }) // ⬅️ penting

    // Arahkan sesuai role
    if (data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  } catch (err) {
    alert('Login gagal: ' + err.response?.data?.error)
  }
}
</script>

<style scoped>
.bg-main-gradient {
  background: linear-gradient(135deg,
    #818cf8 0%,    /* indigo-400 soft */
    #c7d2fe 20%,
    #f5d0fe 53%,
    #fdba74 100%
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
</style>