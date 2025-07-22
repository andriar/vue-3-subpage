<script setup lang="ts">
import { computed } from 'vue';

import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { CloseIcon } from '@/components/icons';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';

const props = withDefaults(
  defineProps<{
    imageUrl: string;
    title: string;
  }>(),
  {
    imageUrl: DEFAULT_IMAGE_PREVIEW.ATTENTION_GRABBER_IMAGE,
    description: 'Hello, there is Promo!',
  }
);

const finalImageUrl = computed(() => {
  return props.imageUrl || DEFAULT_IMAGE_PREVIEW.ATTENTION_GRABBER_IMAGE;
});
</script>

<template>
  <div
    class="text-navy-500 shadow-card-float flex w-[360px] flex-col overflow-hidden rounded-4xl bg-white"
  >
    <div
      class="bg-surface-disable relative grid h-[208px] max-h-[208px] min-h-[208px] w-full flex-1 place-items-center"
    >
      <ButtonIcon v-show="imageUrl" class="absolute top-4 right-4 text-white">
        <CloseIcon />
      </ButtonIcon>
      <img :src="finalImageUrl" alt="image attention grabber" class="h-full w-full object-cover" />
    </div>
    <div class="p-6 text-left break-words">
      {{ title }}
    </div>
  </div>
</template>
