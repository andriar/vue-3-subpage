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
      d="M19 9.9375C19.5523 9.9375 20 9.48978 20 8.9375C20 8.38522 19.5523 7.9375 19 7.9375C18.4477 7.9375 18 8.38522 18 8.9375C18 9.48978 18.4477 9.9375 19 9.9375ZM19 11.9375C20.6569 11.9375 22 10.5944 22 8.9375C22 7.28065 20.6569 5.9375 19 5.9375C17.3431 5.9375 16 7.28065 16 8.9375C16 10.5944 17.3431 11.9375 19 11.9375Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.5 11.0625C9.433 11.0625 11 9.4955 11 7.5625C11 5.6295 9.433 4.0625 7.5 4.0625C5.567 4.0625 4 5.6295 4 7.5625C4 9.4955 5.567 11.0625 7.5 11.0625ZM7.5 13.0625C10.5376 13.0625 13 10.6001 13 7.5625C13 4.52493 10.5376 2.0625 7.5 2.0625C4.46243 2.0625 2 4.52493 2 7.5625C2 10.6001 4.46243 13.0625 7.5 13.0625Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.5 19.9375C15.8807 19.9375 17 18.8182 17 17.4375C17 16.0568 15.8807 14.9375 14.5 14.9375C13.1193 14.9375 12 16.0568 12 17.4375C12 18.8182 13.1193 19.9375 14.5 19.9375ZM14.5 21.9375C16.9853 21.9375 19 19.9228 19 17.4375C19 14.9522 16.9853 12.9375 14.5 12.9375C12.0147 12.9375 10 14.9522 10 17.4375C10 19.9228 12.0147 21.9375 14.5 21.9375Z"
      fill="currentColor"
    />
  </svg>
</template>
