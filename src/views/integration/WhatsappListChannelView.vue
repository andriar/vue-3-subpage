<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <Icon name="chevron-left" :size="20" />
      Integration
    </router-link>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Icon name="chat" :size="20" />
      <h2 class="text-text-title text-xl font-semibold">WhatsApp</h2>
    </div>

    <!-- Banner documentation -->
    <WhatsappBannerDoc />

    <!-- Table section -->
    <div class="shadow-large flex items-center justify-between rounded-2xl bg-white">
      <!-- Search Input with Icon -->
      <TableListChannel
        :channels="whatsapp_channels"
        @updateChannelStatus="updateChannelStatus"
        @search="search"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { Icon } from '@/components/icons';
import TableListChannel from '@/pages/integration/whatsapp/TableListChannel.vue';
import WhatsappBannerDoc from '@/pages/integration/whatsapp/WhatsappBannerDoc.vue';
import { useWhatsappStore } from '@/stores/integration-whatsapp';
import type { IWhatsappChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const channelsStore = useWhatsappStore();

const whatsapp_channels = computed(() =>
  channelsStore.channels.map((channel: IWhatsappChannel) => ({
    id: channel.id,
    name: channel.name,
    channelId: channel.id.toString(),
    isActive: channel.is_active,
    badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.whatsapp,
  }))
);

function updateChannelStatus(data: { id: number; isActive: boolean }) {
  console.log(data);
  // channelsStore.updateChannelStatus(data.id, data.isActive, channelType);
  // alert success
}

function search(query: string) {
  channelsStore.meta.search = query;
  channelsStore.meta.page = 1;
  channelsStore.getWhatsappChannels();
}

function pagination(type: string) {
  switch (type) {
    case 'next':
      channelsStore.meta.page += 1;
      break;
    case 'prev':
      if (channelsStore.meta.page > 1) {
        channelsStore.meta.page -= 1;
      }
      break;
    case 'first':
      channelsStore.meta.page = 1;
      break;
    case 'last':
      channelsStore.meta.page = channelsStore.meta.total_page;
      break;
  }
  channelsStore.getWhatsappChannels();
}

onMounted(async () => {
  await channelsStore.getWhatsappChannels();
});
</script>
