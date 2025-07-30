import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type {
  ChannelLiveChat,
  NormalizedOtherChannel,
  OtherChannel,
} from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

// --- Utils Functions ---
const validIndex = (index: unknown) => {
  return typeof index === 'number' && !isNaN(index) && index !== null && index !== undefined;
};

const normalizeChannelData = (channels: OtherChannel[]): NormalizedOtherChannel[] => {
  return channels.map((channel, index) => {
    // If channel doesn't have a valid ID, generate one
    if (!validIndex(channel.index)) {
      const { index: _, ...channelWithoutIndex } = channel;
      return {
        ...channelWithoutIndex,
        index: index + 1, // Use index + 1 as fallback ID
      };
    }

    // If channel has valid ID, destructure to ensure proper typing
    const { index: channelIndex, ...channelWithoutIndex } = channel;
    return {
      ...channelWithoutIndex,
      index: channelIndex!, // Non-null assertion since we validated it
    };
  });
};

export const useChannelWidgetStore = defineStore('channel-widget', () => {
  // Widget configuration state
  const widgetState = reactive({ ...WIDGET_DEFAULTS.CHANNEL_WIDGET });
  const originalWidgetState = ref({ ...WIDGET_DEFAULTS.CHANNEL_WIDGET });

  // Channel list state
  const channelList = ref<NormalizedOtherChannel[]>([]);
  const originalChannelList = ref<NormalizedOtherChannel[]>([]);

  // Computed for check dirty state
  const isDirty = computed(() => {
    const isWidgetDirty = JSON.stringify(widgetState) !== JSON.stringify(originalWidgetState.value);
    const isChannelListDirty =
      JSON.stringify(channelList.value) !== JSON.stringify(originalChannelList.value);
    return isWidgetDirty || isChannelListDirty;
  });

  // --- CRUD Operations ---
  const addChannel = (channel: OtherChannel): void => {
    const validIds = channelList.value
      .map((channel) => channel.index)
      .filter((index) => validIndex(index));

    const newIndex = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;
    const newChannel: NormalizedOtherChannel = {
      index: newIndex,
      ...channel,
    };

    channelList.value.push(newChannel);
  };

  const removeChannel = (channelId: number) => {
    const index = channelList.value.findIndex((channel) => channel.index === channelId);
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  const updateChannel = (channelid: number, updatedData: NormalizedOtherChannel): void => {
    const index = channelList.value.findIndex((channel) => channel.index === channelid);
    if (index !== -1 && channelList.value[index]) {
      Object.assign(channelList.value[index], updatedData);
    }
  };

  const updateOriginalState = () => {
    originalWidgetState.value = JSON.parse(JSON.stringify(widgetState));
    originalChannelList.value = JSON.parse(JSON.stringify(channelList.value));
  };

  const populateFromConfig = (config: ChannelLiveChat) => {
    const defaults = WIDGET_DEFAULTS.CHANNEL_WIDGET;

    // Populate widget state
    widgetState.isChannelsEnabled = config?.isChannelWidgetEnabled ?? defaults.isChannelsEnabled;
    widgetState.previewTitle = config?.channel_widget?.title ?? defaults.previewTitle;
    widgetState.previewSubtitle = config?.channel_widget?.subtitle ?? defaults.previewSubtitle;
    widgetState.isQiscusLiveChat =
      config?.channel_widget?.live_channel?.is_enable ?? defaults.isQiscusLiveChat;
    widgetState.previewLiveChatName =
      config?.channel_widget?.live_channel?.name ?? defaults.previewLiveChatName;
    widgetState.channelBadgeIcon =
      config?.channel_widget?.live_channel?.badge_url ?? defaults.channelBadgeIcon;
    widgetState.previewIntroduction =
      config?.channel_widget?.introduction ?? defaults.previewIntroduction;

    // Populate channel list
    channelList.value = normalizeChannelData(config?.channel_widget?.other_channel ?? []);

    // Update original states
    updateOriginalState();
  };

  const getPayloadData = () => ({
    isChannelWidgetEnabled: widgetState.isChannelsEnabled,
    channel_widget: {
      title: widgetState.previewTitle,
      subtitle: widgetState.previewSubtitle,
      introduction: widgetState.previewIntroduction,
      live_channel: {
        name: widgetState.previewLiveChatName,
        is_enable: widgetState.isQiscusLiveChat,
        badge_url: widgetState.channelBadgeIcon,
      },
      other_channel: channelList.value,
    },
  });

  const resetToDefaults = () => {
    Object.assign(widgetState, { ...WIDGET_DEFAULTS.CHANNEL_WIDGET });
    originalWidgetState.value = { ...WIDGET_DEFAULTS.CHANNEL_WIDGET };
    channelList.value = [];
    originalChannelList.value = [];
  };

  return {
    // Widget state
    widgetState,

    // Channel list
    channelList,

    // Computed
    isDirty,

    // Channel operations
    addChannel,
    removeChannel,
    updateChannel,

    // Config operations
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
    resetToDefaults,
  };
});
