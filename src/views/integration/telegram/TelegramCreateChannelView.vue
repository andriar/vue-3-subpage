<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import { Button, Switch } from '@/components/common/common';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { BackIcon, HomeIcon } from '@/components/icons';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { onMounted, ref } from 'vue';
import CreateTelegramForm from '@/features/telegram/components/form/CreateTelegramForm.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import type { IAutoResponder } from '@/types/channels';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useRouter } from 'vue-router';

const { showAlert } = useSweetAlert();
const router = useRouter()

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
})
const configs = ref<IAutoResponder>({ ...channel.value.configs })
const isEnableTelegram = ref(false)
const isEnableAutoResponder = ref(false)

const isAutoresponderFormOpen = ref(false);

const items = [
  {
    id: '1',
    title: 'Enable Telegram Integration',
    content:
      "Enabling Telegram Integration allows the bot to communicate seamlessly in a chat room, even if the feature is turned off. When activated, the bot can still send messages, ensuring that key updates and notifications are delivered without interruption.",
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
  },
]

function handleOpenAutoResponderForm() {
  isAutoresponderFormOpen.value = true
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false
}

function confirmSubmit() {
  showAlert
    .warning({
      title: 'Add Channel Auto Responder',
      text: 'Do you want to set up channel auto <br>responder to this channel?',
      confirmButtonText: 'Add Channel Auto Responder',
      cancelButtonText: 'Setup Later',
    })
    .then((result: any) => {
      console.log('result', result);
      if (result.isConfirmed) {
        isAutoresponderFormOpen.value = true;
      } else if (result.dismiss === 'cancel') {
        handleSubmit();
      }
    });
}

function handleSubmit() {
  return showAlert.success({
    title: 'Success',
    text: 'Failed to create Telegram channel. Please try again.',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}

onMounted(() => {
  // fetched
  router.replace({
    'name': 'telegram-create'
  })
})
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
      <!-- Header -->
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
              <div class="flex justify-between gap-8 text-text-subtitle text-sm">
                <div v-html="item.content"></div>
                <div>
                  <Switch id="enable-channel-switch" variant="success" v-model="isEnableTelegram" size="medium" />
                </div>
              </div>
            </template>
            <template #item-id-2="{ item }">
              <div class="flex justify-between gap-8 text-text-subtitle text-sm">
                {{ item.content }}
                <div>
                  <Switch id="enable-telegram-switch" variant="success" size="medium" v-model="isEnableAutoResponder" />
                </div>
              </div>
              <Button id="open-autoresponder-btn" intent="secondary" class="mt-4"
                @click="handleOpenAutoResponderForm">Set Channel Auto
                Responder</Button>
            </template>
          </CollapsibleGroup>
        </template>

        <template v-if="activeTab == 'Overview'">
          <!-- Form section -->
          <form v-if="!isAutoresponderFormOpen" @submit.prevent="confirmSubmit" class="flex flex-col gap-8">
            <CreateTelegramForm v-model="channel" />

            <div class="mt-8 flex justify-end gap-4">
              <!-- <Button intent="secondary" to="/" replace>Back</Button> -->
              <Button id="next-btn" type="submit">Next</Button>
            </div>

            <div class="mt-8 flex justify-between">
              <Button id="delete-btn" intent="danger">Delete Channel</Button>
              <Button id="submit-btn" type="submit">Save Changes</Button>
            </div>
          </form>
        </template>
      </template>


      <form @submit.prevent="" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button id="cancel-autoresponder-btn" intent="secondary" @click="handleCancelAutoResponder">Back</Button>
          <Button id="submit-autoresponder-btn" type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template>
