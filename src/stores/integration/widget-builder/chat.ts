import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type { IChatState } from '@/types/live-chat';
import type { Chat } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useChatStore = defineStore('chat', () => {
  const state = reactive<IChatState>({ ...WIDGET_DEFAULTS.CHAT });
  const originalState = ref<IChatState>(JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CHAT)));

  const isDirty = computed(() => {
    return JSON.stringify(state) !== JSON.stringify(originalState.value);
  });

  const updateOriginalState = () => {
    originalState.value = JSON.parse(JSON.stringify(state));
  };

  const populateFromConfig = (config: Chat) => {
    const defaults = WIDGET_DEFAULTS.CHAT;

    state.customerServiceName = config?.customerServiceName ?? defaults.customerServiceName;
    state.customerServiceAvatar = config?.customerServiceAvatar ?? defaults.customerServiceAvatar;

    // Update original state
    updateOriginalState();
  };

  const getPayloadData = () => ({
    customerServiceName: state.customerServiceName,
    customerServiceAvatar: state.customerServiceAvatar || CHANNEL_BADGE_URL.qiscus,
  });

  return {
    state,
    isDirty,
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
  };
});
