<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import WidgetFormLayout from '@/features/widget-builder/components/layout/WidgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import { Banner } from '@/components/common/common';
import ChannelListCard from './components/ChannelListCard.vue';
import PreviewChannels from './components/PreviewChannels.vue';

// --- Store & Composable ---
const { showAlert } = useSweetAlert();
const { loading, data, error, upload } = useUploadSdkImage();
const { channelState, channelList } = storeToRefs(useQiscusLiveChatStore());

// Validates if the Live Chat toggle can be disabled
const canDisableLiveChat = computed(() => {
  return channelList.value.length > 0;
});

// Handles the toggle state change for Qiscus Live Chat
const handleQiscusLiveChatToggle = async (newValue: boolean): Promise<void> => {
  // If trying to disable (newValue is false) and channelList is empty
  if (!newValue && !canDisableLiveChat.value) {
    await showAlert.error({
      title: 'Channel cannot be disabled.',
      text: 'You need to activate at least one additional channel before you can disable the Live Chat Widget.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
    return;
  }
  // If validation passes, update the store value
  channelState.value.isQiscusLiveChat = newValue;
};

const uploadImage = async (file: File) => {
  await upload(file);
  if (data.value) {
    channelState.value.channelBadgeIcon = data.value.url;
  } else {
    console.error(error.value);
  }
};
</script>

<template>
  <div class="flex w-full flex-col lg:flex-row items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout id="channels-switch" label="Channels" isSwitch v-model="channelState.isChannelsEnabled">
        <template #inputs>
          <Input id="welcome-channel-title" v-model="channelState.previewTitle" class="w-full"
            label="Welcome Channel Title" placeholder="Ask for Question" :maxlength="50" />

          <Input id="welcome-channel-subtitle" v-model="channelState.previewSubtitle" class="w-full"
            label="Welcome Channel Subtitle" placeholder="In Everythings!" :maxlength="50" />
          <TextArea id="channel-introduction" v-model="channelState.previewIntroduction" label="Channel Introduction"
            placeholder="More personalized chat with us on:" :maxlength="50" />
        </template>
      </WidgetFormLayout>

      <WidgetFormLayout v-if="channelState.isChannelsEnabled" label="Enable Qiscus Live Chat" isSwitch
        :model-value="channelState.isQiscusLiveChat" @update:model-value="handleQiscusLiveChatToggle"
        id="qiscus-live-chat-switch">
        <template #inputs>
          <Input v-model="channelState.previewLiveChatName" class="w-full" label="Live Chat Name"
            placeholder="Live Chat" :maxlength="50" id="live-chat-name" />

          <ImageInput label="Live Chat Badge" id="live-chat-badge" v-model="channelState.channelBadgeIcon"
            :isUploading="loading" @upload="uploadImage" @error="(e) => (error = new Error(e))">
            <template #tips>
              <div class="text-sm font-normal text-gray-800">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
            <template #alert>
              <Banner v-if="error" intent="negative" size="small">
                <p>
                  {{ error }}
                </p>
              </Banner>
            </template>
          </ImageInput>
        </template>
      </WidgetFormLayout>

      <ChannelListCard v-if="channelState.isChannelsEnabled" />
    </div>

    <!-- Preview Section -->
    <div class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6">
      <PreviewChannels />
    </div>
  </div>
</template>
