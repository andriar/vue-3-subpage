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
  
  // API Base URLs computed properties
  const apiBaseUrlV1 = computed(() => appConfig.value.apiBaseUrlV1 || import.meta.env.VITE_API_BASE_URL_V1 || '');
  const apiBaseUrlV2 = computed(() => appConfig.value.apiBaseUrlV2 || import.meta.env.VITE_API_BASE_URL_V2 || '');
  const apiBaseUrlV3 = computed(() => appConfig.value.apiBaseUrlV3 || import.meta.env.VITE_API_BASE_URL_V3 || '');

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
    
    // Refresh axios instances when config changes (lazy import to avoid circular dependency)
    if (typeof window !== 'undefined') {
      // Use setTimeout to ensure this runs after the current call stack
      setTimeout(() => {
        import('../utils/axios').then(({ refreshAxiosInstances }) => {
          refreshAxiosInstances();
        }).catch(() => {
          // Silently ignore errors if axios module is not available yet
        });
      }, 0);
    }
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

    // API Base URLs
    apiBaseUrlV1,
    apiBaseUrlV2,
    apiBaseUrlV3,

    // Getters
    isConfigured,
    getHeaders,
    getHeadersSdk,

    // Actions
    setConfig,
    clearConfig,
  };
});