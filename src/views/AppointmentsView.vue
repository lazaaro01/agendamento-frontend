<template>
  <div class="appointments-view">
    <div class="glass-card mb-4 p-4 flex align-items-center justify-content-between">
      <div>
        <h2 class="m-0 title-gradient text-2xl">Gerenciar Agendamentos</h2>
        <p class="text-sm text-muted m-0">Visualize e organize sua agenda</p>
      </div>
      <Button
        label="Novo Agendamento"
        icon="pi pi-calendar-plus"
        class="p-button-raised shadow-lg"
        @click="openNewAppointment"
      />
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
              <Avatar
                icon="pi pi-user"
                size="small"
                shape="circle"
                class="bg-indigo-100 text-indigo-700"
              />
              <span class="font-medium text-white">
                {{ slotProps.data.user?.name || 'Cliente' }}
              </span>
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
              <span class="font-semibold">
                {{ formatDate(slotProps.data.start_time) }}
              </span>
              <span class="text-xs text-muted">
                {{ formatTime(slotProps.data.start_time) }}
              </span>
            </div>
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="statusSeverity(slotProps.data.status)"
              class="px-3"
            />
          </template>
        </Column>
        <Column header="Ações" class="text-right">
          <template #body="slotProps">
            <div class="flex justify-content-end gap-2">
              <Button
                icon="pi pi-trash"
                class="p-button-text p-button-danger p-button-sm"
                :disabled="slotProps.data.status === 'cancelled'"
                @click="cancelAppointment(slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      v-model:visible="showDialog"
      modal
      header="Novo Agendamento"
      :style="{ width: '450px' }"
      class="p-fluid glass-dialog"
    >
      <div class="field mb-4">
        <label class="block font-medium mb-2">Serviço</label>
        <Select
          v-model="newAppointment.service_id"
          :options="services"
          optionLabel="name"
          optionValue="ID"
          placeholder="Selecione um serviço"
          class="w-full"
        />
      </div>
      <div class="field mb-4">
        <label class="block font-medium mb-2">Data e Hora</label>
        <DatePicker
          v-model="newAppointment.start_time"
          showTime
          hourFormat="24"
          class="w-full"
        />
      </div>
      <template #footer>
        <div class="flex justify-content-end gap-2">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            class="p-button-text"
            @click="showDialog = false"
          />
          <Button
            label="Confirmar"
            icon="pi pi-check"
            :loading="saving"
            @click="saveAppointment"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
  start_time: null
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString('pt-BR')

const formatTime = (date) =>
  new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

const statusSeverity = (status) => {
  switch (status) {
    case 'confirmed':
      return 'success'
    case 'cancelled':
      return 'danger'
    default:
      return 'info'
  }
}
const openNewAppointment = async () => {
  await serviceStore.fetchServices()
  showDialog.value = true
}

const saveAppointment = async () => {
  if (!newAppointment.value.service_id || !newAppointment.value.start_time) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos',
      life: 3000
    })
    return
  }

  saving.value = true
  try {
    await appointmentStore.createAppointment({
      service_id: newAppointment.value.service_id,
      start_time: newAppointment.value.start_time.toISOString()
    })

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Agendamento criado',
      life: 3000
    })

    showDialog.value = false
    newAppointment.value = { service_id: null, start_time: null }
  } finally {
    saving.value = false
  }
}

const cancelAppointment = async (appointment) => {
  const id = appointment.ID

  if (!id) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'ID inválido',
      life: 3000
    })
    return
  }

  if (!confirm('Deseja cancelar este agendamento?')) return

  try {
    await appointmentStore.cancelAppointment(id)
    toast.add({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Agendamento cancelado',
      life: 3000
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao cancelar',
      life: 3000
    })
  }
}

onMounted(async () => {
  await appointmentStore.fetchAppointments()
  await serviceStore.fetchServices()
})
</script>

<style scoped>
:deep(.custom-table) {
  background: transparent;
}
</style>