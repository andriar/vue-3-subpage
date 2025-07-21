<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import Button from '@/components/common/Button.vue';
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import Switch from '@/components/common/Switch.vue';
import { ChatIcon } from '@/components/icons';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

import type { IWidgetChannel } from '../channels';
import ModalChannelList from './ModalChannelList.vue';

// --- Store ---
const qiscusLiveChatStore = useQiscusLiveChatStore();

// --- Local state ---
const isModalOpen = ref(false);
const activeDropdown = ref<number | null>(null);
const editingChannelData = ref<IWidgetChannel | null>(null);

// --- Method & function ---
const getFieldOptions = (channelId: number) => {
  const channel = qiscusLiveChatStore.channelList.find((ch) => ch.id === channelId);
  if (!channel) return [];

  return [
    {
      label: 'Edit Channelasdf',
      value: 'edit',
      action: () => editChannel(channel.id),
    },
    {
      label: 'Delete Channelasdf',
      value: 'delete',
      class: 'text-red-600',
      action: () => deleteChannel(channel.id),
    },
  ];
};

const closeDropdown = () => {
  activeDropdown.value = null;
};

const editChannel = (channelId: number) => {
  const channel = qiscusLiveChatStore.channelList.find((ch) => ch.id === channelId);
  if (channel) {
    editingChannelData.value = { ...channel };
    isModalOpen.value = true;
  }
  closeDropdown();
};

const deleteChannel = (channelId: number) => {
  qiscusLiveChatStore.removeChannel(channelId);
  closeDropdown();
};

// --- Event handler ---
const handleClickOutside = (event: Event) => {
  if (activeDropdown.value && !(event.target as Element).closest('.dropdown-container')) {
    closeDropdown();
  }
};

// --- Lifecycle hooks ---
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-full">
    <div class="border-stroke-regular bg-surface-secondary flex w-full flex-col gap-y-4 rounded-lg border p-6">
      <!-- header channel list -->
      <div class="flex w-full items-center justify-between">
        <h4 class="text-text-title text-base font-semibold">Another Channel</h4>
        <Button id="add-more-channel-btn" intent="flat" size="small" class="text-text-primary gap-2 !px-0"
          @click="isModalOpen = true" disableAnimation>
          <Icon name="plus" :size="18" class="" />
          <span class="text-xs font-semibold"> Add More Channel </span>
        </Button>
      </div>

      <Divider v-if="qiscusLiveChatStore.channelList.length > 0" />

      <!-- channel list -->
      <div v-if="qiscusLiveChatStore.channelList.length > 0" class="flex flex-col items-start gap-6">
        <div v-for="channel in qiscusLiveChatStore.channelList" :key="channel.id"
          class="flex w-full items-center gap-4">
          <div class="flex w-full items-center gap-4">
            <!-- Icon & Name -->
            <div class="flex flex-1 items-center gap-3">
              <img v-if="channel.icon" :src="channel.icon || CHANNEL_BADGE_URL[channel.icon as keyof typeof CHANNEL_BADGE_URL]
                " alt="" class="h-6 w-6" width="24" height="24" />
              <ChatIcon :size="24" v-else />
              <h4 class="text-text-title text-sm font-medium">{{ channel.name }}</h4>
            </div>

            <!-- Status -->
            <Switch v-model="channel.enabled" variant="success" />

            <!-- More Button with Dropdown -->
            <DropdownMenu :options="getFieldOptions(channel.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Add Channel -->
  <ModalChannelList :isOpen="isModalOpen" v-model="editingChannelData" @close="isModalOpen = false" />
</template>
