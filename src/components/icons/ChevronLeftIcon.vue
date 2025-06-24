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
  <svg :width="props.size" :height="props.size" :class="props.class" viewBox="0 0 8 14" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.70711 0.292893C7.31658 -0.0976311 6.68342 -0.0976311 6.29289 0.292893L0.292893 6.29289C-0.0976315 6.68342 -0.0976315 7.31658 0.292893 7.70711L6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L2.41421 7L7.70711 1.70711C8.09763 1.31658 8.09763 0.683417 7.70711 0.292893Z"
      fill="currentColor"
    />
  </svg>
</template>
