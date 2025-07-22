<template>
  <div class="flex flex-col gap-8">
    <WidgetBannerDoc />

    <div class="flex flex-col items-start justify-center gap-8 rounded-xl border border-gray-300 bg-gray-200 p-6">
      <p class="text-xs text-gray-800">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex w-full lg:w-140 flex-col gap-2">
        <div class="flex items-center gap-5">
          <ImageInput id="widget-image" v-model="formData.badge_url" @error="(e) => (errorImageMessages = e)"
            :isUploading="uSdkImage.loading.value" @upload="uploadImage" autocomplete="off" />
          <div class="flex flex-1 flex-col items-start gap-1">
            <h4 class="text-sm font-semibold text-text-subtitle">Channel Badge Icon</h4>
            <p class="text-xs text-gray-800">
              We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG,
              or PNG format with a maximum size of 2MB.
            </p>
          </div>
        </div>
        <Banner v-if="errorImageMessages" intent="negative" size="small">
          <p>
            {{ errorImageMessages }}
          </p>
        </Banner>
      </div>

      <div class="w-full lg:w-[552px]">
        <Input v-model="formData.name" :disabled="false" :error="false" errorMessage="This field has an error"
          id="default-input" label="Channel Name" placeholder="Enter your channel name here" />
      </div>
    </div>

    <!-- Term Section -->
    <div class="shadow-medium flex flex-col items-start justify-center gap-4 rounded-lg bg-white p-6">
      <div class="flex flex-col items-start gap-2 text-sm">
        <h5 class="font-semibold text-black-700">Term of condition</h5>
        <p class="text-gray-800">
          By creating a new Qiscus Live Chat, you agree and acknowledge that the Enhance
          Conversation Security feature is automatically enabled. Customers will not be able to see
          the conversation history if they use a different device or browser, and this might impact
          your total Monthly Active Users (MAU). You can disable this feature through the Settings
          menu on each Qiscus Live Chat channel.
        </p>
      </div>

      <Banner intent="positive" class="text-sm leading-5 font-medium text-black-700">
        This feature becomes accessible starting from Qiscus Omnichannel iOS v1.2.3, Qiscus
        Omnichannel Android v1.2.3, Qiscus Chat SDK Flutter v1.2.3, and Qiscus Chat SDK React Native
        v1.2.3.
      </Banner>

      <Checkbox id="agree-term-checkbox" label="Agree with the term of condition" v-model="formData.is_secure_toc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Checkbox from '@/components/common/Checkbox.vue';
import { Banner } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import type { IWidgetChannel } from '@/types/channels';

import WidgetBannerDoc from '../ui/WidgetBannerDoc.vue';

// declare
const uSdkImage = useUploadSdkImage();
const { showAlert } = useSweetAlert();

const props = withDefaults(defineProps<{ modelValue: IWidgetChannel }>(), {
  modelValue: () => ({
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
  }),
});

const emit = defineEmits(['update:modelValue']);

const errorImageMessages = ref<string>('');

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: IWidgetChannel) {
    emit('update:modelValue', newValue);
  },
});

async function uploadImage(file: File) {
  await uSdkImage.upload(file);

  if (uSdkImage.error.value) {
    console.error('Error uploading image:', uSdkImage.error.value);

    return showAlert.error({
      title: 'Upload Failed',
      text: 'Failed to upload image. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  formData.value.badge_url = uSdkImage.data.value?.url || '';
  errorImageMessages.value = '';
}
</script>
