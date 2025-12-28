<template>
  <div class="services-view">
    <div class="glass-card mb-4 p-4 flex align-items-center justify-content-between">
      <div>
        <h2 class="m-0 title-gradient text-2xl">Catálogo de Serviços</h2>
        <p class="text-sm text-muted m-0">Gerencie os serviços que você oferece</p>
      </div>
      <Button label="Novo Serviço" icon="pi pi-plus" class="p-button-raised shadow-lg" @click="showDialog = true" />
    </div>

    <div v-if="loading && services.length === 0" class="flex justify-content-center p-8">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <div v-else class="grid">
      <div v-for="service in services" :key="service.id || service.name" class="col-12 md:col-6 lg:col-4">
        <div class="glass-card p-4 hover-scale transition-all">
          <div class="flex justify-content-between align-items-start mb-3">
            <div class="service-icon bg-indigo-500-alpha border-radius-lg flex align-items-center justify-center">
              <i class="pi pi-tag text-2xl text-primary ml-2"></i>
            </div>
            <div class="text-right">
              <span class="text-xs text-muted block mb-1">Preço</span>
              <span class="text-xl font-bold text-white">
                R$ {{ service.price.toFixed(2).replace('.', ',') }}
              </span>
            </div>
          </div>
          
          <h3 class="m-0 mb-2 font-bold">{{ service.name }}</h3>
          <p class="text-muted text-sm line-height-3 mb-4">{{ service.description }}</p>
          
          <div class="flex align-items-center gap-2 mb-4">
            <i class="pi pi-clock text-xs text-muted"></i>
            <span class="text-xs text-muted">{{ service.duration }} min</span>
          </div>

          <div class="flex gap-2">
            <Button icon="pi pi-pencil" label="Editar" class="flex-1 p-button-sm p-button-outlined" />
            <Button icon="pi pi-trash" class="p-button-danger p-button-text p-button-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- Novo Serviço Dialog -->
    <Dialog v-model:visible="showDialog" modal header="Cadastrar Novo Serviço" :style="{ width: '450px' }" class="p-fluid glass-dialog">
      <div class="field mb-4">
        <label for="name" class="block font-medium mb-2">Nome do Serviço</label>
        <InputText id="name" v-model.trim="newService.name" required autofocus placeholder="Ex: Corte de Cabelo" />
      </div>
      <div class="field mb-4">
        <label for="description" class="block font-medium mb-2">Descrição</label>
        <Textarea id="description" v-model="newService.description" rows="3" placeholder="Descreva brevemente o serviço..." />
      </div>
      <div class="formgrid grid">
        <div class="field col mb-4">
          <label for="price" class="block font-medium mb-2">Preço (R$)</label>
          <InputNumber id="price" v-model="newService.price" mode="currency" currency="BRL" locale="pt-BR" />
        </div>
        <div class="field col mb-4">
          <label for="duration" class="block font-medium mb-2">Duração (min)</label>
          <InputNumber id="duration" v-model="newService.duration" suffix=" min" />
        </div>
      </div>
      <template #footer>
        <div class="flex gap-2 justify-content-end mt-4">
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
          <Button label="Salvar" icon="pi pi-check" :loading="saving" @click="saveService" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useServiceStore } from '../stores/service.store'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'

const serviceStore = useServiceStore()
const toast = useToast()
const services = computed(() => serviceStore.services)
const loading = computed(() => serviceStore.loading)

const showDialog = ref(false)
const saving = ref(false)
const newService = ref({
  name: '',
  description: '',
  price: 0,
  duration: 30
})

const saveService = async () => {
  if (!newService.value.name) {
    toast.add({ severity: 'warn', summary: 'Atenção', detail: 'O nome do serviço é obrigatório', life: 3000 })
    return
  }

  saving.value = true
  try {
    await serviceStore.createService({ ...newService.value })
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Serviço cadastrado com sucesso!', life: 3000 })
    showDialog.value = false
    newService.value = {
      name: '',
      description: '',
      price: 0,
      duration: 30
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao cadastrar serviço', life: 3000 })
    console.error('Failed to save service:', error)
  } finally {
    saving.value = false
  }
}

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

/* Glass dialog styling */
:deep(.p-dialog) {
  background: var(--bg-color) !important;
  border: 1px solid var(--glass-border) !important;
  box-shadow: var(--shadow-lg) !important;
  border-radius: 1.5rem !important;
  backdrop-filter: blur(20px) !important;
}

:deep(.p-dialog-header) {
  background: transparent !important;
  color: white !important;
  padding: 1.5rem !important;
  border-bottom: 1px solid var(--glass-border) !important;
}

:deep(.p-dialog-content) {
  background: transparent !important;
  color: white !important;
  padding: 1.5rem !important;
}

:deep(.p-dialog-footer) {
  background: transparent !important;
  padding: 1rem 1.5rem 1.5rem 1.5rem !important;
  border-top: 1px solid var(--glass-border) !important;
}

:deep(label) {
  color: var(--text-muted);
}
</style>
