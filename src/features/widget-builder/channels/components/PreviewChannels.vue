<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ChannelList from '@/components/ui/widget-preview/ChannelList.vue';
import ChannelListLoading from '@/components/ui/widget-preview/ChannelListLoading.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const { channelState } = storeToRefs(qiscusLiveChatStore);

const channelPreviewData = computed(() => {
  return qiscusLiveChatStore.channelList.filter((channel) => channel.is_enable);
});
</script>

<template>
  <div class="flex flex-col items-end gap-4">
    <ChannelList
      v-if="channelState.isChannelsEnabled"
      :title="channelState.previewTitle"
      :subtitle="channelState.previewSubtitle"
      :introduction="channelState.previewIntroduction"
      :channels="channelPreviewData"
      :previewLiveChatName="channelState.previewLiveChatName"
      :enableQiscusLiveChat="channelState.isQiscusLiveChat"
      :imageUrl="channelState.channelBadgeIcon"
    />
    <ChannelListLoading v-else />

    <div class="bg-surface-disable h-16 w-16 rounded-full" />
  </div>
</template>
