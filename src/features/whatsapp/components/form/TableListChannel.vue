<template>
  <div class="w-full">
    <div class="flex items-center justify-between p-4">
      <!-- Search Input -->
      <InputCustom id="search-input" v-model="searchQuery" placeholder="Search channel name" clearable>
        <template #suffix-icon>
          <Icon name="search" />
        </template>
      </InputCustom>

      <Button id="new-integration-btn" to="/whatsapp/create" variant="primary" class="flex items-center gap-2"
        size="small" no-animation>
        <Icon name="plus" :size="16" />
        New Integration
      </Button>
    </div>

    <!-- Table -->
    <div class="px-4 py-2">
      <table class="w-full">
        <!-- Table Header -->
        <thead>
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="px-2 py-4 text-left font-normal">Channel Name</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-100">
          <tr v-for="channel in props.channels" :key="channel.id" @click.prevent="getDetailChannel(channel)"
            class="hover:bg-gray-50">
            <!-- Channel Name -->
            <td class="border-stroke-regular cursor-pointer border-b px-2 py-4">
              <div class="flex items-center gap-2">
                <Image :src="channel.badgeUrl" alt="channel badge" class="h-6 w-6"
                  :fallbackSrc="CHANNEL_BADGE_URL.qiscus" />
                <span class="text-text-title font-medium">{{ channel.name }}</span>
              </div>
            </td>

            <!-- Action (Switch) -->
            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch id="enable-channel-switch" v-model="channel.isActive" size="small" variant="success"
                @click.stop="() => ''" @update:model-value="updateChannelStatus(channel.id, $event)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-2">
        <span class="text-text-subtitle text-sm">
          {{ paginationInfo }}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <ButtonIcon @click="pagination('first')" class="text-primary cursor-pointer"
          :class="{ 'text-text-disable cursor-not-allowed': channelsStore.meta.page === 1 }">
          <DoubleChevronLeftIcon :size="24" />
        </ButtonIcon>
        <ButtonIcon @click="pagination('prev')" class="text-primary cursor-pointer"
          :class="{ 'text-text-disable cursor-not-allowed': channelsStore.meta.page === 1 }">
          <ChevronLeftIcon :size="24" />
        </ButtonIcon>
        <div
          class="flex h-10 w-12 items-center justify-center rounded-lg text-base font-bold shadow-[0px_7px_17px_0px_#33333312]">
          {{ channelsStore.meta.page }}
        </div>
        <ButtonIcon @click="pagination('next')" class="text-primary cursor-pointer" :class="{
          'text-text-disable cursor-not-allowed':
            channelsStore.meta.page === channelsStore.meta.total_page,
        }">
          <ChevronRightIcon :size="24" />
        </ButtonIcon>
        <ButtonIcon @click="pagination('last')" class="text-primary cursor-pointer" :class="{
          'text-text-disable cursor-not-allowed':
            channelsStore.meta.page === channelsStore.meta.total_page,
        }">
          <DoubleChevronRightIcon :size="24" />
        </ButtonIcon>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!props.channels" class="px-6 py-12 text-center">
      <p class="text-gray-500">No channels found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, type Ref, computed, ref, watch } from 'vue';

import Button from '@/components/common/Button.vue';
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { Image } from '@/components/common/common';
import Switch from '@/components/common/Switch.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
} from '@/components/icons';
import Icon from '@/components/icons/Icon.vue';
import { useWhatsappStore } from '@/stores/integration-whatsapp';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

// interface
interface IChannel {
  id: number;
  name: string;
  channelId: string;
  isActive: boolean;
  badgeUrl: string;
}

// props
const props = defineProps({
  channels: {
    type: Array as PropType<IChannel[]>,
    required: true,
  },
});
const channelsStore = useWhatsappStore();

// emit
const emit = defineEmits(['updateChannelStatus', 'search', 'pagination']);
const searchQuery = ref('') as Ref<string>;
const timeout = ref<NodeJS.Timeout | null>(null);

watch(searchQuery, (newVal) => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(() => {
    emit('search', newVal);
  }, 500);
});

const paginationInfo = computed(() => {
  const start = (channelsStore.meta.page - 1) * channelsStore.meta.limit + 1;
  const end = Math.min(
    channelsStore.meta.page * channelsStore.meta.limit,
    channelsStore.meta.total
  );
  return `${start}-${end} of ${channelsStore.meta.total} items`;
});

function updateChannelStatus(id: number, isActive: boolean) {
  emit('updateChannelStatus', {
    id,
    isActive,
  });
}

function pagination(type: string) {
  if (type === 'next' && channelsStore.meta.page === channelsStore.meta.total_page) return;
  if (type === 'prev' && channelsStore.meta.page === 1) return;
  emit('pagination', type);
}

function getDetailChannel(channel: IChannel) {
  // Emit an event to parent component to handle channel detail view
  window.location.href = `/integration?ch=whatsapp&chid=${channel.id}`;
}
</script>
