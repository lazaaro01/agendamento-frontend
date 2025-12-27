<template>
  <div class="appointments-view">
    <div class="glass-card mb-4 p-4 flex align-items-center justify-content-between">
      <div>
        <h2 class="m-0 title-gradient text-2xl">Gerenciar Agendamentos</h2>
        <p class="text-sm text-muted m-0">Visualize e organize sua agenda</p>
      </div>
      <Button label="Novo Agendamento" icon="pi pi-calendar-plus" class="p-button-raised shadow-lg" />
    </div>

    <div class="glass-card overflow-hidden">
      <DataTable 
        :value="appointments" 
        responsiveLayout="scroll" 
        class="p-datatable-sm custom-table"
        :paginator="true" 
        :rows="10"
      >
        <template #empty>
          <div class="text-center p-5">
            <i class="pi pi-calendar-times text-4xl text-muted mb-3"></i>
            <p class="text-muted">Nenhum agendamento encontrado.</p>
          </div>
        </template>
        
        <Column header="Cliente">
          <template #body="slotProps">
            <div class="flex align-items-center gap-2">
              <Avatar icon="pi pi-user" size="small" shape="circle" class="bg-indigo-100 text-indigo-700" />
              <span class="font-medium text-white">{{ slotProps.data.user?.name || 'Cliente' }}</span>
            </div>
          </template>
        </Column>
        
        <Column header="Serviço">
          <template #body="slotProps">
            {{ slotProps.data.service?.name || '-' }}
          </template>
        </Column>
        
        <Column header="Data">
          <template #body="slotProps">
            <div class="flex flex-column">
              <span class="font-semibold">{{ new Date(slotProps.data.date).toLocaleDateString() }}</span>
              <span class="text-xs text-muted">{{ new Date(slotProps.data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
          </template>
        </Column>
        
        <Column header="Status">
          <template #body>
            <Tag value="Confirmado" severity="success" class="px-3" />
          </template>
        </Column>
        
        <Column header="Ações" class="text-right">
          <template #body>
            <div class="flex justify-content-end gap-2">
              <Button icon="pi pi-pencil" class="p-button-text p-button-secondary p-button-sm" />
              <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAppointmentStore } from '../stores/appointment.store'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'

const appointmentStore = useAppointmentStore()
const appointments = computed(() => appointmentStore.appointments)
const loading = computed(() => appointmentStore.loading)

onMounted(() => {
  appointmentStore.fetchAppointments()
})
</script>

<style scoped>
:deep(.custom-table) {
  background: transparent;
}

:deep(.p-datatable-thead > tr > th) {
  background: rgba(255, 255, 255, 0.03) !important;
  color: var(--text-muted) !important;
  border-bottom: 1px solid var(--glass-border) !important;
  padding: 1.25rem 1rem !important;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  color: var(--text-color) !important;
  transition: background 0.2s;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(255, 255, 255, 0.02) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  border-bottom: 1px solid var(--glass-border) !important;
  padding: 1rem !important;
}

:deep(.p-paginator) {
  background: transparent !important;
  border: none !important;
  padding: 1rem !important;
}
</style>