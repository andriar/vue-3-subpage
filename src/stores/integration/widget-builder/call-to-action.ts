import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type { ICallToActionState } from '@/types/live-chat';
import type { CallToAction } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useCallToActionStore = defineStore('call-to-action', () => {
  const state = reactive<ICallToActionState>({ ...WIDGET_DEFAULTS.CALL_TO_ACTION });
  const originalState = ref<ICallToActionState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CALL_TO_ACTION))
  );

  const isDirty = computed(() => {
    return JSON.stringify(state) !== JSON.stringify(originalState.value);
  });

  const updateOriginalState = () => {
    originalState.value = JSON.parse(JSON.stringify(state));
  };

  const populateFromConfig = (config: CallToAction) => {
    const defaults = WIDGET_DEFAULTS.CALL_TO_ACTION;

    state.isWithText = config.buttonHasText ?? defaults.isWithText;
    state.liveChatButtonText = config.buttonText ?? defaults.liveChatButtonText;
    //
    state.isWithIcon = config.buttonHasIcon ?? defaults.isWithIcon;
    state.iconImage = config.buttonIcon ?? defaults.iconImage;
    //
    state.borderRadius = config.borderRadius ?? defaults.borderRadius;

    // update original state
    updateOriginalState();
  };

  const getPayloadData = () => ({
    buttonHasText: state.isWithText,
    buttonHasIcon: state.isWithIcon,
    buttonIcon: state.iconImage || DEFAULT_IMAGE_PREVIEW.LOGIN_BRAND_ICON,
    buttonText: state.liveChatButtonText,
    borderRadius: state.borderRadius, // Widget V5 Data
  });

  return {
    state,
    isDirty,
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
  };
});
