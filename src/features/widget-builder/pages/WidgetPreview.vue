<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { useAppConfigStore } from '@/stores/app-config';

const props = defineProps<{ channelId: string | number }>();
const { appId, widget, baseUrl } = useAppConfigStore();
const isStaging = widget?.env === 'staging';
const isLatest = widget?.env === 'latest';
const iframeUrl = widget?.iframeUrl || '';

onMounted(() => {
  let configs: {
    options: {
      channel_id: string | number;
      mobileBreakPoint: number;
      extra_fields: never[];
      [key: string]: any;
    };
    staging?: boolean;
  } = {
    options: {
      channel_id: props.channelId,
      mobileBreakPoint: 400,
      extra_fields: [],
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
<template>
  <div></div>
</template>
