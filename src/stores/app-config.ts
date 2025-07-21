import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { IQiscusAppConfig, IWidgetConfig } from '@/types/app';
import type { IUser } from '@/types/user';
import { initUser } from '@/utils/constant/user';

export const useAppConfigStore = defineStore('app', () => {
  // State
  const baseUrl = ref<string>('');
  const userToken = ref<string>('');
  const appId = ref<string>('');
  const appVersion = ref<string>('');
  const sdkUserId = ref<string>('');
  const userSdkToken = ref<string>('');
  const widget = ref<IWidgetConfig | null>(null);
  const user = ref<IUser>({ ...initUser });
  const userId = ref<number | null>(null);

  // Getters
  const isConfigured = () => {
    return !!(userToken.value && appId.value && appVersion.value);
  };

  const getHeaders = () => {
    return {
      Authorization: userToken.value,
      APP_ID: appId.value,
      'Qiscus-App-Id': appId.value,
      'App-Version': appVersion.value,
    };
  };

  const getHeadersSdk = () => {
    return {
      qiscus_sdk_app_id: appId.value,
      qiscus_sdk_user_id: sdkUserId.value,
      qiscus_sdk_token: userSdkToken.value,
    };
  };

  // Actions
  const setConfig = (config: IQiscusAppConfig) => {
    baseUrl.value = config.baseUrl;
    userToken.value = config.userToken;
    appId.value = config.appId;
    appVersion.value = config.appVersion;
    sdkUserId.value = config.sdkUserId;
    userSdkToken.value = config.userSdkToken;
    widget.value = config.widget || null;
    user.value = config.user || { ...initUser };
  };

  const clearConfig = () => {
    userToken.value = '';
    appId.value = '';
    appVersion.value = '';
    sdkUserId.value = '';
    userSdkToken.value = '';
  };

  return {
    // State
    userToken,
    appId,
    appVersion,
    userId,
    baseUrl,
    widget,

    // Getters
    isConfigured,
    getHeaders,
    getHeadersSdk,

    // Actions
    setConfig,
    clearConfig,
  };
});