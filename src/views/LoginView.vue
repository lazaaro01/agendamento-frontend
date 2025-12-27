<template>
  <div class="login-view flex align-items-center justify-content-center min-h-screen p-3">
    <div class="login-card p-4 sm:p-6 glass-card" style="width: 100%; max-width: 450px;">
      <div class="text-center mb-5">
        <div class="bg-primary-reverse border-circle w-4rem h-4rem flex align-items-center justify-center mx-auto mb-3 shadow-lg">
          <i class="pi pi-lock text-3xl text-primary ml-3"></i>
        </div>
        <h2 class="title-gradient text-3xl mb-2">Seja bem-vindo</h2>
        <p class="text-muted">Faça login para gerenciar seus agendamentos</p>
      </div>

      <LoginForm :loading="loading" @submit="handleLogin" />

      <div class="mt-4 text-center">
        <p class="text-muted text-sm">
          Ainda não tem uma conta?
          <RouterLink to="/register" class="text-primary font-bold no-underline hover:underline">
            Cadastre-se Gratuitamente
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import LoginForm from '../components/auth/LoginForm.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

async function handleLogin(credentials) {
  try {
    loading.value = true
    await authStore.login(credentials)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-view {
  background: 
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 40%);
}
</style>