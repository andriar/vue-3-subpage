<template>
  <svg
    :width="props.size"
    :height="props.size"
    :class="props.class"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.07625 16.4513C4.71796 16.7958 4.70679 17.3655 5.0513 17.7238C5.39581 18.0821 5.96555 18.0933 6.32385 17.7488L11.7238 12.6487C11.9003 12.4791 12 12.2448 12 12C12 11.7552 11.9003 11.5209 11.7238 11.3513L6.32385 6.25125C5.96555 5.90674 5.39581 5.91791 5.0513 6.2762C4.70679 6.6345 4.71796 7.20424 5.07625 7.54875L9.80155 12L5.07625 16.4513Z"
      fill="currentColor"
    />
    <path
      d="M12.2763 16.4513C11.918 16.7958 11.9068 17.3655 12.2513 17.7238C12.5958 18.0821 13.1656 18.0933 13.5238 17.7488L18.9238 12.6487C19.1003 12.4791 19.2 12.2448 19.2 12C19.2 11.7552 19.1003 11.5209 18.9238 11.3513L13.5238 6.25125C13.1656 5.90674 12.5958 5.91791 12.2513 6.2762C11.9068 6.6345 11.918 7.20424 12.2763 7.54875L17.0016 12L12.2763 16.4513Z"
      fill="currentColor"
    />
  </svg>
</template>

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
