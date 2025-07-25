<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

const { appId, widget, baseUrl } = useAppConfigStore();
const { loginFormState } = useQiscusLiveChatStore();
const isStaging = widget?.env === 'staging';
const isLatest = widget?.env === 'latest';
const iframeUrl = widget?.iframeUrl || '';

const getPathSegment = (indexFromEnd: number = 1): string => {
  const pathname: string = window.location.pathname;
  const pathSegments: string[] = pathname.split('/').filter((segment) => segment !== '');
  const actualIndex: number = pathSegments.length - indexFromEnd;
  return pathSegments[actualIndex] || '';
};

const channelId: string = getPathSegment(2);

onMounted(() => {
  let configs: {
    options: {
      channel_id: string | number;
      mobileBreakPoint: number;
      extra_fields: string;
      [key: string]: any;
    };
    staging?: boolean;
  } = {
    options: {
      channel_id: channelId,
      mobileBreakPoint: 400,
      extra_fields: JSON.stringify(loginFormState.extraFields),
    },
  };

  if (isStaging) {
    configs.staging = true;
  }

  if (isLatest) {
    configs.options.appVersion = 'latest';
  }

  if (baseUrl) configs.options.baseUrl = baseUrl;
  if (iframeUrl) configs.options.qismoIframeUrl = iframeUrl;

  // Check if the script already exists
  const qismoScriptSrc = `${baseUrl}/js/qismo-v5.js`;

  // Create a new script element
  const script = document.createElement('script');
  script.src = qismoScriptSrc;
  script.async = true; // Always load asynchronously

  script.onload = () => {
    // @ts-ignore
    const Qismo = window.Qismo;
    if (Qismo) {
      try {
        new Qismo(appId, configs);
      } catch (e) {
        console.error('Error initializing Qismo:', e);
      }
    } else {
      console.error('Qismo object (window.Qismo) not found after script loaded.');
    }
  };

  script.onerror = () => {
    console.error('Failed to load Qismo script from:', qismoScriptSrc);
  };

  // Append the new script to the head
  document.head.appendChild(script);
});

onUnmounted(() => {
  const qismoScriptSrc = `${baseUrl}/js/qismo-v5.js`;
  const qismoStyleLink = `${baseUrl}/css/qismo-v5.css`;
  const existingScript = document.querySelector(`script[src="${qismoScriptSrc}"]`);
  const existingStyleLink = document.querySelector(`link[href="${qismoStyleLink}"]`);
  existingScript?.remove();
  existingStyleLink?.remove();
});
</script>
<template></template>
