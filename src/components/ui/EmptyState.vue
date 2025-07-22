<template>
  <div class="flex flex-col items-center gap-4">
    <Image :src="imageUrl" alt="not-found-image" :width="207" class="!h-auto" />
    <div class="text-text-title text-lg font-semibold">{{ title }}</div>
    <div class="text-text-subtitle text-sm">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { Image } from '../common/common';

withDefaults(
  defineProps<{
    imageUrl: string;
    title: string;
    description: string;
  }>(),
  {
    imageUrl: 'https://omnichannel.qiscus.com/img/empty-customer.svg',
    title: 'No Results',
    description:
      'You may want to try using different keywords or checking for the typos to find it.',
  }
);
</script>
