import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DashboardAdmin from '../views/AdminDashboard.vue'
import DashboardUser from '../views/UserDashboard.vue'
import DashboardAdminTambahGor from '../views/AdminTambahGor.vue'
import DasboardUserProfile from '../views/UserProfile.vue'
import DashboardUserRekomendasi from '../views/UserRekomendasi.vue'
import DashboardUserRiwayat from '../views/UserHistory.vue'
import DashboardAdminRiwayat from '../views/AdminHistoryDSS.vue'
import axios from '../axios' // pastikan ini ada dan pakai withCredentials: true

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: DashboardAdmin },
  { path: '/dashboard', component: DashboardUser },
  { path: '/admin/tambah-gor', component: DashboardAdminTambahGor },
  { path: '/user/profil', component: DasboardUserProfile },
  { path: '/user/rekomendasi', component: DashboardUserRekomendasi },
  { path: '/user/riwayat', component: DashboardUserRiwayat },
  { path: '/admin/riwayat', component: DashboardAdminRiwayat }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Tambahkan proteksi route di sini
router.beforeEach(async (to, from, next) => {
  const adminRoutes = ['/admin', '/admin/tambah-gor', '/admin/riwayat']
  const userRoutes = ['/dashboard', '/user/profil', '/user/rekomendasi', '/user/riwayat']

  if ([...adminRoutes, ...userRoutes].includes(to.path)) {
    try {
      const res = await axios.get('/api/me', { withCredentials: true }) // res.data harus ada role
      const role = res.data.role

      // Jika route admin, tapi bukan admin
      if (adminRoutes.includes(to.path) && role !== 'admin') {
        return next('/login')
      }

      // Jika route user, tapi bukan user
      if (userRoutes.includes(to.path) && role !== 'user') {
        return next('/login')
      }

      // Lolos verifikasi role
      next()
    } catch (err) {
      // Token invalid atau belum login
      next('/login')
    }
  } else {
    // Public routes (/, /login, /register)
    next()
  }
})


export default router
