import { createPinia } from 'pinia';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue';

import '@/assets/css/sweet-alert-custom.css';

import App from './App.vue';
import './assets/css/style.css';
import './assets/css/tailwind.css';
import { createRouter } from './router';
import { useAppConfigStore } from './stores/app-config';
import type { IQiscusAppConfig } from './types/app';

export function createOmnichannelApp(container: string | Element, config: IQiscusAppConfig) {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  if (config) {
    const appConfigStore = useAppConfigStore();
    appConfigStore.setConfig(config);
  }

  // Create router with the provided appId
  const router = createRouter(config.appId);
  app.use(router);

  const mountElement =
    typeof container === 'string' ? document.querySelector(container) : container;
  if (mountElement) {
    app.mount(mountElement);
  }

  return app;
}

// Auto-mount if #app exists (for development)
if (document.querySelector('#app')) {
  createOmnichannelApp('#app', {
    baseUrl: import.meta.env.VITE_BASE_URL,
    userToken: import.meta.env.VITE_QISCUS_USER_TOKEN,
    appId: import.meta.env.VITE_QISCUS_APP_ID,
    appVersion: import.meta.env.VITE_QISCUS_APP_VERSION,
    sdkUserId: import.meta.env.VITE_QISCUS_SDK_USER_ID || '',
    userSdkToken: import.meta.env.VITE_QISCUS_USER_SDK_TOKEN || '',
    widget: {
      iframeUrl: import.meta.env.VITE_IFRAME_URL || import.meta.env.VITE_BASE_URL,
      env: import.meta.env.VITE_WIDGET_ENV || 'production',
    },
    user: {
      id: import.meta.env.VITE_QISCUS_USER_ID,
    },
  });
}
