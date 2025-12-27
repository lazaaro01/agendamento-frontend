<template>
  <div class="flex flex-column gap-2 mb-3">
    <label v-if="label" :for="id" class="text-sm font-medium text-muted ml-1">
      {{ label }}
    </label>
    
    <Password 
      v-if="type === 'password'"
      :id="id"
      v-model="model"
      :toggleMask="toggleMask"
      :feedback="feedback"
      :placeholder="placeholder"
      class="w-full"
      inputClass="w-full"
    />
    
    <InputText
      v-else
      :id="id"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="w-full"
    />
    
    <small v-if="error" class="text-red-400 ml-1">{{ error }}</small>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

const model = defineModel()

defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  id: String,
  error: String,
  toggleMask: {
    type: Boolean,
    default: true
  },
  feedback: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
:deep(.p-password) {
  display: flex !important;
}
</style>