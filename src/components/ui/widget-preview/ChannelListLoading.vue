<script setup lang="ts">
import Image from '@/components/common/Image.vue';
import { ChevronRightIcon } from '@/components/icons';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const channels = [
  {
    label: 'Qiscus',
    iconUrl: CHANNEL_BADGE_URL.qiscus,
  },
  {
    label: 'WhatsApp',
    iconUrl: CHANNEL_BADGE_URL.whatsapp,
  },
  {
    label: 'Instagram',
    iconUrl: CHANNEL_BADGE_URL.instagram,
  },
];
</script>

<template>
  <div class="text-navy-500 shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white">
    <div class="flex-1 p-8">
      <div class="flex w-full flex-col gap-3">
        <div class="bg-surface-disable h-4.5 w-37 animate-pulse rounded-full"></div>
        <div class="bg-surface-disable h-4.5 w-full animate-pulse rounded-full"></div>
      </div>

      <div class="mt-8 flex w-full flex-col gap-4">
        <div
          v-for="channel in channels"
          :key="channel.label"
          class="shadow-card flex items-center justify-between rounded-xl p-4"
        >
          <div class="flex flex-1 items-center gap-2">
            <Image
              :src="channel.iconUrl"
              :width="24"
              :height="24"
              alt="Icon Channel"
              class="h-6 w-6"
            />
            <div class="bg-surface-disable h-4.5 w-44 animate-pulse rounded-xl"></div>
          </div>

          <div>
            <ChevronRightIcon :size="24" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-black-700 border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
