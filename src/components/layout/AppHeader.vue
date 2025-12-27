<template>
  <header class="header flex align-items-center justify-content-between px-4 py-2 mb-4 glass-card">
    <div class="flex flex-column">
      <h1 class="text-xl font-bold m-0">{{ currentPageTitle }}</h1>
      <p class="text-sm text-muted m-0">{{ currentDate }}</p>
    </div>

    <div class="flex align-items-center gap-3">
      <span class="p-input-icon-left">
        <i class="pi pi-search text-muted" />
        <InputText placeholder="Buscar..." class="p-inputtext-sm" />
      </span>
      <Button icon="pi pi-bell" class="p-button-rounded p-button-text p-button-secondary shadow-none" v-badge="2" />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const route = useRoute()

const currentPageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/services': 'Meus Serviços',
    '/appointments': 'Agendamentos',
    '/register': 'Cadastro'
  }
  return titles[route.path] || 'Bem-vindo'
})

const currentDate = computed(() => {
  return new Intl.DateTimeFormat('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).format(new Date())
})
</script>

<style scoped>
.header {
  height: 70px;
}
</style>
