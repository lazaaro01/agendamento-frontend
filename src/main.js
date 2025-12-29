import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import BadgeDirective from 'primevue/badgedirective'
import { createPinia } from 'pinia'
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    }
  }
})

app.directive('badge', BadgeDirective)

app.mount('#app')