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
      d="M15 5C15.5523 5 16 4.55228 16 4C16 3.44772 15.5523 3 15 3H9C8.44772 3 8 3.44772 8 4C8 4.55228 8.44772 5 9 5H15ZM5 7C3.34315 7 2 8.34315 2 10V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V10C22 8.34315 20.6569 7 19 7H5ZM4 10C4 9.44772 4.44772 9 5 9H19C19.5523 9 20 9.44772 20 10V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V10ZM11 14C11 15.1046 10.1046 16 9 16C7.89543 16 7 15.1046 7 14C7 12.8954 7.89543 12 9 12C10.1046 12 11 12.8954 11 14ZM15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z"
      fill="currentColor"
    />
  </svg>
</template>
