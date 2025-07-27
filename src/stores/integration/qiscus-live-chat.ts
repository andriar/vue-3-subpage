import { defineStore } from 'pinia';
import { reactive, ref, watchEffect } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IconName } from '@/components/icons/Icon.vue';
import { useFetchConfigWidgetQiscus } from '@/composables/channels/qiscus/widget/useFetchConfigWidget';
import type { IWidgetConfigPayload } from '@/types/channels';
import type {
  ICallToActionState,
  IChatFormState,
  ILoginFormState,
  IWelcomeDialogState,
} from '@/types/live-chat';
import type {
  NormalizedOtherChannel,
  OtherChannel,
} from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';
import { WIDGET_DEFAULTS } from '@/utils/constant/widget-default';

const { fetchConfigWidget, data: widgetConfigData } = useFetchConfigWidgetQiscus();

// Add this helper function before the store definition
const normalizeChannelData = (channels: OtherChannel[]): NormalizedOtherChannel[] => {
  return channels.map((channel, index) => {
    // If channel doesn't have a valid ID, generate one
    if (!channel.index || typeof channel.index !== 'number' || isNaN(channel.index)) {
      return {
        index: index + 1, // Use index + 1 as fallback ID
        badge_url: channel.badge_url,
        name: channel.name || '',
        url: channel.url || '',
        is_enable: channel.is_enable || false,
        is_active: channel.is_active,
      };
    }

    // If channel has valid ID, return as-is (it's already properly structured)
    return {
      ...channel,
      index: channel.index,
    };
  });
};

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  const isChatDirty = ref(false);
  const errorPostWidgetConfig = ref<any>();

  // state for welcome dialog
  const welcomeDialogState = reactive<IWelcomeDialogState>({ ...WIDGET_DEFAULTS.WELCOME_DIALOG });
  const originalWelcomeDialogState = ref<IWelcomeDialogState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.WELCOME_DIALOG))
  );

  // state for call to action
  const callToActionState = reactive<ICallToActionState>({ ...WIDGET_DEFAULTS.CALL_TO_ACTION });
  const originalCallToActionState = ref<ICallToActionState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CALL_TO_ACTION))
  );

  // state for Channel Widget
  const channelState = reactive({ ...WIDGET_DEFAULTS.CHANNEL_WIDGET });
  const channelList = ref<NormalizedOtherChannel[]>([]);
  const originalChannelState = ref(JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CHANNEL_WIDGET)));

  // state for login form
  const loginFormState = reactive<ILoginFormState>({ ...WIDGET_DEFAULTS.LOGIN_FORM });
  const originalLoginFormState = ref<ILoginFormState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.LOGIN_FORM))
  );

  // state for chat form
  const chatFormState = reactive<IChatFormState>({ ...WIDGET_DEFAULTS.CHAT_FORM });
  const originalChatFormState = ref<IChatFormState>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CHAT_FORM))
  );

  // state for color widget
  const colorWidgetState = ref<string>(WIDGET_DEFAULTS.COLOR_WIDGET);
  const originalColorWidgetState = ref<string>(
    JSON.parse(JSON.stringify(WIDGET_DEFAULTS.CHAT_FORM))
  );

  const customerIdentifierOptions = ref<{ label: string; value: string }[]>([
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone Number',
      value: 'phone',
    },
  ]);
  const fieldTypeOptionsAdditionalField = ref<{ text: string; value: string }[]>([
    {
      text: 'Input Text',
      value: 'input',
    },
    {
      text: 'Text Area',
      value: 'textarea',
    },
    {
      text: 'Dropdown',
      value: 'dropdown',
    },
  ]);
  const iconsAdditionalField = ref<{ name: string; icon: IconName }[]>([
    {
      name: 'Date',
      icon: 'date',
    },
    {
      name: 'Location',
      icon: 'pin',
    },
    {
      name: 'Briefcase',
      icon: 'briefcase',
    },
    {
      name: 'Globe',
      icon: 'globe',
    },
    {
      name: 'Phone',
      icon: 'phone',
    },
  ]);

  // GETTERS

  // ACTIONS

  watchEffect(() => {
    const isChatFormDirty =
      JSON.stringify(chatFormState) !== JSON.stringify(originalChatFormState.value);
    const isColorWidgetDirty =
      JSON.stringify(colorWidgetState.value) !== JSON.stringify(originalColorWidgetState.value);
    const isLoginFormDirty =
      JSON.stringify(loginFormState) !== JSON.stringify(originalLoginFormState.value);
    const isChannelWidgetDirty =
      JSON.stringify(channelState) !== JSON.stringify(originalChannelState.value);
    const isCallToActionDirty =
      JSON.stringify(callToActionState) !== JSON.stringify(originalCallToActionState.value);
    const isWelcomeDialogDirty =
      JSON.stringify(welcomeDialogState) !== JSON.stringify(originalWelcomeDialogState.value);

    isChatDirty.value =
      isChatFormDirty ||
      isColorWidgetDirty ||
      isLoginFormDirty ||
      isChannelWidgetDirty ||
      isCallToActionDirty ||
      isWelcomeDialogDirty;
  });

  const addChannel = (channel: OtherChannel): void => {
    // Filter out invalid IDs and get valid numeric IDs
    const validIds = channelList.value
      .map((item) => item.index)
      .filter(
        (index) =>
          typeof index === 'number' && !isNaN(index) && index !== null && index !== undefined
      );

    // If no valid IDs exist, start from 1, otherwise get max + 1
    const newId = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;

    const newChannel: NormalizedOtherChannel = {
      index: newId,
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

  const updateChannel = (channelId: number, updatedData: NormalizedOtherChannel): void => {
    const index = channelList.value.findIndex((channel) => channel.index === channelId);
    if (index !== -1 && channelList.value[index]) {
      Object.assign(channelList.value[index], updatedData);
    }
  };

  const populateWelcomeDialogData = () => {
    const defaults = WIDGET_DEFAULTS.WELCOME_DIALOG;

    welcomeDialogState.isWelcomeDialog =
      widgetConfigData.value?.welcomeMessageStatus ?? defaults.isWelcomeDialog;
    welcomeDialogState.brandIconWelcomeDialog =
      widgetConfigData.value?.welcomeBrandIcon ?? defaults.brandIconWelcomeDialog; //=> New Data Widget V5
    welcomeDialogState.firstDescriptionWelcomeDialog =
      widgetConfigData.value?.welcomeGreetingText ?? defaults.firstDescriptionWelcomeDialog; //=> New Data Widget V5
    welcomeDialogState.secondDescriptionWelcomeDialog =
      widgetConfigData.value?.welcomeText ?? defaults.secondDescriptionWelcomeDialog;
    welcomeDialogState.actionDescriptionWelcomeDialog =
      widgetConfigData.value?.welcomeActionDescription ?? defaults.actionDescriptionWelcomeDialog; //=> New Data Widget V5
    welcomeDialogState.actionIconWelcomeDialog =
      widgetConfigData.value?.welcomeActionIcon ?? defaults.actionIconWelcomeDialog; //=> New Data Widget V5
    welcomeDialogState.welcomeTimeout =
      widgetConfigData.value?.welcomeTimeout ?? defaults.welcomeTimeout;
    welcomeDialogState.openAtStart = widgetConfigData.value?.openAtStart ?? defaults.openAtStart;
    welcomeDialogState.isAttentionGrabber =
      widgetConfigData.value?.attentionGrabberStatus ?? defaults.isAttentionGrabber;
    welcomeDialogState.isAttentionGrabberImage =
      widgetConfigData.value?.grabberImage ?? defaults.isAttentionGrabberImage;
    welcomeDialogState.isAttentionGrabberText =
      widgetConfigData.value?.grabberTextStatus ?? defaults.isAttentionGrabberText;
    welcomeDialogState.attentionGrabberText =
      widgetConfigData.value?.attentionGrabberText ?? defaults.attentionGrabberText;
    welcomeDialogState.grabberTimeout =
      widgetConfigData.value?.grabberTimeout ?? defaults.grabberTimeout;
    welcomeDialogState.attentionGrabberImage =
      widgetConfigData.value?.attentionGrabberImage ?? defaults.attentionGrabberImage;

    // Update originalWelcomeDialogState to match the populated state
    originalWelcomeDialogState.value = JSON.parse(JSON.stringify(welcomeDialogState));
  };

  const populateCallToActionData = () => {
    const defaults = WIDGET_DEFAULTS.CALL_TO_ACTION;

    callToActionState.isWithText = widgetConfigData.value?.buttonHasText ?? defaults.isWithText;
    callToActionState.liveChatButtonText =
      widgetConfigData.value?.buttonText ?? defaults.liveChatButtonText;
    //
    callToActionState.isWithIcon = widgetConfigData.value?.buttonHasIcon ?? defaults.isWithIcon;
    callToActionState.iconImage = widgetConfigData.value?.buttonIcon ?? defaults.iconImage;
    //
    callToActionState.borderRadius = widgetConfigData.value?.borderRadius ?? defaults.borderRadius; //=> New Data Widget V5

    // Update originalCallToActionState to match the populated state
    originalCallToActionState.value = JSON.parse(JSON.stringify(callToActionState));
  };

  const populateChannelWidgetData = () => {
    const defaults = WIDGET_DEFAULTS.CHANNEL_WIDGET;
    channelState.isChannelsEnabled =
      widgetConfigData.value?.isChannelWidgetEnabled ?? defaults.isChannelsEnabled;
    channelState.previewTitle =
      widgetConfigData.value?.channel_widget?.title ?? defaults.previewTitle;
    channelState.previewSubtitle =
      widgetConfigData.value?.channel_widget?.subtitle ?? defaults.previewSubtitle;
    //
    channelState.isQiscusLiveChat =
      widgetConfigData.value?.channel_widget?.live_channel.is_enable ?? defaults.isQiscusLiveChat;
    channelState.previewLiveChatName =
      widgetConfigData.value?.channel_widget?.live_channel.name ?? defaults.previewLiveChatName;
    channelState.channelBadgeIcon =
      widgetConfigData.value?.channel_widget?.live_channel.badge_url ?? defaults.channelBadgeIcon;
    //
    channelList.value = normalizeChannelData(
      widgetConfigData.value?.channel_widget?.other_channel ?? []
    );
    //
    channelState.previewIntroduction =
      widgetConfigData.value?.channel_widget?.introduction ?? defaults.previewIntroduction; //=> New Data Widget V5

    // Update originalChannelState to match the populated state
    originalChannelState.value = JSON.parse(JSON.stringify(channelState));
  };

  const populateLoginFormData = () => {
    const defaults = WIDGET_DEFAULTS.LOGIN_FORM;
    loginFormState.firstDescription =
      widgetConfigData.value?.formGreet ?? defaults.firstDescription;
    loginFormState.formSubtitle = widgetConfigData.value?.formSubtitle ?? defaults.formSubtitle;
    loginFormState.buttonText = widgetConfigData.value?.loginFormButtonLabel ?? defaults.buttonText;
    loginFormState.extraFields = widgetConfigData.value?.extra_fields ?? [];
    loginFormState.customerIdentifier =
      widgetConfigData.value?.customerIdentifierInputType ?? defaults.customerIdentifier;

    loginFormState.secondDescription =
      widgetConfigData.value?.formSecondGreet ?? defaults.secondDescription; //=> New Data Widget V5
    loginFormState.brandLogo = widgetConfigData.value?.loginBrandLogo ?? defaults.brandLogo; //=> New Data Widget V5

    // Update originalLoginFormState to match the populated state
    originalLoginFormState.value = JSON.parse(JSON.stringify(loginFormState));
  };

  const populateChatFormData = () => {
    const defaults = WIDGET_DEFAULTS.CHAT_FORM;
    chatFormState.customerServiceName =
      widgetConfigData.value?.customerServiceName ?? defaults.customerServiceName;
    chatFormState.customerServiceAvatar =
      widgetConfigData.value?.customerServiceAvatar ?? defaults.customerServiceAvatar;

    // Update originalChatFormState to match the populated state
    originalChatFormState.value = JSON.parse(JSON.stringify(chatFormState));
  };
  const populateColorWidgetData = () => {
    colorWidgetState.value = widgetConfigData.value?.colorWidget ?? WIDGET_DEFAULTS.COLOR_WIDGET; //=> New Data Widget V5

    // Update originalColorWidgetState to match the populated state
    originalColorWidgetState.value = JSON.parse(JSON.stringify(colorWidgetState.value));
  };

  const getWidgetConfig = async (appId: string, channelId: string) => {
    try {
      // Add check to ensure data is ready
      await fetchConfigWidget(appId, channelId);
      if (widgetConfigData) {
        populateWelcomeDialogData();
        populateCallToActionData();
        populateChannelWidgetData();
        populateLoginFormData();
        populateChatFormData();
        populateColorWidgetData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postWidgetConfig = async (appId: string, channelId: string) => {
    const payload: IWidgetConfigPayload = {
      style: {},
      widget: {
        variables: {
          appID: appId,
          // welcome dialog data test
          welcomeMessageStatus: welcomeDialogState.isWelcomeDialog,
          welcomeBrandIcon: welcomeDialogState.brandIconWelcomeDialog, //=> new data
          welcomeGreetingText: welcomeDialogState.firstDescriptionWelcomeDialog, //=> new data
          welcomeText: welcomeDialogState.secondDescriptionWelcomeDialog,
          welcomeActionIcon: welcomeDialogState.actionIconWelcomeDialog, //=> new data
          welcomeActionDescription: welcomeDialogState.actionDescriptionWelcomeDialog, //=> new data
          welcomeTimeout: welcomeDialogState.welcomeTimeout,
          openAtStart: welcomeDialogState.openAtStart,
          attentionGrabberStatus: welcomeDialogState.isAttentionGrabber,
          grabberImage: welcomeDialogState.isAttentionGrabberImage,
          grabberTextStatus: welcomeDialogState.isAttentionGrabberText,
          attentionGrabberText: welcomeDialogState.attentionGrabberText,
          grabberTimeout: welcomeDialogState.grabberTimeout ?? 0,
          attentionGrabberImage: welcomeDialogState.attentionGrabberImage,

          // login form data
          formGreet: loginFormState.firstDescription,
          formSecondGreet: loginFormState.secondDescription, //=> new data // formSecondGreet
          formSubtitle: loginFormState.formSubtitle,
          loginFormButtonLabel: loginFormState.buttonText, //=> wrong data
          customerIdentifierInputType: loginFormState.customerIdentifier,
          extra_fields: loginFormState.extraFields,
          loginBrandLogo: loginFormState.brandLogo, //=> new data

          // chat form data
          customerServiceName: chatFormState.customerServiceName,
          customerServiceAvatar: chatFormState.customerServiceAvatar || CHANNEL_BADGE_URL.qiscus,

          // call to action data
          buttonHasText: callToActionState.isWithText,
          buttonHasIcon: callToActionState.isWithIcon,
          buttonIcon: callToActionState.iconImage || DEFAULT_IMAGE_PREVIEW.LOGIN_BRAND_ICON,
          buttonText: callToActionState.liveChatButtonText, //= wrong data
          borderRadius: callToActionState.borderRadius, //=> new data

          // channel widget data
          isChannelWidgetEnabled: channelState.isChannelsEnabled,
          channel_widget: {
            title: channelState.previewTitle,
            subtitle: channelState.previewSubtitle,
            introduction: channelState.previewIntroduction, //=> new data
            live_channel: {
              name: channelState.previewLiveChatName,
              is_enable: channelState.isQiscusLiveChat,
              badge_url: channelState.channelBadgeIcon,
            },
            other_channel: channelList.value,
          },
          colorWidget: colorWidgetState.value, //=> new data
          selectedWidgetPage: 'welcome',
        },
      },
    };
    try {
      const { data } = await qiscusApi.postWidgetConfig(channelId, payload);
      if (data) {
        console.log(data, 'data');
      }
      originalChatFormState.value = JSON.parse(JSON.stringify(chatFormState));
      originalColorWidgetState.value = JSON.parse(JSON.stringify(colorWidgetState.value));
      originalLoginFormState.value = JSON.parse(JSON.stringify(loginFormState));
      originalChannelState.value = JSON.parse(JSON.stringify(channelState));
      originalCallToActionState.value = JSON.parse(JSON.stringify(callToActionState));
      originalWelcomeDialogState.value = JSON.parse(JSON.stringify(welcomeDialogState));
      errorPostWidgetConfig.value = null;
    } catch (error) {
      errorPostWidgetConfig.value = error;
      console.error('Error post widget config', error);
    }
  };

  return {
    // state for error post widget config
    errorPostWidgetConfig,
    // state for color widget
    colorWidgetState,
    // state for list channel widget
    channelList,
    // state for channel widget
    channelState,
    // state for call to action
    callToActionState,
    // state for welcome dialog
    welcomeDialogState,
    // state for login form
    loginFormState,
    customerIdentifierOptions,
    fieldTypeOptionsAdditionalField,
    iconsAdditionalField,
    // state for chat form
    chatFormState,
    // Getters
    isChatDirty,

    // Actions
    addChannel,
    removeChannel,
    updateChannel,
    getWidgetConfig,
    postWidgetConfig,
  };
});
