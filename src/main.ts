import { createPinia } from 'pinia';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue';



import '@/assets/css/sweet-alert-custom.css';



import App from './App.vue';
import './assets/css/style.css';
import './assets/css/tailwind.css';
import { createRouter } from './router';
import { useAppConfigStore } from './stores/app-config';
import { useAuthStore } from './stores/auth';
import type { IQiscusAppConfig } from './types/app';





export function createOmnichannelApp(container: string | Element, config: IQiscusAppConfig) {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  if (config) {
    const appConfigStore = useAppConfigStore();
    appConfigStore.setConfig(config);

    const authStore = useAuthStore();
    authStore.setUser(config.user);
  }

  // Create router with the provided appId
  const router = createRouter(config.appConfig.app_code);
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
    appConfig: import.meta.env.VITE_QISCUS_APP
      ? (() => {
          try {
            return JSON.parse(import.meta.env.VITE_QISCUS_APP);
          } catch (e) {
            console.error('Failed to parse VITE_QISCUS_APP:', e);
            return null;
          }
        })()
      : null,
    widget: {
      iframeUrl: import.meta.env.VITE_IFRAME_URL || import.meta.env.VITE_BASE_URL,
      env: import.meta.env.VITE_WIDGET_ENV || 'production',
    },
    user: import.meta.env.VITE_QISCUS_USER
      ? (() => {
          try {
            return JSON.parse(import.meta.env.VITE_QISCUS_USER);
          } catch (e) {
            console.error('Failed to parse VITE_QISCUS_USER', e);
            return null;
          }
        })()
      : null,
    sdkUser: import.meta.env.VITE_QISCUS_SDKUSER
      ? (() => {
          try {
            return JSON.parse(import.meta.env.VITE_QISCUS_SDKUSER);
          } catch (e) {
            console.error('Failed to parse VITE_QISCUS_SDKUSER', e);
            return null;
          }
        })()
      : null,
  });
}