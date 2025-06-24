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
      d="M3.81818 12C3.81818 7.48131 7.48131 3.81818 12 3.81818C16.5187 3.81818 20.1818 7.48131 20.1818 12C20.1818 16.5187 16.5187 20.1818 12 20.1818C7.48131 20.1818 3.81818 16.5187 3.81818 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.9091 6.54545C12.9091 6.04338 12.5021 5.63636 12 5.63636C11.4979 5.63636 11.0909 6.04338 11.0909 6.54545V12C11.0909 12.3443 11.2855 12.6591 11.5934 12.8131L15.2298 14.6313C15.6789 14.8558 16.2249 14.6738 16.4495 14.2247C16.674 13.7757 16.492 13.2296 16.0429 13.0051L12.9091 11.4382V6.54545Z"
      fill="currentColor"
    />
  </svg>
</template>
