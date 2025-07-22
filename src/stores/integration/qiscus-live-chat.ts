import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';



import { qiscusApi } from '@/api/channels';
import type { IconName } from '@/components/icons/Icon.vue';
import { useFetchConfigWidgetQiscus } from '@/composables/channels/qiscus/widget/useFetchConfigWidget';
import type { IWidgetConfigPayload } from '@/types/channels';
import type { ICallToActionState, IChatFormState, ILoginFormState, IWelcomeDialogState } from '@/types/live-chat';
import type { NormalizedOtherChannel, OtherChannel } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';





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
  const channelList = ref<NormalizedOtherChannel[]>([]);

  const colorWidgetState = ref<string>('#01416C');
  const errorPostWidgetConfig = ref<any>();

  // state for Channel Widget
  const channelState = reactive({
    isChannelsEnabled: false,
    isQiscusLiveChat: true,
    previewTitle: 'Ask for Question',
    previewSubtitle: 'In Everythings!',
    previewIntroduction: 'More personalized chat with us on:',
    previewLiveChatName: 'Live Chat',
    channelName: '',
    channelLink: '',
    channelBadgeIcon: '',
  });

  // state for call to action
  const callToActionState = reactive<ICallToActionState>({
    isWithText: true,
    isWithIcon: true,
    liveChatButtonText: 'Talk To Us',
    iconImage: '',
    borderRadius: '32',
  });
  // state for welcome dialog
  const welcomeDialogState = reactive<IWelcomeDialogState>({
    isWelcomeDialog: true,
    isAttentionGrabber: false,
    firstDescriptionWelcomeDialog: 'Hello There,',
    secondDescriptionWelcomeDialog: 'Welcome to Qiscus!',
    actionDescriptionWelcomeDialog: 'Ask for Questions',
    actionIconWelcomeDialog: '',
    welcomeTimeout: '',
    openAtStart: false,
    isAttentionGrabberImage: true,
    isAttentionGrabberText: true,
    attentionGrabberText: 'Hello, there is Promo!',
    grabberTimeout: null,
    attentionGrabberImage: DEFAULT_IMAGE_PREVIEW.ATTENTION_GRABBER_IMAGE,
    brandIconWelcomeDialog: '',
  });
  // state for login form
  const loginFormState = reactive<ILoginFormState>({
    brandLogo: '',
    firstDescription: 'Hello There,',
    secondDescription: 'Welcome to Qiscus',
    formSubtitle: 'Please fill the details below before chatting with us!',
    buttonText: 'Start Chat',
    customerIdentifier: 'email',
    extraFields: [],
  });

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
  // state for chat form
  const chatFormState = reactive<IChatFormState>({
    customerServiceName: 'Qiscus Customer Care',
    customerServiceAvatar: '',
  });

  // GETTERS

  // ACTIONS
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
    welcomeDialogState.isWelcomeDialog = widgetConfigData.value?.welcomeMessageStatus ?? false;
    welcomeDialogState.brandIconWelcomeDialog = widgetConfigData.value?.welcomeBrandIcon ?? ''; //=> New Data Widget V5
    welcomeDialogState.firstDescriptionWelcomeDialog =
      widgetConfigData.value?.welcomeGreetingText ?? ''; //=> New Data Widget V5
    welcomeDialogState.secondDescriptionWelcomeDialog = widgetConfigData.value?.welcomeText ?? '';
    welcomeDialogState.actionDescriptionWelcomeDialog =
      widgetConfigData.value?.welcomeActionDescription ?? ''; //=> New Data Widget V5
    welcomeDialogState.actionIconWelcomeDialog = widgetConfigData.value?.welcomeActionIcon ?? ''; //=> New Data Widget V5
    welcomeDialogState.welcomeTimeout = widgetConfigData.value?.welcomeTimeout ?? '';
    welcomeDialogState.openAtStart = widgetConfigData.value?.openAtStart ?? false;
    welcomeDialogState.isAttentionGrabber = widgetConfigData.value?.attentionGrabberStatus ?? false;
    welcomeDialogState.isAttentionGrabberImage = widgetConfigData.value?.grabberImage ?? false;
    welcomeDialogState.isAttentionGrabberText = widgetConfigData.value?.grabberTextStatus ?? false;
    welcomeDialogState.attentionGrabberText = widgetConfigData.value?.attentionGrabberText ?? '';
    welcomeDialogState.grabberTimeout = widgetConfigData.value?.grabberTimeout ?? null;
    welcomeDialogState.attentionGrabberImage = widgetConfigData.value?.attentionGrabberImage ?? '';
  };

  const populateCallToActionData = () => {
    callToActionState.isWithText = widgetConfigData.value?.buttonHasText ?? false;
    callToActionState.liveChatButtonText = widgetConfigData.value?.loginFormButtonLabel ?? '';
    //
    callToActionState.isWithIcon = widgetConfigData.value?.buttonHasIcon ?? false;
    callToActionState.iconImage = widgetConfigData.value?.buttonIcon ?? '';
    //
    callToActionState.borderRadius = widgetConfigData.value?.borderRadius ?? ''; //=> New Data Widget V5
  };

  const populateChannelWidgetData = () => {
    channelState.isChannelsEnabled = widgetConfigData.value?.isChannelWidgetEnabled ?? false;
    channelState.previewTitle = widgetConfigData.value?.channel_widget?.title ?? '';
    channelState.previewSubtitle = widgetConfigData.value?.channel_widget?.subtitle ?? '';
    //
    channelState.isQiscusLiveChat =
      widgetConfigData.value?.channel_widget?.live_channel?.is_enable ?? false;
    channelState.previewLiveChatName =
      widgetConfigData.value?.channel_widget?.live_channel?.name ?? '';
    channelState.channelBadgeIcon =
      widgetConfigData.value?.channel_widget?.live_channel?.badge_url ?? '';
    //
    channelList.value = normalizeChannelData(
      widgetConfigData.value?.channel_widget?.other_channel ?? []
    );
    //
    channelState.previewIntroduction = widgetConfigData.value?.channel_widget?.introduction ?? ''; //=> New Data Widget V5
  };

  const populateLoginFormData = () => {
    loginFormState.firstDescription = widgetConfigData.value?.formGreet ?? '';
    loginFormState.formSubtitle = widgetConfigData.value?.formSubtitle ?? '';
    loginFormState.buttonText = widgetConfigData.value?.buttonText ?? '';
    loginFormState.extraFields = widgetConfigData.value?.extra_fields ?? [];
    loginFormState.customerIdentifier = widgetConfigData.value?.customerIdentifierInputType ?? '';

    loginFormState.secondDescription = widgetConfigData.value?.formSecondGreet ?? ''; //=> New Data Widget V5
    loginFormState.brandLogo = widgetConfigData.value?.loginBrandLogo ?? ''; //=> New Data Widget V5
  };

  const populateChatFormData = () => {
    chatFormState.customerServiceName = widgetConfigData.value?.customerServiceName ?? '';
    chatFormState.customerServiceAvatar = widgetConfigData.value?.customerServiceAvatar ?? '';
  };
  const populateColorWidgetData = () => {
    colorWidgetState.value = widgetConfigData.value?.colorWidget ?? ''; //=> New Data Widget V5
  };

  const getWidgetConfig = async (appId: string, channelId: string) => {
    try {
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
          // welcome dialog data
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
          buttonText: loginFormState.buttonText,
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
          loginFormButtonLabel: callToActionState.liveChatButtonText,
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
    console.log(payload, 'payload');
    try {
      const { data } = await qiscusApi.postWidgetConfig(channelId, payload);
      if (data) {
        console.log(data, 'data');
      }
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

    // Actions
    addChannel,
    removeChannel,
    updateChannel,
    getWidgetConfig,
    postWidgetConfig,
  };
});