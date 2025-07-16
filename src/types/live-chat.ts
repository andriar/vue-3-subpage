export interface IWidgetVariables {
  appID: string;
  attentionGrabberImage: string;
  attentionGrabberStatus: boolean;
  attentionGrabberText: string;
  buttonHasIcon: boolean;
  buttonHasText: boolean;
  buttonIcon: string;
  buttonText: string;
  channel_widget: {
    live_channel: {
      badge_url?: string;
      is_enable: boolean;
      name: string;
    };
    other_channel: any[];
    subtitle: string;
    title: string;
  };
  customerIdentifierInputType: string;
  customerServiceAvatar: string;
  customerServiceName: string;
  extra_fields: IAdditionalField[];
  formGreet: string;
  formSubtitle: string;
  grabberImage: boolean;
  grabberTextStatus: boolean;
  grabberTimeout: number;
  isChannelWidgetEnabled: boolean;
  loginFormButtonLabel: string;
  openAtStart: boolean;
  selectedWidgetPage: string;
  welcomeMessageStatus: boolean;
  welcomeText: string;
  welcomeTimeout: string;
  welcomeBrandIcon: string;
  welcomeGreetingText: string;
  welcomeActionDescription: string;
  welcomeActionIcon: string;
  loginSecondDescription: string;
  loginBrandLogo: string;
}

export interface IWidgetConfigResponse {
  style: any;
  widget: {
    variables: IWidgetVariables;
  };
}
export interface IAdditionalField {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  iconField?: string;
  options?: string[];
}

export interface ILoginFormState {
  brandLogo: string;
  firstDescription: string; //formGreet
  secondDescription: string;
  formSubtitle: string; //formSubtitle
  buttonText: string; //buttonText
  customerIdentifier: string; //customerIdentifierInputType
  extraFields: IAdditionalField[]; //extra_fields
}

export interface IChatFormState {
  customerServiceName: string; //customerServiceName
  customerServiceAvatar: string; //customerServiceAvatar
}

export interface IWelcomeDialogState {
  isWelcomeDialog: boolean; //welcomeDialogStatus
  isAttentionGrabber: boolean; //attentionGrabberStatus
  firstDescriptionWelcomeDialog: string; //welcomeText
  secondDescriptionWelcomeDialog: string;
  actionDescriptionWelcomeDialog: string;
  actionIconWelcomeDialog: string;
  welcomeTimeout: string; //welcomeTimeout
  openAtStart: boolean; //openAtStart
  isAttentionGrabberImage: boolean; //grabberImage
  isAttentionGrabberText: boolean; //grabberTextStatus
  attentionGrabberText: string; //attentionGrabberText
  grabberTimeout: number | null; //grabberTimeout
  attentionGrabberImage: string; //attentionGrabberImage
  brandIconWelcomeDialog: string;
}
export interface ICallToActionState {
  isWithText: boolean;
  isWithIcon: boolean;
  liveChatButtonText: string;
  iconImage: string;
  borderRadius: string;
}
