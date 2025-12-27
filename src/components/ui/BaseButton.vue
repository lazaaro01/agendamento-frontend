<template>
  <Button
    v-bind="$attrs"
    :class="['base-button', variantClass]"
    :loading="loading"
  >
    <slot />
  </Button>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // primary, secondary, danger, ghost
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const variantClass = computed(() => {
  const classes = {
    primary: 'p-button-primary',
    secondary: 'p-button-secondary p-button-outlined',
    danger: 'p-button-danger',
    ghost: 'p-button-text'
  }
  return classes[props.variant] || classes.primary
})
</script>

<style scoped>
.base-button {
  width: 100%;
}
</style>
