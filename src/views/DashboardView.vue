<template>
  <div class="dashboard-view">
    <div class="grid">
      <!-- Stats Cards -->
      <div v-for="stat in stats" :key="stat.label" class="col-12 md:col-6 lg:col-3">
        <div class="glass-card p-4 flex align-items-center gap-4 hover-scale transition-all">
          <div :class="['stat-icon flex align-items-center justify-center border-radius-lg', stat.colorClass]">
            <i :class="[stat.icon, 'text-2xl']"></i>
          </div>
          <div class="flex flex-column">
            <span class="text-muted text-sm font-medium">{{ stat.label }}</span>
            <span class="text-2xl font-bold">{{ stat.value }}</span>
          </div>
        </div>
      </div>

      <div class="col-12 lg:col-8 mt-4">
        <div class="glass-card p-4 h-full">
          <div class="flex align-items-center justify-content-between mb-4">
            <h3 class="m-0 title-gradient">Próximos Agendamentos</h3>
            <Button label="Ver todos" class="p-button-text p-button-sm" />
          </div>
          
          <div class="flex flex-column gap-3">
            <div v-for="appointment in appointments" :key="appointment.id" class="appointment-item p-3 border-radius-lg flex align-items-center gap-3">
              <Avatar icon="pi pi-user" shape="circle" size="large" />
              <div class="flex-1">
                <p class="m-0 font-bold">{{ appointment.user?.name || 'Cliente' }}</p>
                <p class="m-0 text-xs text-muted">{{ appointment.service?.name || 'Serviço' }}</p>
              </div>
              <div class="text-right">
                <p class="m-0 font-semibold">{{ new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
                <p class="m-0 text-xs text-muted">{{ new Date(appointment.date).toLocaleDateString() }}</p>
              </div>
              <Badge value="Confirmado" severity="success" />
            </div>
            
            <div v-if="appointments.length === 0" class="text-center p-4 text-muted">
              Nenhum agendamento para hoje.
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 lg:col-4 mt-4">
        <div class="glass-card p-4">
          <h3 class="m-0 title-gradient mb-4">Ações Rápidas</h3>
          <div class="flex flex-column gap-2">
            <Button label="Novo Agendamento" icon="pi pi-plus" class="w-full" @click="router.push('/appointments')" />
            <Button label="Adicionar Serviço" icon="pi pi-tag" class="w-full p-button-outlined" @click="router.push('/services')" />
            <Button label="Configurações" icon="pi pi-cog" class="w-full p-button-text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useServiceStore } from '../stores/service.store'
import { useAppointmentStore } from '../stores/appointment.store'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const serviceStore = useServiceStore()
const appointmentStore = useAppointmentStore()
const router = useRouter()

const appointments = computed(() => appointmentStore.appointments.slice(0, 3))

const stats = computed(() => [
  { label: 'Hoje', value: appointmentStore.appointments.length, icon: 'pi pi-calendar ml-3', colorClass: 'bg-primary-alpha' },
  { label: 'Serviços', value: serviceStore.services.length, icon: 'pi pi-briefcase ml-3', colorClass: 'bg-indigo-500-alpha' },
  { label: 'Ganhos', value: 'R$ 0', icon: 'pi pi-money-bill ml-3', colorClass: 'bg-green-500-alpha' },
  { label: 'Clientes', value: '0', icon: 'pi pi-users ml-3', colorClass: 'bg-purple-500-alpha' },
])

onMounted(async () => {
  await Promise.all([
    serviceStore.fetchServices(),
    appointmentStore.fetchAppointments()
  ])
})
</script>

<style scoped>
.stat-icon {
  width: 56px;
  height: 56px;
}

.bg-primary-alpha { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
.bg-indigo-500-alpha { background: rgba(79, 70, 229, 0.1); color: #818cf8; }
.bg-green-500-alpha { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
.bg-purple-500-alpha { background: rgba(168, 85, 247, 0.1); color: #c084fc; }

.hover-scale:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.appointment-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

.appointment-item:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>