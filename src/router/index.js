import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import ServicesView from '../views/ServicesView.vue'



// Placeholder for Services if needed, or I can just use a simple view for now
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/appointments', component: AppointmentsView },
  { path: '/services', component: ServicesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router