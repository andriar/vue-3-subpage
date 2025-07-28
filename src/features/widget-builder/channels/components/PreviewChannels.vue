<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ChannelList from '@/components/ui/widget-preview/ChannelList.vue';
import ChannelListLoading from '@/components/ui/widget-preview/ChannelListLoading.vue';
import { useChannelWidgetStore } from '@/stores/integration/widget-builder/channels';

const { widgetState: channelState, channelList } = storeToRefs(useChannelWidgetStore());

const channelPreviewData = computed(() => {
  return channelList.value.filter((channel) => channel.is_enable);
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
