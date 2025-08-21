import type { ISdkUser, IUser } from './user';





export interface IWidgetConfig {
  iframeUrl?: string;
  env: 'production' | 'latest' | 'staging';
}
export interface IQiscusAppConfig {
  appConfig: IAppConfig;
  widget: IWidgetConfig;
  user: IUser;
  sdkUser: ISdkUser;
}
export interface IAppConfig {
  appVersion: string;
  baseUrl: string;
  app_code: string;
  name: string;
  bot_webhook_url: string;
  is_bot_enabled: boolean;
  is_allocate_agent_webhook_enabled: boolean;
  allocate_agent_webhook_url: string;
  mark_as_resolved_webhook_url: string;
  is_mark_as_resolved_webhook_enabled: boolean;
  is_active: boolean;
  is_sessional: boolean;
  is_agent_allocation_enabled: boolean;
  is_agent_takeover_enabled: boolean;
  use_latest: boolean;
  is_bulk_assignment_enabled: boolean;
  // API Base URLs for different versions
  apiBaseUrlV1?: string;
  apiBaseUrlV2?: string;
  apiBaseUrlV3?: string;
  // custom color
  customColor?: string;
}