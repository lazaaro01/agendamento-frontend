<template>
  <div class="appointments-view">
    <div class="glass-card mb-4 p-4 flex align-items-center justify-content-between">
      <div>
        <h2 class="m-0 title-gradient text-2xl">Gerenciar Agendamentos</h2>
        <p class="text-sm text-muted m-0">Visualize e organize sua agenda</p>
      </div>
      <Button label="Novo Agendamento" icon="pi pi-calendar-plus" class="p-button-raised shadow-lg" @click="openNewAppointment" />
    </div>

    <div class="glass-card overflow-hidden">
      <DataTable 
        :value="appointments" 
        responsiveLayout="scroll" 
        class="p-datatable-sm custom-table"
        :paginator="true" 
        :rows="10"
        :loading="loading"
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
              <span class="font-semibold">{{ new Date(slotProps.data.date).toLocaleDateString('pt-BR') }}</span>
              <span class="text-xs text-muted">{{ new Date(slotProps.data.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
          </template>
        </Column>
        
        <Column header="Status">
          <template #body>
            <Tag value="Confirmado" severity="success" class="px-3" />
          </template>
        </Column>
        
        <Column header="Ações" class="text-right">
          <template #body="slotProps">
            <div class="flex justify-content-end gap-2">
              <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" @click="cancelAppointment(slotProps.data.id)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDialog" modal header="Novo Agendamento" :style="{ width: '450px' }" class="p-fluid glass-dialog">
      <div class="field mb-4">
        <label for="service" class="block font-medium mb-2">Serviço</label>
        <Select 
          id="service" 
          v-model="newAppointment.service_id" 
          :options="services" 
          optionLabel="name" 
          optionValue="ID" 
          placeholder="Selecione um serviço" 
          class="w-full"
          appendTo="body"
        />
      </div>
      <div class="field mb-4">
        <label for="date" class="block font-medium mb-2">Data e Hora</label>
        <DatePicker 
          id="date" 
          v-model="newAppointment.date" 
          showTime 
          hourFormat="24" 
          placeholder="Selecione a data e hora"
          class="w-full"
          appendTo="body"
        />
      </div>
      <template #footer>
        <div class="flex gap-2 justify-content-end mt-4">
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
          <Button label="Confirmar" icon="pi pi-check" :loading="saving" @click="saveAppointment" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useAppointmentStore } from '../stores/appointment.store'
import { useServiceStore } from '../stores/service.store'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'

const appointmentStore = useAppointmentStore()
const serviceStore = useServiceStore()
const toast = useToast()

const appointments = computed(() => appointmentStore.appointments)
const services = computed(() => serviceStore.services)
const loading = computed(() => appointmentStore.loading)

const showDialog = ref(false)
const saving = ref(false)
const newAppointment = ref({
  service_id: null,
  date: null
})

const openNewAppointment = async () => {
  try {
    await serviceStore.fetchServices()
    console.log('Services loaded:', services.value)
    showDialog.value = true
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar serviços', life: 3000 })
    console.error('Failed to fetch services:', error)
  }
}

const saveAppointment = async () => {
  if (!newAppointment.value.service_id) {
    toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione um serviço', life: 3000 })
    return
  }
  if (!newAppointment.value.date) {
    toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione uma data e hora', life: 3000 })
    return
  }

  saving.value = true
  try {
    const appointmentData = {
      service_id: newAppointment.value.service_id,
      date: newAppointment.value.date.toISOString()
    }
    await appointmentStore.createAppointment(appointmentData)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Agendamento realizado com sucesso!', life: 3000 })
    showDialog.value = false
    newAppointment.value = { service_id: null, date: null }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao realizar agendamento', life: 3000 })
    console.error('Failed to save appointment:', error)
  } finally {
    saving.value = false
  }
}

const cancelAppointment = async (id) => {
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    try {
      await appointmentStore.cancelAppointment(id)
      toast.add({ severity: 'info', summary: 'Cancelado', detail: 'Agendamento cancelado com sucesso', life: 3000 })
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao cancelar agendamento', life: 3000 })
      console.error('Failed to cancel appointment:', error)
    }
  }
}

onMounted(async () => {
  try {
    await appointmentStore.fetchAppointments()
    await serviceStore.fetchServices()
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar dados', life: 3000 })
    console.error('Failed to load data:', error)
  }
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
