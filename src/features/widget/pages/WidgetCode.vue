<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import CodeSnippet from '../components/forms/CodeSnippet.vue';

// params.channelId as a props on router
const props = defineProps<{
  channelId: string | number;
}>();

const { appId, widget, baseUrl } = useAppConfigStore();
const { loginFormState } = useQiscusLiveChatStore();
const isStaging = widget?.env === 'staging';
const isLatest = widget?.env === 'latest';
const iframeUrl = widget?.iframeUrl || '';

const jsCode = `
      document.addEventListener('DOMContentLoaded', function () {
        var s, t; s = document.createElement('script'); s.type = 'text/javascript';
        s.src = '${baseUrl}/js/qismo-v5.js'; s.async = true;
        s.onload = s.onreadystatechange = function () {
          new Qismo('${appId}', {
            options: {
              channel_id: ${props.channelId},
              mobileBreakPoint: 400,
              extra_fields: ${JSON.stringify(loginFormState.extraFields)},
              ${baseUrl ? `baseUrl: '${baseUrl}',` : ''}
              ${iframeUrl ? `qismoIframeUrl: '${iframeUrl}',` : ''}
              ${isLatest ? `appVersion: 'latest',` : ''}
            },
            ${isStaging ? `staging: true,` : ''}
          });
        }
        t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s, t);
      })
  `;
</script>

<template>
  <div class="flex flex-col gap-8">
    <Banner intent="positive" type="outline">
      <div>
        Copy the code below and paste it into the &lt;script&gt; tag of your website to install the
        Qiscus Live Chat.
      </div>
    </Banner>

    <CodeSnippet :code="jsCode" language="javascript" show-line-numbers />
  </div>
</template>
