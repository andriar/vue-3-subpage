<script setup lang="ts">
import { computed, ref } from 'vue';

import Button from '@/components/common/Button.vue';
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import Image from '@/components/common/Image.vue';
import Switch from '@/components/common/Switch.vue';
import { ChatIcon } from '@/components/icons';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';
import { useChannelWidgetStore } from '@/stores/integration/widget-builder/channels';
import type { NormalizedOtherChannel } from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';

import ModalChannelList from './ModalChannelList.vue';

const MAX_CHANNELS = 6;

// --- Store ---
const { channelList, removeChannel } = useChannelWidgetStore();

// --- Local state ---
const isModalOpen = ref(false);
const activeDropdown = ref<number | null>(null);
const editingChannelData = ref<NormalizedOtherChannel | null>(null);

// --- Method & function ---
const getFieldOptions = (channelId: number) => {
  const channel = channelList.find((channel) => channel.index === channelId);
  if (!channel) return [];

  return [
    {
      label: 'Edit Channel',
      value: 'edit',
      action: () => editChannel(channel.index),
    },
    {
      label: 'Delete Channel',
      value: 'delete',
      class: 'text-red-600',
      action: () => deleteChannel(channel.index),
    },
  ];
};

const closeAllDropdowns = () => {
  activeDropdown.value = null;
};

const handleDropdownOpen = (channelId: number) => {
  // Close other dropdowns and open this one
  activeDropdown.value = channelId;
};

const handleDropdownToggle = (channelId: number, isOpen: boolean) => {
  if (isOpen) {
    activeDropdown.value = channelId;
  } else if (activeDropdown.value === channelId) {
    activeDropdown.value = null;
  }
};

const editChannel = (channelId: number) => {
  const channel = channelList.find((channel) => channel.index === channelId);
  if (channel && channel.index) {
    editingChannelData.value = { ...channel };
    isModalOpen.value = true;
  }
  closeAllDropdowns();
};

const deleteChannel = (channelId: number) => {
  removeChannel(channelId);
  closeAllDropdowns();
};

const isMaxChannel = computed(() => {
  return channelList.length === MAX_CHANNELS;
});
</script>

<template>
  <div class="w-full">
    <div
      class="border-stroke-regular bg-surface-secondary flex w-full flex-col gap-y-4 rounded-lg border p-6"
    >
      <!-- header channel list -->
      <div class="flex w-full items-center justify-between">
        <h4 class="text-text-title text-base font-semibold">Another Channel</h4>
        <Button
          id="add-more-channel-btn"
          intent="flat"
          size="small"
          class="text-text-primary gap-2 !px-0"
          @click="isModalOpen = true"
          disableAnimation
          :disabled="isMaxChannel"
        >
          <Icon name="plus" :size="18" class="" />
          <span class="text-xs font-semibold"> Add More Channel </span>
        </Button>
      </div>

      <Divider v-if="channelList.length > 0" />

      <!-- channel list -->
      <div v-if="channelList.length > 0" class="flex flex-col items-start gap-6">
        <div
          v-for="channel in channelList"
          :key="channel.index"
          class="flex w-full items-center gap-4"
        >
          <div class="flex w-full items-center gap-4">
            <!-- Icon & Name -->
            <div class="flex flex-1 items-center gap-3">
              <Image
                v-if="channel.badge_url"
                :src="channel.badge_url"
                :width="24"
                :height="24"
                alt=""
                class="h-6 w-6"
              />
              <ChatIcon :size="24" v-else />
              <h4 class="text-text-title text-sm font-medium">{{ channel.name }}</h4>
            </div>

            <!-- Status -->
            <Switch id="enable-channel-switch" v-model="channel.is_enable" variant="success" />

            <!-- More Button with Dropdown -->
            <DropdownMenu
              :options="getFieldOptions(channel.index)"
              :isOpen="activeDropdown === channel.index"
              @open="handleDropdownOpen(channel.index)"
              @toggle="(isOpen) => handleDropdownToggle(channel.index, isOpen)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Add Channel -->
  <ModalChannelList
    :isOpen="isModalOpen"
    v-model="editingChannelData"
    @close="isModalOpen = false"
  />
</template>
