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

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: DashboardAdmin},
  { path: '/dashboard', component: DashboardUser},
  { path: '/admin/tambah-gor', component: DashboardAdminTambahGor},
  { path: '/user/profil', component: DasboardUserProfile},
  { path: '/user/rekomendasi', component: DashboardUserRekomendasi},
  { path: '/user/riwayat', component: DashboardUserRiwayat}
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
