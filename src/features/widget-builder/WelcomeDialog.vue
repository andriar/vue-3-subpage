<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import DragDropInput from '@/components/form/DragDropInput.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import TextArea from '@/components/form/TextArea.vue';
import { WarningIcon } from '@/components/icons';
import AttentionGrabber from '@/components/ui/widget-preview/AttentionGrabber.vue';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import WidgetFormLayout from '@/features/widget-builder/components/layout/WidgetFormLayout.vue';
import { useWelcomeDialogueStore } from '@/stores/integration/widget-builder/welcome-dialogue';
import { DEFAULT_IMAGE_PREVIEW } from '@/utils/constant/images';

import OptionalInput from './components/form/OptionalInput.vue';

// File upload constants
const FILE_SIZE_LIMITS = {
  IMAGE_STANDARD: 2 * 1024 * 1024, // 2MB
  IMAGE_LARGE: 10 * 1024 * 1024, // 10MB
  IMAGE_EXTRA_LARGE: 30 * 1024 * 1024, // 30MB
} as const;

const ACCEPTED_IMAGE_TYPES = {
  COMMON: '.png,.jpg,.jpeg',
  PNG_JPG: '.png,.jpg',
} as const;

const { state: welcomeDialogState } = storeToRefs(useWelcomeDialogueStore());
const brandIconUpload = useUploadSdkImage();
const actionIconUpload = useUploadSdkImage();
const attentionGrabberImageUpload = useUploadSdkImage();

const uploaderInstance = {
  brandIcon: brandIconUpload,
  actionIcon: actionIconUpload,
  attentionGrabberImage: attentionGrabberImageUpload,
} as const;

const handleImageUpload = async (file: File, target: keyof typeof uploaderInstance) => {
  const uploader = uploaderInstance[target];

  await uploader.upload(file);
  if (uploader.data.value) {
    const targetHandlers = {
      brandIcon: () => (welcomeDialogState.value.brandIconWelcomeDialog = uploader.data.value!.url),
      actionIcon: () =>
        (welcomeDialogState.value.actionIconWelcomeDialog = uploader.data.value!.url),
      attentionGrabberImage: () =>
        (welcomeDialogState.value.attentionGrabberImage = uploader.data.value!.url),
    } as const;

    const handler = targetHandlers[target];
    if (handler) {
      handler();
    } else {
      console.error('Invalid target:', target);
    }
  }
};

const welcomeDialog = computed({
  get: () => welcomeDialogState.value.isWelcomeDialog,
  set: (value: boolean) => {
    welcomeDialogState.value.isWelcomeDialog = value;
    // If welcome dialog is turned on, turn off attention grabber
    if (value) {
      welcomeDialogState.value.isAttentionGrabber = false;
    }
  },
});

const attentionGrabber = computed({
  get: () => welcomeDialogState.value.isAttentionGrabber,
  set: (value: boolean) => {
    welcomeDialogState.value.isAttentionGrabber = value;
    // If attention grabber is turned on, turn off welcome dialog
    if (value) {
      welcomeDialogState.value.isWelcomeDialog = false;
    }
  },
});

// Ensure first action always exists
const firstAction = computed(() => {
  const action = [
    {
      label: welcomeDialogState.value.actionDescriptionWelcomeDialog,
      iconUrl:
        welcomeDialogState.value.actionIconWelcomeDialog ||
        DEFAULT_IMAGE_PREVIEW.WELCOME_ACTION_ICON,
    },
  ];
  return action;
});

// Convert between string and number for input binding
const grabberTimeoutString = computed({
  get: () => welcomeDialogState.value.grabberTimeout?.toString() ?? '',
  set: (value: string) => {
    welcomeDialogState.value.grabberTimeout = parseInt(value) || 0;
  },
});

/**
 * Watcher to automatically enable both text and image options when attention grabber is turned on
 * This ensures that when user turns on isAttentionGrabber, both isAttentionGrabberText and
 * isAttentionGrabberImage will automatically be enabled
 */
watch(
  () => welcomeDialogState.value.isAttentionGrabber,
  (isAttentionGrabberEnabled) => {
    // If attention grabber is turned on, enable both text and image options
    if (isAttentionGrabberEnabled) {
      welcomeDialogState.value.isAttentionGrabberText = true;
      welcomeDialogState.value.isAttentionGrabberImage = true;
    }
  },
  { immediate: false }
);

/**
 * Watcher to automatically turn off attention grabber when both text and image options are disabled
 * This ensures that if user turns off both isAttentionGrabberText and isAttentionGrabberImage,
 * the main attention grabber toggle will automatically be turned off as well
 */
watch(
  [
    () => welcomeDialogState.value.isAttentionGrabberText,
    () => welcomeDialogState.value.isAttentionGrabberImage,
  ],
  ([isTextEnabled, isImageEnabled]) => {
    // If both text and image are disabled, turn off the main attention grabber
    if (!isTextEnabled && !isImageEnabled && welcomeDialogState.value.isAttentionGrabber) {
      welcomeDialogState.value.isAttentionGrabber = false;
    }
  },
  { immediate: false }
);
</script>

<template>
  <div class="flex w-full flex-col items-start justify-between gap-8 self-stretch lg:flex-row">
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout
        id="welcome-dialog"
        label="Welcome Dialogue"
        v-model="welcomeDialog"
        isSwitch
      >
        <template #inputs>
          <ImageInput
            label="Brand Icon"
            id="welcome-dialog-image"
            v-model="welcomeDialogState.brandIconWelcomeDialog"
            :isUploading="brandIconUpload.loading.value"
            @upload="(file) => handleImageUpload(file, 'brandIcon')"
            @error="(e) => (brandIconUpload.error.value = new Error(e))"
          >
            <template #tips>
              <div class="text-sm font-normal text-gray-800">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
            <template #alert>
              <Banner v-if="brandIconUpload.error.value" intent="negative" size="small">
                <p>
                  {{ brandIconUpload.error.value }}
                </p>
              </Banner>
            </template>
          </ImageInput>
          <TextArea
            id="first-desc-welcome"
            v-model="welcomeDialogState.firstDescriptionWelcomeDialog"
            label="Greeting Title"
            :maxlength="50"
          />
          <TextArea
            id="second-desc-welcome"
            v-model="welcomeDialogState.secondDescriptionWelcomeDialog"
            label="Welcome Message"
            :maxlength="50"
          />
          <ImageInput
            v-model="welcomeDialogState.actionIconWelcomeDialog"
            label="Icon"
            id="action-icon"
            :isUploading="actionIconUpload.loading.value"
            @upload="(file) => handleImageUpload(file, 'actionIcon')"
            @error="(e) => (actionIconUpload.error.value = new Error(e))"
          >
            <template #tips>
              <div class="text-sm font-normal text-gray-800">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
            <template #alert>
              <Banner v-if="actionIconUpload.error.value" intent="negative" size="small">
                <p>
                  {{ actionIconUpload.error.value }}
                </p>
              </Banner>
            </template>
          </ImageInput>
          <Input
            id="action-welcome"
            v-model="welcomeDialogState.actionDescriptionWelcomeDialog"
            label="Description"
            :maxlength="50"
          />
          <InputCustom
            id="webhook-url-input"
            v-model="welcomeDialogState.welcomeTimeout"
            label="Appear Delay"
            :maxlength="50"
            type="number"
            placeholder="0"
          >
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
          <Checkbox
            id="auto-expand-checkbox"
            v-model="welcomeDialogState.openAtStart"
            label="Make Auto Expand"
          />
        </template>
      </WidgetFormLayout>

      <WidgetFormLayout
        id="attention-grabber"
        label="Attention Grabber"
        v-model="attentionGrabber"
        isSwitch
      >
        <template #additional-info>
          <Banner intent="warning" type="solid">
            <div class="flex items-center gap-4">
              <WarningIcon :size="24" class="text-negative-400" />
              <span class="text-text-title text-sm font-normal">
                Welcome dialog won't be rendered if attention grabber is active
              </span>
            </div>
          </Banner>
        </template>
        <template #inputs>
          <OptionalInput
            id="attention-image-switch"
            label="Image"
            v-model="welcomeDialogState.isAttentionGrabberImage"
          >
            <DragDropInput
              acceptText="PNG or JPG"
              :accept="ACCEPTED_IMAGE_TYPES.PNG_JPG"
              :maxSize="FILE_SIZE_LIMITS.IMAGE_EXTRA_LARGE"
              :maxFiles="1"
              :isUploading="attentionGrabberImageUpload.loading.value"
              @upload="(files) => files[0] && handleImageUpload(files[0], 'attentionGrabberImage')"
              @error="(e) => (attentionGrabberImageUpload.error.value = new Error(e))"
            />
            <Banner
              v-if="attentionGrabberImageUpload.error.value"
              intent="negative"
              size="small"
              class="mt-2"
            >
              <p>
                {{ attentionGrabberImageUpload.error.value }}
              </p>
            </Banner>
          </OptionalInput>
          <OptionalInput
            id="attention-grabber-switch"
            label="Text"
            v-model="welcomeDialogState.isAttentionGrabberText"
          >
            <TextArea
              id="attention-grabber-text"
              v-model="welcomeDialogState.attentionGrabberText"
              label="Text Description"
              :maxlength="50"
            />
          </OptionalInput>
          <InputCustom
            id="grabber-timeout"
            v-model="grabberTimeoutString"
            label="Appear Delay"
            :maxlength="50"
            type="number"
            placeholder="0"
          >
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div
      v-if="welcomeDialogState.isWelcomeDialog"
      class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6"
    >
      <WelcomingPage
        :title="welcomeDialogState.firstDescriptionWelcomeDialog"
        :subtitle="welcomeDialogState.secondDescriptionWelcomeDialog"
        :imageUrl="welcomeDialogState.brandIconWelcomeDialog"
        :actions="firstAction"
      />
      <div class="bg-surface-disable h-16 w-16 rounded-full" />
    </div>

    <div
      v-else-if="welcomeDialogState.isAttentionGrabber"
      class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6"
    >
      <AttentionGrabber
        :isImageEnable="welcomeDialogState.isAttentionGrabberImage"
        :isTextEnable="welcomeDialogState.isAttentionGrabberText"
        :imageUrl="welcomeDialogState.attentionGrabberImage"
        :title="welcomeDialogState.attentionGrabberText"
      />
      <div class="bg-surface-disable h-16 w-41 rounded-full" />
    </div>

    <div v-else class="flex flex-1 flex-col items-end p-6">
      <WelcomingPageLoading />
    </div>
  </div>
</template>
