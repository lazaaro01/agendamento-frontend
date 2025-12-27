<template>
  <div :class="{ 'my-app-dark': true }">
    <template v-if="isAuthPage">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>

    <template v-else>
      <div class="layout-wrapper flex p-3 gap-4 min-h-screen">
        <AppSidebar />
        
        <main class="flex-1 flex flex-column">
          <AppHeader />
          
          <div class="content-area flex-1">
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'

const route = useRoute()
const authStore = useAuthStore()

const isAuthPage = computed(() => {
  return ['/login', '/register', '/'].includes(route.path)
})

onMounted(() => {
  authStore.fetchProfile()
})
</script>

<style>
  
.layout-wrapper {
  max-width: 1600px;
  margin: 0 auto;
}

.content-area {
  padding-bottom: 2rem;
}
</style>