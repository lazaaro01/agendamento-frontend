<template>
  <div class="services-view">
    <div class="glass-card mb-4 p-4 flex align-items-center justify-content-between">
      <div>
        <h2 class="m-0 title-gradient text-2xl">Catálogo de Serviços</h2>
        <p class="text-sm text-muted m-0">Gerencie os serviços que você oferece</p>
      </div>
      <Button label="Novo Serviço" icon="pi pi-plus" class="p-button-raised shadow-lg" />
    </div>

    <div class="grid">
      <div v-for="service in services" :key="service.name" class="col-12 md:col-6 lg:col-4">
        <div class="glass-card p-4 hover-scale transition-all">
          <div class="flex justify-content-between align-items-start mb-3">
            <div class="service-icon bg-indigo-500-alpha border-radius-lg flex align-items-center justify-center">
              <i class="pi pi-tag text-2xl text-primary ml-2"></i>
            </div>
            <div class="text-right">
              <span class="text-xs text-muted block mb-1">Preço</span>
              <span class="text-xl font-bold text-white">
                {{ typeof service.price === 'number' ? `R$ ${service.price.toFixed(2).replace('.', ',')}` : service.price }}
              </span>
            </div>
          </div>
          
          <h3 class="m-0 mb-2 font-bold">{{ service.name }}</h3>
          <p class="text-muted text-sm line-height-3 mb-4">{{ service.description }}</p>
          
          <div class="flex align-items-center gap-2 mb-4">
            <i class="pi pi-clock text-xs text-muted"></i>
            <span class="text-xs text-muted">{{ service.duration }}</span>
          </div>

          <div class="flex gap-2">
            <Button icon="pi pi-pencil" label="Editar" class="flex-1 p-button-sm p-button-outlined" />
            <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useServiceStore } from '../stores/service.store'
import Button from 'primevue/button'

const serviceStore = useServiceStore()
const services = computed(() => serviceStore.services)
const loading = computed(() => serviceStore.loading)

onMounted(() => {
  serviceStore.fetchServices()
})
</script>

<style scoped>
.service-icon {
  width: 48px;
  height: 48px;
}

.bg-indigo-500-alpha {
  background: rgba(99, 102, 241, 0.1);
}

.hover-scale:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}
</style>