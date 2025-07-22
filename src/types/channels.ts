import type { IAdditionalField } from './live-chat';





export interface IWhatsappChannel {
  allocate_wa_call_webhook_url: string | null;
  badge_url: string;
  base_url: string;
  business_id: string | null;
  business_verification_status: string | null;
  currency: string | null;
  eligible_wa_call: boolean;
  encoded_token: string;
  forward_enabled: boolean;
  forward_url: string | null;
  id: number;
  is_active: boolean;
  is_allocate_wa_call_webhook_enabled: boolean;
  is_auth_international: boolean;
  is_auto_responder_enabled: boolean;
  is_bot_enabled: boolean;
  is_coex: boolean;
  is_mmlite: boolean;
  is_on_cloud: boolean;
  is_postpaid: boolean | null;
  is_ssl_enabled: boolean;
  is_template_optimized: boolean;
  name: string;
  phone_number: string;
  phone_number_id: string | null;
  phone_number_status: string | null;
  platform: string;
  pricing_model: string;
  primary_business_location: string | null;
  read_enabled: boolean;
}

export interface IQiscusChannel {
  id: number;
  is_active: boolean;
  app_code: string;
  name: string;
  badge_url: string | null;
  app_id: number;
  use_channel_responder: boolean;
  is_secure: boolean;
  is_secure_toc: boolean;
  created_at: Date;
  updated_at: Date;
  secret_key: string;
  forward_url: null;
  forward_enabled: boolean;
}

export interface IUpdateQiscusChannel {
  badge_url?: string;
  id: number;
  is_active?: boolean;
  is_secure?: boolean;
  name?: string;
}

export interface ICreateQiscusChannel {
  badge_url: string;
  is_active: boolean;
  is_secure: boolean;
  is_secure_toc: boolean;
  name: string;
}
export interface IAutoResponder {
  is_enabled?: boolean;
  offline_message: string;
  online_message: string;
  send_offline_each_message: boolean;
  send_online_if_resolved: boolean;
}

export interface IWidgetChannel {
  app_code?: string;
  id?: string;
  badge_url: string;
  name: string;
  is_active: boolean;
  is_secure: boolean;
  is_secure_toc: boolean;
  configs: IAutoResponder;
}

export interface IBotChannel {
  bot_webhook_url: string;
  is_bot_enabled: boolean;
  is_force_send_bot: boolean;
}

export interface IUpdateConfig extends IAutoResponder {
  enabled: boolean;
  source: string;
}

export interface IWidgetConfigPayload {
  style: Record<string, any>;
  widget: {
    variables: {
      appID: string;

      // Welcome dialog data
      welcomeMessageStatus: boolean;
      attentionGrabberStatus: boolean;
      welcomeText: string;
      welcomeBrandIcon: string;
      welcomeGreetingText: string;
      welcomeActionDescription: string;
      welcomeActionIcon: string;
      welcomeTimeout: string;
      openAtStart: boolean;
      grabberImage: boolean;
      grabberTextStatus: boolean;
      attentionGrabberText: string;
      grabberTimeout: number;
      attentionGrabberImage: string;

      // Login form data
      formGreet: string;
      formSubtitle: string;
      formSecondGreet: string;
      buttonText: string;
      customerIdentifierInputType: string;
      extra_fields: IAdditionalField[];
      loginBrandLogo: string;

      // Chat form data
      customerServiceName: string;
      customerServiceAvatar: string;

      // Call to action data
      buttonHasText: boolean;
      buttonHasIcon: boolean;
      buttonIcon: string;
      loginFormButtonLabel: string;
      borderRadius: string;

      // Channel widget data
      channel_widget: {
        live_channel: {
          badge_url: string;
          is_enable: boolean;
          name: string;
        };
        introduction: string;
        other_channel: any[];
        subtitle: string;
        title: string;
      };
      isChannelWidgetEnabled: boolean;

      selectedWidgetPage: string;
      colorWidget: string;
    };
  };
}

// ===============> Telegram Channel <===============

export interface IUpdateTelegramChannel {
  name: string;
  is_active: boolean;
  configs: {
    offline_message: string;
    online_message: string;
    send_offline_each_message: boolean;
    send_online_if_resolved: boolean;
  } | null;
}
export interface ICreateTelegramChannel {
  bot_token: string;
  configs: {
    offline_message: string;
    online_message: string;
    send_offline_each_message: boolean;
    send_online_if_resolved: boolean;
  } | null;
}
