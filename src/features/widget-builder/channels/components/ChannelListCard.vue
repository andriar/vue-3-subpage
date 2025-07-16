<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import Button from '@/components/common/Button.vue';
import Switch from '@/components/common/Switch.vue';
import { ChatIcon } from '@/components/icons';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

import type { IWidgetChannel } from '../channels';
import ModalChannelList from './ModalChannelList.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const isModalOpen = ref(false);
const activeDropdown = ref<number | null>(null);
const editingChannelData = ref<IWidgetChannel | null>(null);

const toggleDropdown = (channelId: number) => {
  activeDropdown.value = activeDropdown.value === channelId ? null : channelId;
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

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (activeDropdown.value && !(event.target as Element).closest('.dropdown-container')) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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
          intent="flat"
          size="small"
          class="text-text-primary gap-2 !px-0"
          @click="isModalOpen = true"
          disableAnimation
        >
          <Icon name="plus" :size="18" class="" />
          <span class="text-xs font-semibold"> Add More Channel </span>
        </Button>
      </div>

      <Divider v-if="qiscusLiveChatStore.channelList.length > 0" />

      <!-- channel list -->
      <div
        v-if="qiscusLiveChatStore.channelList.length > 0"
        class="flex flex-col items-start gap-6"
      >
        <div
          v-for="channel in qiscusLiveChatStore.channelList"
          :key="channel.id"
          class="flex w-full items-center gap-4"
        >
          <div class="flex w-full items-center gap-4">
            <!-- Icon & Name -->
            <div class="flex flex-1 items-center gap-3">
              <img
                v-if="channel.icon"
                :src="
                  channel.icon || CHANNEL_BADGE_URL[channel.icon as keyof typeof CHANNEL_BADGE_URL]
                "
                alt=""
                class="h-6 w-6"
                width="24"
                height="24"
              />
              <ChatIcon :size="24" v-else />
              <h4 class="text-text-title text-sm font-medium">{{ channel.name }}</h4>
            </div>

            <!-- Status -->
            <Switch v-model="channel.enabled" variant="success" />

            <!-- More Button with Dropdown -->
            <div class="dropdown-container relative">
              <Button
                intent="flat"
                class="!px-0"
                disableAnimation
                @click="toggleDropdown(channel.id)"
              >
                <Icon name="more" :size="24" class="text-icon-black" />
              </Button>

              <!-- Dropdown Menu -->
              <div
                v-if="activeDropdown === channel.id"
                class="bg-surface-primary-white shadow-small absolute top-0 right-8 z-10 flex w-[161px] flex-col items-start rounded-lg px-3 py-1"
              >
                <button
                  @click="editChannel(channel.id)"
                  class="text-text-title border-stroke-regular w-full rounded-lg border-b px-3 py-4 text-start text-sm font-medium hover:bg-slate-100"
                >
                  Edit Channel
                </button>
                <button
                  @click="deleteChannel(channel.id)"
                  class="text-notification-error w-full rounded-lg px-3 py-4 text-start text-sm font-medium transition-colors hover:bg-red-50"
                >
                  Delete Channel
                </button>
              </div>
            </div>
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
