import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

// PrimeVue Theme
import Aura from '@primevue/themes/aura'

// Styles
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark', // Force dark mode or use system
    }
  }
})

app.mount('#app')