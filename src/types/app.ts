import type { IUser } from './user';

export interface IWidgetConfig {
  iframeUrl?: string;
  env: 'production' | 'latest' | 'staging';
}
export interface IQiscusAppConfig {
  baseUrl: string;
  userToken: string;
  appId: string;
  appVersion: string;
  sdkUserId: string;
  userSdkToken: string;
  widget: IWidgetConfig;
  user: IUser;
}
