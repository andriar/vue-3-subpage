<script setup lang="ts">
import { computed } from 'vue'

// Import icon components
import CloseIcon from './CloseIcon.vue'

interface IconProps {
  name: string
  size?: number
  class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  class: '',
})

// Icon registry - maps icon names to components
const iconRegistry = {
  close: CloseIcon,
}

const iconComponent = computed(() => {
  const iconName = props.name.toLowerCase()
  return iconRegistry[iconName as keyof typeof iconRegistry]
})

const iconClasses = computed(() => {
  return `inline-block ${props.class}`
})
</script>

<template>
  <component v-if="iconComponent" :is="iconComponent" :size="size" :class="iconClasses" />
  <span v-else class="text-red-500">
    Icon "{{ name }}" not found
  </span>
</template>