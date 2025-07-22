<script setup lang="ts">
import { computed } from 'vue';

import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { Image } from '@/components/common/common';
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import type { NormalizedOtherChannel } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  introduction: string;
  previewLiveChatName?: string;
  enableQiscusLiveChat?: boolean;
  channels: NormalizedOtherChannel[];
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: '',
  title: 'Hello there,',
  subtitle: 'Welcome to Qiscus!',
  introduction: 'Welcome to Qiscus!',
  previewLiveChatName: 'Qiscus Live Chat',
  enableQiscusLiveChat: false,
  channels: () => [],
});

const finalImageUrl = computed(() => {
  return props.imageUrl || CHANNEL_BADGE_URL.qiscus;
});
</script>

<template>
  <div class="shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white">
    <!-- Main Section -->
    <div class="flex flex-col gap-8 px-8 pt-8">
      <!-- Header Section -->
      <div class="flex flex-col gap-6">
        <ButtonIcon>
          <ChevronLeftIcon :size="24" class="!text-navy-500" />
        </ButtonIcon>

        <div class="text-surface-primary-blue flex flex-col">
          <div class="text-2xl break-words">{{ props.title }}</div>
          <div class="text-2xl font-bold break-words">{{ props.subtitle }}</div>
        </div>
      </div>
      <p v-if="props.introduction" class="text-text-title text-sm font-medium break-words">
        {{ props.introduction }}
      </p>
    </div>
    <!-- Channel List Section -->
    <div class="hide-scrollbar mt-4 flex max-h-[350px] flex-col gap-4 overflow-y-auto px-8">
      <!-- Qiscus Live Chat -->
      <button
        v-if="props.enableQiscusLiveChat"
        class="hover:bg-surface-primary-blue/5 shadow-card flex cursor-pointer justify-between rounded-xl p-4 px-4"
      >
        <div class="flex min-w-0 flex-1 items-center gap-2">
          <Image :src="finalImageUrl" alt="qiscus livechat icon" :width="24" :height="24" />
          <div class="min-w-0 flex-1 text-start text-sm font-medium break-words">
            {{ props.previewLiveChatName }}
          </div>
        </div>

        <div class="flex flex-shrink-0 items-center">
          <ChevronRightIcon :size="24" />
        </div>
      </button>

      <!-- Channel List Item -->
      <button
        v-for="action in props.channels"
        :key="action.name"
        class="hover:bg-surface-primary-blue/5 shadow-card flex cursor-pointer justify-between rounded-xl p-4 px-4"
      >
        <div class="flex min-w-0 flex-1 items-center gap-2">
          <Image
            v-if="action.badge_url"
            :src="action.badge_url"
            :width="24"
            :height="24"
            alt="icon channel"
            class="h-6 w-6"
          />
          <ChatIcon :size="24" v-else />
          <div class="min-w-0 flex-1 text-start text-sm font-medium break-words">
            {{ action.name }}
          </div>
        </div>

        <div class="flex flex-shrink-0 items-center">
          <ChevronRightIcon :size="24" />
        </div>
      </button>

      <!-- Skeleton Loading -->
      <div
        v-for="i in 2"
        :key="i"
        class="bg-surface-disable h-14 min-h-14 w-full animate-pulse rounded-xl"
      ></div>
    </div>

    <!-- Footer Section (Powered by Qiscus) -->
    <div class="text-black-700 border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
