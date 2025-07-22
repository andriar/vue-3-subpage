<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Button, Image } from '@/components/common/common';
import { BackIcon, HomeIcon } from '@/components/icons';
import { useCreateQiscus } from '@/composables/channels/qiscus';
import { useSweetAlert } from '@/composables/useSweetAlert';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import CreateWidgetForm from '@/features/widget/components/forms/CreateWidgetForm.vue';
import type { IWidgetChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const { showAlert } = useSweetAlert();
const router = useRouter();
const uQiscus = useCreateQiscus();

const isBot = ref(false);
const isAutoresponderFormOpen = ref(false);

const channel = ref<IWidgetChannel>({
  badge_url: '',
  name: '',
  is_active: true,
  is_secure: true,
  is_secure_toc: false,
  configs: {
    offline_message: '',
    online_message: '',
    send_offline_each_message: false,
    send_online_if_resolved: false,
  },
});

// Add computed property for form validation
const isFormValid = computed(() => {
  return channel.value.name.trim() !== '' && channel.value.is_secure_toc === true;
});

function confirmSubmit(payload: any) {
  channel.value = {
    ...channel.value,
    ...payload,
  };

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

async function handleSubmit() {
  isAutoresponderFormOpen.value = false;

  const payload: any = { ...channel.value };

  // Add fallback for badge_url if empty or null
  if (!payload.badge_url || payload.badge_url.trim() === '') {
    payload.badge_url = CHANNEL_BADGE_URL.qiscus;
  }

  if (payload.configs.offline_message === '' && payload.configs.online_message === '') {
    delete payload.configs;
  }

  await uQiscus.create(payload);

  if (uQiscus.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to create Qiscus channel. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  // await postWidgetConfig(appId, uQiscus.data.value?.id as unknown as string);

  // if (errorPostWidgetConfig.value) {
  //   console.log(errorPostWidgetConfig.value, 'errorPostWidgetConfig');

  //   return showAlert.error({
  //     title: 'Failed',
  //     text: 'Failed to post widget config. Please try again.',
  //     confirmButtonText: 'Okay',
  //     showCancelButton: false,
  //   });
  // }

  // if success post widget config, redirect to detail page
  router.replace({ name: 'qiscus-detail', params: { id: uQiscus.data.value?.id } });
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false;
}
</script>

<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <div class="flex items-center justify-between">
      <router-link to="/qiscus" replace class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Qiscus Live Chat List
      </router-link>

      <router-link to="/" id="route-integration" replace class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <Image
          :src="CHANNEL_BADGE_URL.qiscus"
          alt="Qiscus Logo"
          class="h-6 w-6"
          :width="24"
          :height="24"
        />
        <h2 class="text-black-700 text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
      </div>

      <!-- Form section -->
      <form @submit.prevent="confirmSubmit" v-if="!isAutoresponderFormOpen">
        <CreateWidgetForm v-model="channel" />

        <div class="mt-8 flex justify-end gap-4">
          <Button id="back-btn" intent="secondary" to="/qiscus" replace>Back</Button>
          <Button id="next-btn" type="submit" :disabled="!isFormValid">Next</Button>
        </div>
      </form>

      <form @submit.prevent="handleSubmit" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="channel.configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button id="close-autoresponder-btn" intent="secondary" @click="handleCancelAutoResponder">Back</Button>
          <Button id="submit-autoresponder-btn" type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template>
