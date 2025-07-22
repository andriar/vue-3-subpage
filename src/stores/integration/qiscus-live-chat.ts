import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';



import { qiscusApi } from '@/api/channels';
import type { IconName } from '@/components/icons/Icon.vue';
import type {
  IWidgetChannel,
  WidgetChannelCreateData,
  WidgetChannelUpdateData,
} from '@/features/widget-builder/channels/channels';
import type { IWidgetConfigPayload } from '@/types/channels';
import type {
  ICallToActionState,
  IChatFormState,
  ILoginFormState,
  IWelcomeDialogState,
  IWidgetVariables,
} from '@/types/live-chat';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  const channelList = ref<IWidgetChannel[]>([]);

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
  const addChannel = (channel: WidgetChannelCreateData): void => {
    const newId = Math.max(...channelList.value.map((item) => item.id), 0) + 1;
    const newChannel: IWidgetChannel = {
      id: newId,
      ...channel,
    };
    channelList.value.push(newChannel);
  };

  const removeChannel = (channelId: number) => {
    const index = channelList.value.findIndex((channel) => channel.id === channelId);
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  const updateChannel = (channelId: number, updatedData: WidgetChannelUpdateData): void => {
    const index = channelList.value.findIndex((channel) => channel.id === channelId);
    if (index !== -1 && channelList.value[index]) {
      Object.assign(channelList.value[index], updatedData);
    }
  };

  const getWidgetConfig = async (appId: string, channelId: string) => {
    try {
      const { data } = await qiscusApi.getWidgetConfig(appId, channelId);
      if (data) {
        const widget: IWidgetVariables = data.data.widget.variables;
        // set state welcome dialog
        welcomeDialogState.isWelcomeDialog = widget.welcomeMessageStatus;
        welcomeDialogState.brandIconWelcomeDialog =
          widget.welcomeBrandIcon ?? welcomeDialogState.brandIconWelcomeDialog;
        welcomeDialogState.firstDescriptionWelcomeDialog =
          widget.welcomeGreetingText ?? welcomeDialogState.firstDescriptionWelcomeDialog;
        welcomeDialogState.secondDescriptionWelcomeDialog = widget.welcomeText;
        welcomeDialogState.actionDescriptionWelcomeDialog =
          widget.welcomeActionDescription ?? welcomeDialogState.actionDescriptionWelcomeDialog;
        welcomeDialogState.actionIconWelcomeDialog =
          widget.welcomeActionIcon ?? welcomeDialogState.actionIconWelcomeDialog;
        welcomeDialogState.welcomeTimeout = widget.welcomeTimeout;
        welcomeDialogState.openAtStart = widget.openAtStart;
        welcomeDialogState.isAttentionGrabber = widget.attentionGrabberStatus;
        welcomeDialogState.isAttentionGrabberImage = widget.grabberImage;
        welcomeDialogState.isAttentionGrabberText = widget.grabberTextStatus;
        welcomeDialogState.attentionGrabberText = widget.attentionGrabberText;
        welcomeDialogState.grabberTimeout = widget.grabberTimeout;
        welcomeDialogState.attentionGrabberImage = widget.attentionGrabberImage;

        // set state call to action
        callToActionState.isWithText = widget.buttonHasText;
        callToActionState.liveChatButtonText = widget.loginFormButtonLabel;
        //
        callToActionState.isWithIcon = widget.buttonHasIcon;
        callToActionState.iconImage = widget.buttonIcon;
        //
        callToActionState.borderRadius = widget.borderRadius;

        // set state channel widget
        channelState.isChannelsEnabled = widget.isChannelWidgetEnabled;
        channelState.previewTitle = widget.channel_widget.title;
        channelState.previewSubtitle = widget.channel_widget.subtitle;
        channelState.previewIntroduction = widget.channel_widget.introduction;
        //
        channelState.isQiscusLiveChat = widget.channel_widget.live_channel.is_enable;
        channelState.previewLiveChatName = widget.channel_widget.live_channel.name;
        channelState.channelBadgeIcon = widget.channel_widget.live_channel.badge_url || '';
        //
        channelList.value = widget.channel_widget.other_channel;

        // set state login form
        loginFormState.brandLogo = widget.loginBrandLogo ?? loginFormState.brandLogo;
        loginFormState.firstDescription = widget.formGreet;
        loginFormState.secondDescription = widget.formSecondGreet;
        loginFormState.formSubtitle = widget.formSubtitle;
        loginFormState.buttonText = widget.buttonText;
        loginFormState.customerIdentifier = widget.customerIdentifierInputType;
        loginFormState.extraFields = widget.extra_fields ?? [];

        // set state chat form
        chatFormState.customerServiceName = widget.customerServiceName;
        chatFormState.customerServiceAvatar = widget.customerServiceAvatar;

        // set state color
        colorWidgetState.value = widget.colorWidget;
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
