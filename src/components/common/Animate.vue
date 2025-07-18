<script setup>
import { Vue3Lottie } from 'vue3-lottie';

const props = defineProps({
  source: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 200,
  },
  width: {
    type: Number,
    default: 200,
  },
});

</script>

<template>
  <div>
    <Vue3Lottie :animationData="source" :height="height" :width="width" v-bind="$attrs" />
  </div>
</template>

<style scoped></style>
