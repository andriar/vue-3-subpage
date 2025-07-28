import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { QiscusWidgetConfigData } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useColorWidgetStore = defineStore('color-widget', () => {
  const colorWidgetState = ref<string>(WIDGET_DEFAULTS.COLOR_WIDGET);
  const originalColorWidgetState = ref<string>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.COLOR_WIDGET))
  );

  const isDirty = computed(() => {
    return (
      JSON.stringify(colorWidgetState.value) !== JSON.stringify(originalColorWidgetState.value)
    );
  });

  const updateOriginalState = () => {
    originalColorWidgetState.value = JSON.parse(JSON.stringify(colorWidgetState.value));
  };

  const populateFromConfig = (config: QiscusWidgetConfigData) => {
    colorWidgetState.value = config?.colorWidget ?? WIDGET_DEFAULTS.COLOR_WIDGET;

    // Update original state
    updateOriginalState();
  };

  return {
    colorWidgetState,
    isDirty,
    populateFromConfig,
    updateOriginalState,
  };
});
