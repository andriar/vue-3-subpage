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
      d="M19.6653 5.95098C20.1116 5.50467 20.1116 4.78105 19.6653 4.33474C19.219 3.88842 18.4953 3.88842 18.049 4.33474L12 10.3838L5.95098 4.33474C5.50467 3.88842 4.78105 3.88842 4.33474 4.33474C3.88842 4.78105 3.88842 5.50467 4.33474 5.95098L10.3838 12L4.33474 18.049C3.88842 18.4953 3.88842 19.219 4.33474 19.6653C4.78105 20.1116 5.50467 20.1116 5.95098 19.6653L12 13.6162L18.049 19.6653C18.4953 20.1116 19.219 20.1116 19.6653 19.6653C20.1116 19.219 20.1116 18.4953 19.6653 18.049L13.6162 12L19.6653 5.95098Z"
      fill="currentColor"
    />
  </svg>
</template>
