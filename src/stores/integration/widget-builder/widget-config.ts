import { computed, ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import { useFetchConfigWidgetQiscus } from '@/composables/channels/qiscus/widget/useFetchConfigWidget';

import { useCallToActionStore } from './call-to-action';
import { useChannelWidgetStore } from './channels';
import { useChatStore } from './chat';
import { useColorWidgetStore } from './color';
import { useLoginFormStore } from './login-form';
import { useWelcomeDialogueStore } from './welcome-dialogue';

export const useWidgetConfig = () => {
  const { fetchConfigWidget, data: widgetConfigData } = useFetchConfigWidgetQiscus();
  const errorPostWidgetConfig = ref<any>();

  // Initialize all stores
  const welcomeDialogStore = useWelcomeDialogueStore();
  const callToActionStore = useCallToActionStore();
  const channelWidgetStore = useChannelWidgetStore();
  const loginFormStore = useLoginFormStore();
  const chatFormStore = useChatStore();
  const colorWidgetStore = useColorWidgetStore();

  const isChatDirty = computed(() => {
    return (
      welcomeDialogStore.isDirty ||
      callToActionStore.isDirty ||
      channelWidgetStore.isDirty ||
      loginFormStore.isDirty ||
      chatFormStore.isDirty ||
      colorWidgetStore.isDirty
    );
  });

  const populateAllStores = () => {
    const config = widgetConfigData.value;
    if (!config) return;

    welcomeDialogStore.populateFromConfig(config);
    callToActionStore.populateFromConfig(config);
    channelWidgetStore.populateFromConfig(config);
    loginFormStore.populateFromConfig(config);
    chatFormStore.populateFromConfig(config);
    colorWidgetStore.populateFromConfig(config);
  };

  const updateAllOriginalStates = () => {
    welcomeDialogStore.updateOriginalState();
    callToActionStore.updateOriginalState();
    channelWidgetStore.updateOriginalState();
    loginFormStore.updateOriginalState();
    chatFormStore.updateOriginalState();
    colorWidgetStore.updateOriginalState();
  };

  const resetAllStores = () => {
    welcomeDialogStore.resetToDefaults();
    callToActionStore.resetToDefaults();
    channelWidgetStore.resetToDefaults();
    loginFormStore.resetToDefaults();
    chatFormStore.resetToDefaults();
    colorWidgetStore.resetToDefaults();
  };

  const getWidgetConfig = async (appId: string, channelId: string) => {
    try {
      await fetchConfigWidget(appId, channelId);

      if (widgetConfigData.value) {
        populateAllStores();
      }
    } catch (error) {
      console.error('Error fetching widget config:', error);
    }
  };

  const buildPayload = (appId: string) => ({
    style: {},
    widget: {
      variables: {
        appID: appId,
        ...welcomeDialogStore.getPayloadData(),
        ...callToActionStore.getPayloadData(),
        ...channelWidgetStore.getPayloadData(),
        ...loginFormStore.getPayloadData(),
        ...chatFormStore.getPayloadData(),
        colorWidget: colorWidgetStore.colorWidgetState,
        selectedWidgetPage: 'welcome',
      },
    },
  });

  const postWidgetConfig = async (appId: string, channelId: string) => {
    try {
      const payload = buildPayload(appId);

      const { data } = await qiscusApi.postWidgetConfig(channelId, payload);

      if (data) {
        updateAllOriginalStates();
      }

      errorPostWidgetConfig.value = null;
      return data;
    } catch (error) {
      errorPostWidgetConfig.value = error;
      console.error('Error posting widget config:', error);
      throw error;
    }
  };

  return {
    errorPostWidgetConfig,
    isChatDirty,
    getWidgetConfig,
    postWidgetConfig,
    populateAllStores,
    updateAllOriginalStates,
    resetAllStores,
  };
};
