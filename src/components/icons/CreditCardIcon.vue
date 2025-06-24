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
      d="M3.81818 6.66667C3.81818 6.09413 4.23079 5.77778 4.56198 5.77778H19.438C19.7692 5.77778 20.1818 6.09413 20.1818 6.66667V9.33333H3.81818V6.66667ZM2 10.2222V6.66667C2 5.27553 3.06744 4 4.56198 4H19.438C20.9326 4 22 5.27553 22 6.66667V10.2222V17.3333C22 18.7245 20.9326 20 19.438 20H4.56198C3.06744 20 2 18.7245 2 17.3333V10.2222ZM20.1818 11.1111V17.3333C20.1818 17.9059 19.7692 18.2222 19.438 18.2222H4.56198C4.23079 18.2222 3.81818 17.9059 3.81818 17.3333V11.1111H20.1818Z"
      fill="currentColor"
    />
  </svg>
</template>
