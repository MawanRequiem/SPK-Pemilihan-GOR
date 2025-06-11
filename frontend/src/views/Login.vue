<template>
  <div class="min-h-screen bg-orange-50 grid lg:grid-cols-2">
    <!-- Kiri: banner atau deskripsi -->
    <div class="hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white p-12 h-full min-h-screen">
      <div data-aos="fade-right">
        <h1 class="text-4xl font-bold mb-4">Selamat Datang Kembali!</h1>
        <p class="text-lg">Silakan login untuk melanjutkan ke DSS GOR.</p>
      </div>
    </div>

    <!-- Kanan: form login -->
    <div class="flex items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 border border-orange-200" data-aos="fade-left">
        <h2 class="text-3xl font-bold mb-6 text-orange-700 text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-5">
          <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-3 border border-orange-300 rounded focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-3 border border-orange-300 rounded focus:ring-2 focus:ring-orange-400 focus:outline-none" required />
          <button type="submit" class="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 transition">Masuk</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('user', JSON.stringify(data))

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