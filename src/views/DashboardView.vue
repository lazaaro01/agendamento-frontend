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
            <div v-for="i in 3" :key="i" class="appointment-item p-3 border-radius-lg flex align-items-center gap-3">
              <Avatar icon="pi pi-user" shape="circle" size="large" />
              <div class="flex-1">
                <p class="m-0 font-bold">Cliente {{ i }}</p>
                <p class="m-0 text-xs text-muted">Corte de Cabelo + Barba</p>
              </div>
              <div class="text-right">
                <p class="m-0 font-semibold">14:00</p>
                <p class="m-0 text-xs text-muted">Hoje</p>
              </div>
              <Badge value="Confirmado" severity="success" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 lg:col-4 mt-4">
        <div class="glass-card p-4">
          <h3 class="m-0 title-gradient mb-4">Ações Rápidas</h3>
          <div class="flex flex-column gap-2">
            <Button label="Novo Agendamento" icon="pi pi-plus" class="w-full" />
            <Button label="Adicionar Serviço" icon="pi pi-tag" class="w-full p-button-outlined" />
            <Button label="Configurações" icon="pi pi-cog" class="w-full p-button-text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const stats = [
  { label: 'Hoje', value: '12', icon: 'pi pi-calendar', colorClass: 'bg-primary-alpha' },
  { label: 'Serviços', value: '8', icon: 'pi pi-briefcase', colorClass: 'bg-indigo-500-alpha' },
  { label: 'Ganhos', value: 'R$ 450', icon: 'pi pi-money-bill', colorClass: 'bg-green-500-alpha' },
  { label: 'Clientes', value: '124', icon: 'pi pi-users', colorClass: 'bg-purple-500-alpha' },
]
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