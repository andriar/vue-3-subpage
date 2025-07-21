<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { nextTick, watch } from 'vue';

import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import CallToAction from '@/components/ui/widget-preview/CallToAction.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import OptionalInput from './components/form/OptionalInput.vue';
import WidgetFormLayout from './components/layout/WidgetFormLayout.vue';

const { callToActionState } = storeToRefs(useQiscusLiveChatStore());
const { loading, data, error, upload } = useUploadSdkImage();
const { showAlert } = useSweetAlert();

// Previous values to track changes
let previousIsWithText = callToActionState.value.isWithText;
let previousIsWithIcon = callToActionState.value.isWithIcon;

const uploadImage = async (file: File) => {
  await upload(file);
  if (data.value) {
    callToActionState.value.iconImage = data.value.url;
  } else {
    console.error(error.value);
  }
};

/**
 * Validates that at least one of isWithText or isWithIcon is enabled
 * If both are disabled, shows alert and reverts the change
 */
const validateCallToActionSettings = (changedProperty: 'isWithText' | 'isWithIcon') => {
  const { isWithText, isWithIcon } = callToActionState.value;

  // If both are disabled, show alert and revert the change
  if (!isWithText && !isWithIcon) {
    showAlert.error({
      title: 'The setting cannot be disabled.',
      text: 'You need to activate at least one additional setting before you can disable the Call to Action Button.',
      confirmButtonText: 'OK',
      showCancelButton: false,
    });

    // Revert the change based on which property was modified
    nextTick(() => {
      if (changedProperty === 'isWithText') {
        callToActionState.value.isWithText = previousIsWithText;
      } else {
        callToActionState.value.isWithIcon = previousIsWithIcon;
      }
    });

    return;
  }

  // Update previous values if validation passes
  previousIsWithText = isWithText;
  previousIsWithIcon = isWithIcon;
};

// Watch for changes in isWithText
watch(
  () => callToActionState.value.isWithText,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      validateCallToActionSettings('isWithText');
    }
  }
);

// Watch for changes in isWithIcon
watch(
  () => callToActionState.value.isWithIcon,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      validateCallToActionSettings('isWithIcon');
    }
  }
);
</script>

<template>
  <div class="flex flex-col lg:flex-row w-full items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Call to Action Button">
        <template #additional-info> </template>

        <template #inputs>
          <OptionalInput id="with-text-switch" label="With Text" v-model="callToActionState.isWithText">
            <Input id="live-chat-button-text" v-model="callToActionState.liveChatButtonText" class="w-full"
              label="Live Chat Button Text" placeholder="Talk to us" :maxlength="50" />
          </OptionalInput>

          <OptionalInput id="icon-on-cta" label="Icon on Call to Action" v-model="callToActionState.isWithIcon">
            <ImageInput label="Icon Image" id="icon-image" v-model="callToActionState.iconImage" :isUploading="loading"
              @upload="uploadImage">
              <template #tips>
                <div class="text-sm font-normal text-gray-800">
                  We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                  JPEG, or PNG format with a maximum size of 2MB.
                </div>
              </template>
            </ImageInput>
          </OptionalInput>

          <InputCustom errorMessage="Something went wrong." id="border-radius-input" label="Border Radius"
            v-model="callToActionState.borderRadius" placeholder="Type your radius border, ex: 16 or 32" type="number"
            :maxlength="50" :min="0">
            <template #append-button="{ disabled }">
              <div :class="{ 'cursor-not-allowed opacity-50': disabled }">
                <span>Pixels</span>
              </div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- Preview Section -->
    <div class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6">
      <WelcomingPageLoading />

      <!-- CTA Preview -->
      <CallToAction :imageUrl="callToActionState.iconImage" :title="callToActionState.liveChatButtonText"
        :isUsingTitle="callToActionState.isWithText" :isUsingIcon="callToActionState.isWithIcon"
        :rounded="Number(callToActionState.borderRadius)" />
    </div>
  </div>
</template>
