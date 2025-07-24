<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Banner } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import ChatFormLoading from '@/components/ui/widget-preview/ChatFormLoading.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import WIdgetFormLayout from './components/layout/WidgetFormLayout.vue';

const { chatFormState } = storeToRefs(useQiscusLiveChatStore());
const { loading, data, error, upload } = useUploadSdkImage();

const uploadImage = async (file: File) => {
  await upload(file);
  if (data.value) {
    chatFormState.value.customerServiceAvatar = data.value.url;
  } else {
    console.error(error.value);
  }
};
</script>

<template>
  <div class="flex w-full flex-col items-start justify-between gap-8 self-stretch lg:flex-row">
    <div class="flex w-full flex-1 flex-col gap-8">
      <WIdgetFormLayout id="widget-form-layout" label="Chat">
        <template #additional-info> </template>
        <template #inputs>
          <ImageInput
            v-model="chatFormState.customerServiceAvatar"
            :isUploading="loading"
            @upload="uploadImage"
            label="Customer Service Avatar"
            id="customer-service-avatar"
            @error="(e) => (error = new Error(e))"
          >
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
          <Input
            v-model="chatFormState.customerServiceName"
            :maxlength="50"
            label="Customer Service Name"
            id="customer-service-name"
          />
        </template>
      </WIdgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6">
      <ChatFormLoading
        :icon="chatFormState.customerServiceAvatar"
        :title="chatFormState.customerServiceName"
      />
      <div class="bg-surface-disable h-16 w-16 rounded-full" />
    </div>
  </div>
</template>
