import { DEFAULT_IMAGE_PREVIEW } from './images';

// Default values untuk widget configuration
export const WIDGET_DEFAULTS = {
  WELCOME_DIALOG: {
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
  },
  CALL_TO_ACTION: {
    isWithText: true,
    isWithIcon: true,
    liveChatButtonText: 'Talk To Us',
    iconImage: '',
    borderRadius: '32',
  },
  LOGIN_FORM: {
    brandLogo: '',
    firstDescription: 'Hello There,',
    secondDescription: 'Welcome to Qiscus',
    formSubtitle: 'Please fill the details below before chatting with us!',
    buttonText: 'Start Chat',
    customerIdentifier: 'email',
    extraFields: [],
  },
  CHAT_FORM: {
    customerServiceName: 'Qiscus Customer Care',
    customerServiceAvatar: '',
  },
  CHANNEL_WIDGET: {
    isChannelsEnabled: false,
    isQiscusLiveChat: true,
    previewTitle: 'Ask for Question',
    previewSubtitle: 'In Everythings!',
    previewIntroduction: 'More personalized chat with us on:',
    previewLiveChatName: 'Live Chat',
    channelName: '',
    channelLink: '',
    channelBadgeIcon: '',
  },
  COLOR_WIDGET: '#01416C',
};
