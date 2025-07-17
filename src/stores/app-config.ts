import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AppConfig {
  baseUrl: string;
  userToken: string;
  appId: string;
  appVersion: string;
  sdkUserId: string;
  userSdkToken: string;
  user: {
    id: number;
  };
}

export const useAppConfigStore = defineStore('app', () => {
  // State
  const userToken = ref<string>('');
  const appId = ref<string>('');
  const baseUrl = ref<string>('');
  const appVersion = ref<string>('');
  const sdkUserId = ref<string>('');
  const userSdkToken = ref<string>('');
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
  const setConfig = (config: AppConfig) => {
    userToken.value = config.userToken;
    appId.value = config.appId;
    appVersion.value = config.appVersion;
    sdkUserId.value = config.sdkUserId;
    userSdkToken.value = config.userSdkToken;
    userId.value = config.user.id;
    baseUrl.value = config.baseUrl;
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

    // Getters
    isConfigured,
    getHeaders,
    getHeadersSdk,

    // Actions
    setConfig,
    clearConfig,
  };
});
