import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import type { IWelcomeDialogFormState } from '@/types/live-chat';
import type { WelcomeDialogue } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

export const useWelcomeDialogueStore = defineStore('welcome-dialogue', () => {
  const state = reactive<IWelcomeDialogFormState>({ ...WIDGET_DEFAULTS.WELCOME_DIALOG });
  const originalState = ref<IWelcomeDialogFormState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.WELCOME_DIALOG))
  );

  const isDirty = computed(() => {
    return JSON.stringify(state) !== JSON.stringify(originalState.value);
  });

  const updateOriginalState = () => {
    originalState.value = JSON.parse(JSON.stringify(state));
  };

  const populateFromConfig = (config: WelcomeDialogue) => {
    const defaults = WIDGET_DEFAULTS.WELCOME_DIALOG;

    state.isWelcomeDialog = config?.welcomeMessageStatus ?? defaults.isWelcomeDialog;
    state.brandIconWelcomeDialog = config?.welcomeBrandIcon ?? defaults.brandIconWelcomeDialog;
    state.firstDescriptionWelcomeDialog =
      config?.welcomeGreetingText ?? defaults.firstDescriptionWelcomeDialog;
    state.secondDescriptionWelcomeDialog =
      config?.welcomeText ?? defaults.secondDescriptionWelcomeDialog;
    state.actionDescriptionWelcomeDialog =
      config?.welcomeActionDescription ?? defaults.actionDescriptionWelcomeDialog;
    state.actionIconWelcomeDialog = config?.welcomeActionIcon ?? defaults.actionIconWelcomeDialog;
    state.welcomeTimeout = config?.welcomeTimeout ?? defaults.welcomeTimeout;
    state.openAtStart = config?.openAtStart ?? defaults.openAtStart;
    state.isAttentionGrabber = config?.attentionGrabberStatus ?? defaults.isAttentionGrabber;
    state.isAttentionGrabberImage = config?.grabberImage ?? defaults.isAttentionGrabberImage;
    state.isAttentionGrabberText = config?.grabberTextStatus ?? defaults.isAttentionGrabberText;
    state.attentionGrabberText = config?.attentionGrabberText ?? defaults.attentionGrabberText;
    state.grabberTimeout = config?.grabberTimeout ?? defaults.grabberTimeout;
    state.attentionGrabberImage = config?.attentionGrabberImage ?? defaults.attentionGrabberImage;

    // Update original state
    updateOriginalState();
  };

  const getPayloadData = () => ({
    welcomeMessageStatus: state.isWelcomeDialog,
    welcomeBrandIcon: state.brandIconWelcomeDialog,
    welcomeGreetingText: state.firstDescriptionWelcomeDialog,
    welcomeText: state.secondDescriptionWelcomeDialog,
    welcomeActionIcon: state.actionIconWelcomeDialog,
    welcomeActionDescription: state.actionDescriptionWelcomeDialog,
    welcomeTimeout: state.welcomeTimeout,
    openAtStart: state.openAtStart,
    attentionGrabberStatus: state.isAttentionGrabber,
    grabberImage: state.isAttentionGrabberImage,
    grabberTextStatus: state.isAttentionGrabberText,
    attentionGrabberText: state.attentionGrabberText,
    grabberTimeout: state.grabberTimeout ?? 0,
    attentionGrabberImage: state.attentionGrabberImage,
  });

  return {
    state,
    isDirty,
    populateFromConfig,
    getPayloadData,
    updateOriginalState,
  };
});
