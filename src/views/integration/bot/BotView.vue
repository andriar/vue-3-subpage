<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue';

import MainTab from '@/components/common/Tabs/MainTab.vue';
import { Banner, Button, CollapsibleGroup, Switch } from '@/components/common/common';
import InputCustom from '@/components/form/InputCustom.vue';
import { BackIcon, CopyIcon, HomeIcon } from '@/components/icons';
import { useFetchBot, useForceSendBot, useIntegrateBot } from '@/composables/channels/bot';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useAppConfigStore } from '@/stores/app-config';
import { useAppDetailStore } from '@/stores/app-detail';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const activeTab = ref<string>('Overview');
const isEnableBot = ref<boolean>(false);
const isEnableBotChat = ref<boolean>(false);

const data = reactive({
  agent_id: '',
  is_enable: false,
  is_enable_chat: false,
  app_id: '',
  secret_key: '',
  bot_url: '',
  webhook_url: '',
});

const items = [
  {
    id: '1',
    title: 'Enable Bot Integration',
    content:
      'Turning on bot integration lets the bot chat smoothly in a room, even if the toggle is off. When you enable this feature, the bot can still send messages, making sure important updates and notifications get through without any breaks.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Enable Bot On Disable Chat',
    content:
      'Allow bot to send messages when the bot toggle button is disabled in a chat room. If you set the toggle to enabled, you allow sending messages from bot to room even though the bot toggle in the room is disabled.',
  },
];

// ---Utility Function ---
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

const bot = useFetchBot();
const appConfig = useAppConfigStore();
const { showAlert } = useSweetAlert();
const { detail } = storeToRefs(useAppDetailStore());
const { integrate, loading: integrateLoading, error: integrateError } = useIntegrateBot();
const { forceSend, error: forceSendError } = useForceSendBot();

// --- Handlers Function ---
const handleSubmit = async () => {
  await integrate({
    bot_webhook_url: data.webhook_url,
    is_bot_enabled: isEnableBot.value,
  });

  if (integrateError.value) {
    showAlert.error({
      title: 'Error',
      text: 'Cannot integrate bot. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    return;
  }

  showAlert.success({
    title: 'Success',
    text: 'Bot has been connected',
    showCancelButton: false,
  });
};
const handleForceSendBot = async (value: boolean) => {
  await forceSend({
    is_force_send_bot: value,
  });

  if (forceSendError.value) {
    showAlert.error({
      title: 'Error',
      text: 'Cannot force send bot. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    return;
  }

  showAlert.success({
    title: 'Success',
    text: `Success ${value ? 'enables' : 'disables'} sending message bot`,
    showCancelButton: false,
  });
  // Only update the state if API call is successful
  isEnableBotChat.value = value;
};

watch(
  () => detail.value,
  (newVal) => {
    data.app_id = newVal.app_code;
    data.secret_key = newVal.secret_key || '';
  },
  { immediate: true }
);

onMounted(async () => {
  await bot.fetch();
  if (bot.error.value) {
    showAlert.error({
      title: 'Error',
      text: `Something went wrong.`,
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  data.agent_id = String(appConfig.userId) || '';

  data.webhook_url = bot.data.value?.bot_webhook_url ?? '';
  data.is_enable = bot.data.value?.is_bot_enabled ?? false;
  data.is_enable_chat = bot.data.value?.is_force_send_bot ?? false;
  data.bot_url = `${appConfig.baseUrl}/${appConfig.appId}/bot`;
});
</script>

<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <div class="flex items-center justify-between">
      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Integration
      </router-link>

      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <div class="flex items-center gap-3">
        <img
          :src="CHANNEL_BADGE_URL.bot"
          alt="Telegram Logo"
          class="h-6 w-6"
          width="24"
          height="24"
        />
        <h2 class="text-xl font-semibold text-[#0A0A0A]">New Integration - Bot</h2>
      </div>

      <Banner>
        <p class="text-sm font-medium text-[#0A0A0A]">
          To learn more regarding Bot Integration, you can check this
          <a
            class="text-notification-link font-semibold underline"
            href="https://documentation.qiscus.com/omnichannel-chat/bot-integration"
            target="_blank"
            >Documentation</a
          >.
        </p>
      </Banner>

      <Banner type="outline">
        <div class="text-sm leading-5 text-[#0A0A0A]">
          <p>
            Setting the Bot Integration will send the bot message to all channels <span
              class="font-semibold text-[#EB5757]"
              >except WhatsApp Channel</span
            >. You must activate the third-party on the WhatsApp channel if you want to use a bot
            system for your WhatsApp channel. To access the auto-responder channel, follow this
            step:
          </p>

          <ul class="mt-4 list-inside list-decimal">
            <li>Go to <span class="font-semibold">Integration Menu</span></li>
            <li>Choose your <span class="font-semibold">WhatsApp Channel</span></li>
            <li>Click <span class="font-semibold">Third-Party Integration</span></li>
            <li>Activate the toggle</li>
          </ul>
        </div>
      </Banner>

      <MainTab :tabs="['Overview', 'Settings']" v-model="activeTab" />

      <transition name="fade">
        <form
          @submit.prevent="handleSubmit"
          v-show="activeTab == 'Overview'"
          class="flex flex-col gap-8"
        >
          <div class="rounded-lg bg-white p-6 shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A]">
            <div>
              <h2 class="text-sm font-semibold text-[#0A0A0A]">Step 1</h2>
              <p class="mt-2 text-xs text-[#A0A0A0]">
                Use this credential to set up Bot Integration.
              </p>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
              <InputCustom v-model="data.agent_id" label="Agent ID" disabled>
                <template #append-button>
                  <button
                    class="text-primary flex cursor-pointer gap-2"
                    @click="copyToClipboard(data.agent_id)"
                  >
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
              <InputCustom v-model="data.app_id" label="App ID" disabled>
                <template #append-button>
                  <button
                    class="text-primary flex cursor-pointer gap-2"
                    @click="copyToClipboard(data.app_id)"
                  >
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
              <InputCustom
                v-model="data.secret_key"
                label="Qiscus Secret Key"
                type="password"
                disabled
              ></InputCustom>
            </div>
          </div>

          <div class="rounded-lg bg-white p-6 shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A]">
            <div>
              <h2 class="text-sm font-semibold text-[#0A0A0A]">Step 2</h2>
              <p class="mt-2 text-xs text-[#A0A0A0]">
                Paste this URL to Bot Platform. This URL is the base url for bot platform needs to
                hit. You can visit HERE to see the specific API and request payload that bot
                platform needs to make. Please note that the base url for this request is in the
                section below.
              </p>
            </div>
            <div class="mt-4">
              <InputCustom v-model="data.bot_url" disabled>
                <template #append-button>
                  <button
                    class="text-primary flex cursor-pointer gap-2"
                    @click="copyToClipboard(data.bot_url)"
                  >
                    Copy
                    <CopyIcon :size="18" />
                  </button>
                </template>
              </InputCustom>
            </div>
          </div>

          <div class="rounded-lg bg-white p-6 shadow-[box-shadow:_0px_4px_12px_0px_#0A0A0A1A]">
            <div>
              <h2 class="text-sm font-semibold text-[#0A0A0A]">Step 3</h2>
              <p class="mt-2 text-xs text-[#A0A0A0]">
                Input bot webhook URL generated by Bot Platform here. This endpoint will get request
                hit by Qiscus Omnichannel Chat. You can visit
                <a
                  class="text-notification-link font-semibold underline"
                  href="https://documentation.qiscus.com/omnichannel-chat/bot-human-collaboration#step-2--webhook-from-qiscus-omnichannel-chat"
                  target="_blank"
                  >HERE</a
                >
                to see how the payload of the request looks like.
              </p>
            </div>

            <div class="mt-4">
              <InputCustom v-model="data.webhook_url"> </InputCustom>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <Button type="submit" :disabled="integrateLoading">Connect</Button>
          </div>
        </form>
      </transition>

      <transition name="fade">
        <CollapsibleGroup :items="items" v-show="activeTab == 'Settings'">
          <template #item-id-1="{ item }">
            <div class="flex justify-between gap-8 text-sm text-[#565656]">
              <div v-html="item.content"></div>
              <div>
                <Switch variant="success" v-model="isEnableBot" size="medium" />
              </div>
            </div>
          </template>
          <template #item-id-2="{ item }">
            <div class="flex justify-between gap-8 text-sm text-[#565656]">
              {{ item.content }}
              <div>
                <Switch
                  variant="success"
                  size="medium"
                  :model-value="isEnableBotChat"
                  @update:model-value="handleForceSendBot"
                />
              </div>
            </div>
          </template>
        </CollapsibleGroup>
      </transition>
    </div>
  </div>
</template>
