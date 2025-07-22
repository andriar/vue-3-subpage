<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import type { NormalizedOtherChannel } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const { loading, data, error, upload } = useUploadSdkImage();

const channelName = ref<string>('');
const channelLink = ref<string>('');
const channelBadgeIcon = ref<string>('');

// props
const props = defineProps<{
  isOpen: boolean;
}>();

// emits
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modelValue = defineModel<NormalizedOtherChannel | null>({ required: false, default: null });

// Form Validation
const isFormValid = computed(() => {
  return (
    channelName.value.trim() !== '' &&
    channelLink.value.trim() !== '' &&
    channelBadgeIcon.value.trim() !== ''
  );
});

const resetForm = (): void => {
  // Reset all form fields to empty state
  channelName.value = '';
  channelLink.value = '';
  channelBadgeIcon.value = '';
};

const closeModal = () => {
  resetForm();
  modelValue.value = null;
  emit('close');
};

const handleAddChannel = (): void => {
  const formData = {
    name: channelName.value,
    url: channelLink.value,
    badge_url: channelBadgeIcon.value,
    is_enable: false,
  };

  if (modelValue.value) {
    const updatedChannel: NormalizedOtherChannel = {
      index: modelValue.value.index,
      ...formData,
      is_active: modelValue.value.is_active,
    };
    qiscusLiveChatStore.updateChannel(modelValue.value.index, updatedChannel);
  } else {
    qiscusLiveChatStore.addChannel({
      ...formData,
      is_enable: false,
    });
  }
  closeModal();
};

const uploadImage = async (file: File) => {
  await upload(file);
  if (data.value) {
    channelBadgeIcon.value = data.value.url;
  } else {
    console.error(error.value);
  }
};

// Watch for editing channel changes
watch(
  () => modelValue.value,
  (newChannel) => {
    if (newChannel) {
      channelName.value = newChannel.name || '';
      channelLink.value = newChannel.url || '';
      channelBadgeIcon.value = newChannel.badge_url || '';
    } else {
      // Reset form when not editing
      resetForm();
    }
  },
  { immediate: true }
);
</script>

<template>
  <Modal :isOpen="props.isOpen" @close="closeModal" width="w-[592px]">
    <template #title>{{ modelValue ? 'Edit Channel' : 'Add Channel' }}</template>
    <template #content>
      <div class="flex flex-col gap-6 pb-6">
        <Banner :closeable="false" intent="positive" type="solid">
          <p class="text-text-title text-sm font-medium">
            To learn more regarding Link Channel, you can check this
            <a
              class="text-notification-link underline"
              href="https://docs.qiscus.com"
              target="_blank"
            >
              Documentation.
            </a>
          </p>
        </Banner>

        <Input
          v-model="channelName"
          :disabled="false"
          :error="false"
          errorMessage="This field has an error"
          id="default-input"
          label="Channel Name"
          placeholder="Type your channel name "
        />

        <TextArea
          v-model="channelLink"
          id="description"
          label="Channel Link"
          placeholder="Enter the channel URL (ex: https://ig.me/m/username)"
        />

        <!-- Channel Badge Icon -->
        <div>
          <!-- <label for="channel-badge-icon"> Channel Badge Icon</label> -->
          <div class="flex items-baseline gap-2">
            <ImageInput
              id="channel-badge-icon"
              label="Channel Badge Icon"
              v-model="channelBadgeIcon"
              :isUploading="loading"
              @upload="uploadImage"
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
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button id="modal-close-btn" intent="secondary" size="small" @click="closeModal"
        >Cancel</Button
      >
      <Button
        id="modal-submit-btn"
        :disabled="!isFormValid"
        intent="primary"
        size="small"
        @click="handleAddChannel"
      >
        {{ modelValue ? 'Edit Channel' : 'Add Channel' }}
      </Button>
    </template>
  </Modal>
</template>
