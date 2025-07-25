import { defineStore } from 'pinia';
import { computed, ref } from 'vue';



import type { IAppConfig, IQiscusAppConfig, IWidgetConfig } from '@/types/app';
import type { ISdkUser, IUser } from '@/types/user';
import { initAppConfig } from '@/utils/constant/app-config';
import { initSdkUser, initUser } from '@/utils/constant/user';





export const useAppConfigStore = defineStore('app', () => {
  // State
  const widget = ref<IWidgetConfig | null>(null);
  const user = ref<IUser>({ ...initUser });
  const appConfig = ref<IAppConfig>({ ...initAppConfig });
  const sdkUser = ref<ISdkUser>({ ...initSdkUser });

  // Computed properties for backward compatibility
  const userToken = computed(() => user.value.authentication_token);
  const appId = computed(() => appConfig.value.app_code);
  const appVersion = computed(() => appConfig.value.appVersion);
  const baseUrl = computed(() => appConfig.value.baseUrl);
  const userId = computed(() => user.value.id);
  const sdkUserId = computed(() => sdkUser.value.id);
  const userSdkToken = computed(() => sdkUser.value.token);

  // Getters
  const isConfigured = () => {
    return !!(
      user.value.authentication_token &&
      appConfig.value.app_code &&
      appConfig.value.appVersion
    );
  };

  const getHeaders = () => {
    return {
      Authorization: user.value.authentication_token,
      APP_ID: appConfig.value.app_code,
      'Qiscus-App-Id': appConfig.value.app_code,
      'App-Version': appConfig.value.appVersion,
    };
  };

  const getHeadersSdk = () => {
    return {
      qiscus_sdk_app_id: appConfig.value.app_code,
      qiscus_sdk_user_id: sdkUser.value.id.toString(),
      qiscus_sdk_token: sdkUser.value.token,
    };
  };

  // Actions
  const setConfig = (config: IQiscusAppConfig) => {
    widget.value = config.widget ?? null;
    user.value = { ...initUser, ...config.user };
    appConfig.value = { ...initAppConfig, ...config.appConfig };
    sdkUser.value = { ...initSdkUser, ...config.sdkUser };
  };

  const clearConfig = () => {
    appConfig.value = { ...initAppConfig };
    sdkUser.value = { ...initSdkUser };
    user.value = { ...initUser };
    widget.value = null;
  };

  return {
    // State
    appConfig,
    sdkUser,
    user,
    widget,

    // Computed properties for backward compatibility
    userToken,
    appId,
    appVersion,
    userId,
    baseUrl,
    sdkUserId,
    userSdkToken,

    // Getters
    isConfigured,
    getHeaders,
    getHeadersSdk,

    // Actions
    setConfig,
    clearConfig,
  };
});