<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <router-link
      to="/"
      id="route-integration"
      class="text-primary flex items-center gap-2 text-sm font-semibold"
    >
      <BackIcon :size="20" class="text-primary" />
      Integration
    </router-link>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Image
        :src="CHANNEL_BADGE_URL.qiscus"
        alt="Qiscus Logo"
        class="h-6 w-6"
        :width="24"
        :height="24"
      />

      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
    </div>

    <!-- Banner documentation -->
    <WidgetBannerDoc />

    <!-- Table section -->
    <div class="shadow-large flex flex-1 items-center justify-between overflow-hidden rounded-2xl">
      <!-- Search Input with Icon -->
      <WidgetTableChannel class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from '@/components/common/common';
import { BackIcon } from '@/components/icons';
import WidgetBannerDoc from '@/features/widget/components/ui/WidgetBannerDoc.vue';
import WidgetTableChannel from '@/features/widget/pages/WidgetTableChannel.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
</script>
