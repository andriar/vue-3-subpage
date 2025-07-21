<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { ChevronLeftIcon } from '@/components/icons';

const props = defineProps<{
  title?: string;
  color?: string;
  icon?: string;
}>();
</script>

<template>
  <div class="text-navy-500 shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white">
    <div class="p-8">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <ButtonIcon v-if="props.icon">
          <ChevronLeftIcon :size="24" class="text-navy-500" />
        </ButtonIcon>
        <div v-else class="bg-surface-disable h-6 w-6 animate-pulse rounded-full" />
        <img v-if="props.icon" :src="props.icon" width="32" height="32" />
        <div v-else class="bg-surface-disable h-8 w-8 animate-pulse rounded-full" />
        <div
          v-if="props.title"
          class="text-black-700 min-w-0 flex-1 text-sm font-medium break-words"
        >
          {{ props.title }}
        </div>
        <div v-else class="bg-surface-disable h-4.5 w-[148px] animate-pulse rounded-full" />
      </div>

      <div class="mt-8 flex flex-col gap-4">
        <div class="bg-surface-disable h-4.5 w-37 animate-pulse self-center rounded-full"></div>

        <!-- Bubble Skeleton -->
        <div
          class="bg-surface-disable mt-4 flex animate-pulse flex-col gap-3 rounded-t-[24px] rounded-br-[24px] rounded-bl-[4px] p-4"
        >
          <div class="flex gap-3">
            <div class="h-6 w-6 rounded-full bg-white"></div>
            <div class="h-6 w-[92px] rounded-full bg-white"></div>
          </div>
          <div class="h-6 min-h-6 w-full rounded-full bg-white"></div>
          <div class="h-6 min-h-6 w-full rounded-full bg-white"></div>
        </div>
        <!-- Slot data -->
        <slot name="bubble" />
      </div>
    </div>

    <div class="px-8 py-3">
      <div class="bg-surface-disable h-[56px] w-full animate-pulse rounded-full"></div>
    </div>

    <div class="text-black-700 border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
