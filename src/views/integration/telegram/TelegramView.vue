<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import Banner from '@/components/common/Banner.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { Button, Image, Switch } from '@/components/common/common';
import { BackIcon, HomeIcon } from '@/components/icons';
import {
  useCreateTelegram,
  useDeleteTelegram,
  useFetchTelegram,
  useUpdateTelegram,
} from '@/composables/channels/telegram';
import { useFetchConfig } from '@/composables/channels/useFetchConfigChannel';
import { useUpdateConfig } from '@/composables/channels/useUpdateConfigChannel';
import { useSweetAlert } from '@/composables/useSweetAlert';
import CreateTelegramForm from '@/features/telegram/components/form/CreateTelegramForm.vue';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import type { IAutoResponder, IUpdateTelegramChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const { showAlert } = useSweetAlert();
const {
  update: updateConfig,
  loading: updateConfigLoading,
  error: updateConfigError,
} = useUpdateConfig();
const { fetchTelegram, data: telegramData } = useFetchTelegram();
const { fetch: fetchConfig, data: configData } = useFetchConfig();
const { deleteTelegram, loading: deleteTelegramLoading } = useDeleteTelegram();
const {
  createTelegram,
  loading: createTelegramLoading,
  error: createTelegramError,
} = useCreateTelegram();
const {
  updateTelegram,
  loading: updateTelegramLoading,
  error: updateTelegramError,
} = useUpdateTelegram();

// --- Computed Properties ---
const isConfigEmpty = computed(() => !hasConfigValues());
const currentChannel = computed(() => telegramData.value[0] || null);
const isUserCreateChannel = computed(() => !channel.value.name && !channel.value.username);

// --- Reactive State ---
const isEnableTelegram = ref(false);
const isEnableAutoResponder = ref(false);
const isAutoresponderFormOpen = ref(false);
const activeTab = ref<string>('Overview');
const isBot = ref(false);
const channel = ref({
  username: '',
  name: '',
  token: '',
  configs: {
    offline_message: '',
    online_message: '',
    send_offline_each_message: false,
    send_online_if_resolved: false,
  },
});
const configs = ref<IAutoResponder>({ ...channel.value.configs });

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

// --- UI State Change Functions ---
const openAutoResponderForm = () => (isAutoresponderFormOpen.value = true);
const closeAutoResponderForm = () => (isAutoresponderFormOpen.value = false);

// --- Utility Functions ---
function hasConfigValues(): boolean {
  return (
    configs.value.offline_message.trim() !== '' ||
    configs.value.online_message.trim() !== '' ||
    configs.value.send_offline_each_message === true ||
    configs.value.send_online_if_resolved === true
  );
}

// --- Data Reset Functions ---
function resetChannelData() {
  channel.value = {
    username: '',
    name: '',
    token: '',
    configs: {
      offline_message: '',
      online_message: '',
      send_offline_each_message: false,
      send_online_if_resolved: false,
    },
  };

  isEnableTelegram.value = false;
  // isEnableAutoResponder.value = false;
}

// --- Data Population Functions ---
function populateChannelData() {
  if (currentChannel.value) {
    // Map the fetched telegram data to the channel ref structure
    channel.value = {
      username: currentChannel.value.username || '',
      name: currentChannel.value.name || '',
      token: currentChannel.value.bot_token || '',
      configs: {
        offline_message: '',
        online_message: '',
        send_offline_each_message: false,
        send_online_if_resolved: false,
      },
    };

    // Set the integration status based on fetched data
    isEnableTelegram.value = currentChannel.value.is_active || false;
  } else {
    // Reset form values when no channel exists (empty response)
    resetChannelData();
  }
}
function populateConfigData() {
  if (configData.value) {
    configs.value.offline_message = configData.value.offline_message || '';
    configs.value.online_message = configData.value.online_message || '';
    configs.value.send_offline_each_message = configData.value.send_offline_each_message || false;
    configs.value.send_online_if_resolved = configData.value.send_online_if_resolved || false;

    isEnableAutoResponder.value = configData.value.is_enabled || false;
  }
}

// --- API Interaction Functions ---
async function createTelegramChannel() {
  const payload = {
    bot_token: channel.value.token,
    configs: hasConfigValues()
      ? {
        offline_message: configs.value.offline_message,
        online_message: configs.value.online_message,
        send_online_if_resolved: configs.value.send_online_if_resolved,
        send_offline_each_message: configs.value.send_offline_each_message,
      }
      : null,
  };

  await createTelegram(payload);

  // --- Handle error ---
  if (createTelegramError.value) {
    showAlert.error({
      title: 'Error',
      text: 'Failed to create Telegram channel. Please try again.',
      showCancelButton: false,
      confirmButtonText: 'Okay',
    });
    return;
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    text: 'Successfully add new channel',
    showCancelButton: false,
    confirmButtonText: 'Okay',
  });

  await fetchTelegram();
  populateChannelData();

  closeAutoResponderForm();
}

async function updateTelegramChannel() {
  const payload: IUpdateTelegramChannel = {
    name: channel.value.name,
    is_active: isEnableTelegram.value,
    configs: hasConfigValues()
      ? {
        offline_message: configs.value.offline_message,
        online_message: configs.value.online_message,
        send_online_if_resolved: configs.value.send_online_if_resolved,
        send_offline_each_message: configs.value.send_offline_each_message,
      }
      : null,
  };

  await updateTelegram(currentChannel.value?.id, payload);

  // --- Handle error ---
  if (updateTelegramError.value) {
    showAlert.error({
      title: 'Error',
      text: 'Failed to update Telegram. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    return;
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    text: 'Telegram has been updated.',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}

async function deleteTelegramChannel() {
  await deleteTelegram(currentChannel.value?.id);
  showAlert.success({
    title: 'Success',
    text: 'Delete channel has been succeeded.',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });

  await fetchTelegram();
  populateChannelData();
}

async function updateAutoResponder() {
  await updateConfig(currentChannel.value?.id || '', {
    ...configs.value,
    enabled: isEnableAutoResponder.value,
    source: 'telegram',
  });

  // --- Handle error ---
  if (updateConfigError.value) {
    return showAlert.error({
      title: 'Error',
      text: 'Failed to update channel auto responder. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    text: 'Successfully changes channel auto responder.',
    showCancelButton: false,
  });
}

// --- Handlers Function---
function handleCreateChannel() {
  showAlert
    .warning({
      title: 'Add Channel Auto Responder',
      text: 'Do you want to set up channel auto <br>responder to this channel?',
      confirmButtonText: 'Add Channel Auto Responder',
      cancelButtonText: 'Setup Later',
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        openAutoResponderForm(); // Call UI state change function
      } else if (result.dismiss === 'cancel') {
        createTelegramChannel();
      }
    });
}

function handleUpdateChannel() {
  updateTelegramChannel();
}

function handleDeleteChannel() {
  showAlert
    .warning({
      title: 'Delete Channel',
      text: 'This channel will disappear from the Integration menu if you delete it. In addition, all ongoing conversations associated with this channel will be deleted for all agents',
      confirmButtonText: 'Let me think again',
      cancelButtonText: 'Yes, delete it!',
    })
    .then((result: any) => {
      if (result.dismiss === 'cancel') {
        deleteTelegramChannel();
      }
    });
}

function handleUpdateAutoResponder() {
  showAlert
    .warning({
      title: 'Edit channel auto responder',
      text: 'Content in channel auto responder will be change?',
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Let me think again',
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        updateAutoResponder();
      }
    });
}

async function toggleTelegramIntegration(status: boolean) {
  const payload: IUpdateTelegramChannel = {
    name: channel.value.name,
    is_active: status,
    configs: hasConfigValues()
      ? {
        offline_message: configs.value.offline_message,
        online_message: configs.value.online_message,
        send_online_if_resolved: configs.value.send_online_if_resolved,
        send_offline_each_message: configs.value.send_offline_each_message,
      }
      : null,
  };

  await updateTelegram(currentChannel.value?.id, payload);

  // --- Handle error ---
  if (updateTelegramError.value) {
    showAlert.error({
      title: 'Error',
      text: 'Failed to update Telegram. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    return;
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    text: `Success ${status ? 'activating' : 'deactivating'} channel`,
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });

  isEnableTelegram.value = status;
}

async function toggleAutoResponder(status: boolean) {
  await updateConfig(currentChannel.value?.id || '', {
    ...configs.value,
    enabled: status,
    source: 'telegram',
  });

  // --- Handle error ---
  if (updateConfigError.value) {
    return showAlert.error({
      title: 'Error',
      text: 'Failed to update channel auto responder. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  // --- Handle success ---
  showAlert.success({
    title: 'Success',
    text: 'Successfully changes channel auto responder.',
    showCancelButton: false,
  });

  // Only update the state if API call is successful
  isEnableAutoResponder.value = status;
}

onMounted(async () => {
  await fetchTelegram();
  // get additional data
  await fetchConfig(currentChannel.value?.id || '', 'telegram');

  // Populate the channel data after fetching
  populateChannelData();
  populateConfigData();
});
</script>

<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <div class="flex items-center justify-between">
      <router-link to="/" id="route-integration" replace class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Integration
      </router-link>

      <router-link to="/" id="route-back-integration" replace
        class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <div class="flex items-center gap-3">
        <Image :src="CHANNEL_BADGE_URL.telegram" alt="Telegram Logo" class="h-6 w-6" :width="24" :height="24" />
        <h2 class="text-xl font-semibold text-black-700">Telegram</h2>
      </div>

      <Banner>
        <p class="text-sm font-medium text-black-700">
          To integrate the Qiscus Omnichannel Chat with Telegram, you can check this
          <a class="text-notification-link font-semibold underline"
            href="https://documentation.qiscus.com/omnichannel-chat/application#telegram"
            target="_blank">Documentation</a>.
        </p>
      </Banner>

      <template v-if="!isAutoresponderFormOpen">
        <MainTab :tabs="['Overview', 'Settings']" v-model="activeTab" />

        <template v-if="activeTab == 'Settings'">
          <CollapsibleGroup :items="items">
            <template #item-id-1="{ item }">
              <div class="flex justify-between gap-8 text-sm text-text-subtitle">
                <div v-html="item.content"></div>
                <div>
                  <Switch id="enable-telegram-switch" variant="success" :model-value="isEnableTelegram"
                    @update:model-value="toggleTelegramIntegration" size="medium" />
                </div>
              </div>
            </template>
            <template #item-id-2="{ item }">
              <div class="flex justify-between gap-8 text-sm text-text-subtitle">
                {{ item.content }}
                <div>
                  <Switch id="enable-autoresponder-switch" variant="success" size="medium"
                    :modelValue="isEnableAutoResponder" @update:modelValue="toggleAutoResponder" />
                </div>
              </div>
              <Button id="open-autoresponder-btn" intent="secondary" class="mt-4" @click="openAutoResponderForm">Set
                Channel Auto Responder</Button>
            </template>
          </CollapsibleGroup>
        </template>

        <template v-if="activeTab == 'Overview'">
          <form id="create-telegram-form" v-if="!isAutoresponderFormOpen" @submit.prevent=""
            class="flex flex-col gap-8">
            <CreateTelegramForm v-model="channel" />

            <div v-if="isUserCreateChannel" class="flex justify-end gap-4">
              <Button id="next-btn" type="submit" @click="handleCreateChannel"
                :disabled="createTelegramLoading || !channel.token">Next</Button>
            </div>

            <div v-else class="flex justify-between">
              <Button id="delete-btn" intent="danger" @click="handleDeleteChannel"
                :disabled="deleteTelegramLoading">Delete
                Channel</Button>
              <Button id="submit-btn" type="submit" @click="handleUpdateChannel" :disabled="updateTelegramLoading">Save
                Changes</Button>
            </div>
          </form>
        </template>
      </template>

      <template v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button id="close-autoresponder-btn" intent="secondary" @click="closeAutoResponderForm">Back</Button>
          <Button id="submit-autoresponder-btn" type="submit"
            @click="isUserCreateChannel ? createTelegramChannel() : handleUpdateAutoResponder()"
            :disabled="isConfigEmpty || createTelegramLoading || updateConfigLoading">
            Save Changes
          </Button>
        </div>
      </template>
    </div>
  </div>
</template>
