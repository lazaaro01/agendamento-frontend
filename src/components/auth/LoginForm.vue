<template>
  <form @submit.prevent="handleSubmit" class="flex flex-column">
    <BaseInput
      id="email"
      label="Email"
      v-model="email"
      placeholder="seu@email.com"
      type="email"
    />

    <BaseInput
      id="password"
      label="Senha"
      v-model="password"
      type="password"
      placeholder="••••••••"
    />

    <BaseButton
      type="submit"
      :loading="loading"
      class="mt-3"
    >
      Entrar
    </BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseButton from '../ui/BaseButton.vue'

const email = ref('')
const password = ref('')

const props = defineProps({
  loading: Boolean
})

const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit', {
    email: email.value,
    password: password.value
  })
}
</script>
