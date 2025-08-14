<script setup lang="ts">
import Image from '@/components/common/Image.vue';
import { ChatIcon, ChevronRightIcon, QiscusIcon } from '@/components/icons';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  textColor?: string;
  isUsingIconSkeleton?: boolean;
  actions: {
    label: string;
    iconUrl: string;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: DEFAULT_IMAGE_PREVIEW.WELCOME_BRAND_ICON,
  title: 'Hello there,',
  subtitle: 'Welcome to Qiscus!',
  textColor: '#01416C',
  isUsingIconSkeleton: false,
  actions: () => [
    {
      label: 'Ask for Questions',
      iconUrl: '',
    },
  ],
});
</script>

<template>
  <div
    :style="{ color: props.textColor }"
    class="shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white"
  >
    <div class="flex-1 gap-8 p-8">
      <!-- Header section -->
      <div class="flex flex-col gap-6">
        <!-- Logo section -->
        <div
          v-if="props.isUsingIconSkeleton"
          class="bg-surface-disable h-8 w-8 animate-pulse rounded-full"
        />
        <QiscusIcon v-else-if="!props.imageUrl" :size="32" />
        <Image
          v-else
          :src="props.imageUrl"
          alt="brand icon welcome dialogue"
          :width="32"
          :height="32"
        />

        <!-- Title section -->
        <div>
          <div v-if="props.title" class="text-2xl break-words">{{ props.title }}</div>
          <div v-else class="bg-surface-disable h-4.5 w-37 animate-pulse rounded-full"></div>
          <div v-if="props.subtitle" class="text-2xl font-bold break-words">
            {{ props.subtitle }}
          </div>
          <div v-else class="bg-surface-disable mt-3 h-4.5 w-full animate-pulse rounded-full"></div>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-2">
        <template v-if="props.actions.some((action) => action.label)">
          <button
            v-for="action in props.actions"
            :key="action.label"
            class="hover:bg-surface-primary-blue/5 shadow-card flex cursor-pointer rounded-xl p-4"
          >
            <div class="flex min-w-0 flex-1 gap-2">
              <div class="flex flex-shrink-0 items-center">
                <Image
                  v-if="action.iconUrl"
                  :src="action.iconUrl"
                  :width="24"
                  :height="24"
                  alt="icon action"
                  class="h-6 w-6"
                />
                <ChatIcon :size="24" v-else />
              </div>
              <div class="min-w-0 flex-1 text-start text-sm font-medium break-words">
                {{ action.label }}
              </div>
            </div>

            <div class="flex flex-shrink-0 items-center">
              <ChevronRightIcon :size="24" />
            </div>
          </button>
        </template>
        <div v-else class="bg-surface-disable h-14 w-full animate-pulse rounded-xl"></div>
      </div>
    </div>

    <div class="text-text-title border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
