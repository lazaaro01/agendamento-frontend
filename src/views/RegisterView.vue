<template>
  <div class="register-view flex align-items-center justify-content-center min-h-screen p-3">
    <div class="register-card p-4 sm:p-6 glass-card" style="width: 100%; max-width: 450px;">
      <div class="text-center mb-5">
        <div class="bg-primary-reverse border-circle w-4rem h-4rem flex align-items-center justify-center mx-auto mb-3 shadow-lg">
          <i class="pi pi-user-plus text-3xl text-primary ml-3"></i>
        </div>
        <h2 class="title-gradient text-3xl mb-2">Crie sua conta</h2>
        <p class="text-muted">Comece a organizar seus atendimentos hoje mesmo</p>
      </div>

      <form @submit.prevent="handleRegister" class="flex flex-column">
        <BaseInput
          id="name"
          label="Nome Completo"
          v-model="name"
          placeholder="Como quer ser chamado?"
        />

        <BaseInput
          id="email"
          label="E-mail"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
        />

        <BaseInput
          id="password"
          label="Senha"
          v-model="password"
          type="password"
          placeholder="No mínimo 6 caracteres"
        />

        <BaseButton
          type="submit"
          :loading="loading"
          class="mt-3"
        >
          Cadastrar agora
        </BaseButton>
      </form>

      <div class="mt-4 text-center">
        <p class="text-muted text-sm">
          Já possui uma conta?
          <RouterLink to="/login" class="text-primary font-bold no-underline hover:underline">
            Fazer login
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
import BaseInput from '../components/ui/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleRegister() {
  try {
    loading.value = true
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-view {
  background: 
    radial-gradient(circle at 90% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 10% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 40%);
}
</style>