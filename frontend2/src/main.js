import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


AOS.init()
createApp(App).use(router).use(Toast).mount('#app')
