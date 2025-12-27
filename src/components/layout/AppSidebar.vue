<template>
  <aside class="sidebar glass-card flex flex-column p-3 gap-4">
    <div class="logo-container flex align-items-center gap-3 px-2">
      <div class="logo-icon bg-primary border-circle flex align-items-center justify-center p-2">
        <i class="pi pi-calendar text-white text-xl"></i>
      </div>
      <span class="text-xl font-bold title-gradient">AgendaPro</span>
    </div>

    <nav class="flex-1 flex flex-column gap-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="item.to"
        class="nav-item flex align-items-center gap-3 p-3 border-radius-lg transition-all"
        active-class="active shadow-md"
      >
        <i :class="[item.icon, 'text-lg nav-icon']"></i>
        <span class="font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="user-footer p-2 mt-auto border-top-1 border-white-alpha-10 pt-4 flex align-items-center gap-3">
      <Avatar icon="pi pi-user" shape="circle" class="bg-primary text-white" />
      <div class="flex-1 min-w-0">
        <p class="m-0 font-semibold text-sm truncate">Usuário Teste</p>
        <p class="m-0 text-xs text-muted">user@example.com</p>
      </div>
      <Button 
        icon="pi pi-sign-out" 
        class="p-button-text p-button-secondary p-button-sm"
        @click="logout"
      />
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

const router = useRouter()

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'pi pi-chart-bar' },
  { label: 'Serviços', to: '/services', icon: 'pi pi-briefcase' },
  { label: 'Agendamentos', to: '/appointments', icon: 'pi pi-calendar' },
]

function logout() {
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: calc(100vh - 2rem);
  position: sticky;
  top: 1rem;
  z-index: 100;
}

.nav-item {
  color: var(--text-muted);
  text-decoration: none;
  border-radius: 0.75rem;
}

.nav-item:hover {
  background: var(--glass-bg);
  color: white;
}

.nav-item.active {
  background: var(--primary);
  color: white;
}

.nav-item.active .nav-icon {
  color: white;
}

.logo-icon {
  width: 40px;
  height: 40px;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>