import { defineStore } from 'pinia';

import { useCallToActionStore } from './widget-builder/call-to-action';
import { useWelcomeDialogueStore } from './widget-builder/welcome-dialogue';
import { useWidgetConfig } from './widget-builder/widget-config';

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  // Initialize all sub-stores
  const widgetConfigStore = useWidgetConfig();
  const welcomeDialogStore = useWelcomeDialogueStore();
  const callToActionStore = useCallToActionStore();

  // Re-export for backward compatibility
  return {
    // Error state
    errorPostWidgetConfig: widgetConfigStore.errorPostWidgetConfig,

    // Dirty state
    isChatDirty: widgetConfigStore.isChatDirty,

    // Widget states
    welcomeDialogState: welcomeDialogStore.state,
    callToActionState: callToActionStore.state,
    // loginFormState: loginFormStore.state,
    // chatFormState: chatFormStore.state,

    // Main actions
    getWidgetConfig: widgetConfigStore.getWidgetConfig,
    postWidgetConfig: widgetConfigStore.postWidgetConfig,
  };
});
