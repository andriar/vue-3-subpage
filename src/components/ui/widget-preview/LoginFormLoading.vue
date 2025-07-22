<script setup lang="ts">
import { SignIcon } from '@/components/icons';
import UserIcon from '@/components/icons/UserIcon.vue';

const props = defineProps<{
  title: string;
  subtitle: string;
  description: string;
  color?: string;
}>();
</script>

<template>
  <div
    :style="{ color: props.color }"
    class="shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white"
  >
    <div class="flex flex-1 flex-col gap-8 p-8">
      <!-- Header -->
      <div class="bg-surface-disable h-6 w-6 animate-pulse rounded-full" />
      <div class="flex flex-col gap-2">
        <div class="flex gap-3">
          <div class="bg-surface-disable h-6 w-6 animate-pulse rounded-full" />
          <div class="text-2xl font-bold">{{ props.subtitle }}</div>
        </div>
        <div class="text-md">{{ props.description }}</div>
      </div>

      <!-- Inputs Skeleton -->
      <div class="flex w-full flex-col gap-4">
        <div
          class="bg-surface-disable shadow-card flex w-full animate-pulse items-center gap-3 rounded-2xl px-3 py-4"
        >
          <div class="rounded-lg bg-white p-[7px]">
            <UserIcon :size="18" />
          </div>
        </div>

        <div
          class="bg-surface-disable shadow-card flex w-full animate-pulse items-center gap-3 rounded-2xl px-3 py-4"
        >
          <div class="rounded-lg bg-white p-[7px]">
            <SignIcon :size="18" />
          </div>
        </div>
      </div>
    </div>

    <!-- Button Skeleton -->
    <div class="px-8 py-3">
      <div
        class="flex w-full justify-center rounded-2xl py-4 text-base font-medium text-white"
        :style="{ backgroundColor: props.color }"
      >
        <div class="bg-surface-disable h-6 w-[148px] animate-pulse rounded-2xl" />
      </div>
    </div>

    <div class="text-black-700 border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
