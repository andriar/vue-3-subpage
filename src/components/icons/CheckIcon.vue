<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    class?: string;
  }>(),
  {
    size: 24,
    class: '',
  }
);
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :class="props.class"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.7071 5.79289C21.0976 6.18342 21.0976 6.81658 20.7071 7.20711L9.70711 18.2071C9.31658 18.5976 8.68342 18.5976 8.29289 18.2071L3.29289 13.2071C2.90237 12.8166 2.90237 12.1834 3.29289 11.7929C3.68342 11.4024 4.31658 11.4024 4.70711 11.7929L9 16.0858L19.2929 5.79289C19.6834 5.40237 20.3166 5.40237 20.7071 5.79289Z"
      fill="currentColor"
    />
  </svg>
</template>
