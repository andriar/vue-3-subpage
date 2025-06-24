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
      d="M15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6ZM4 22C4 18.2415 7.46774 15 12 15C16.5323 15 20 18.2415 20 22C20 22.5523 20.4477 23 21 23C21.5523 23 22 22.5523 22 22C22 16.922 17.4089 13 12 13C6.59113 13 2 16.922 2 22C2 22.5523 2.44772 23 3 23C3.55228 23 4 22.5523 4 22Z"
      fill="currentColor"
    />
  </svg>
</template>
