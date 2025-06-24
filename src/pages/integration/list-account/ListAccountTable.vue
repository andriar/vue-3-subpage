<template>
  <div class="w-full">
    <!-- Header Table List Account -->
    <div class="flex items-center justify-between pb-4">
      <div class="relative">
        <Icon
          name="search"
          :size="20"
          class="text-icon-black absolute top-1/2 left-3 -translate-y-1/2 transform"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search channel name"
          class="shadow-small placeholder:text-text-placeholder w-80 rounded-lg py-3 pr-4 pl-11 placeholder:text-sm"
        />
      </div>

      <div>
        <button
          class="bg-button-primary text-surface-primary-white flex items-center gap-x-2 rounded-[64px] px-7 py-2 text-sm font-semibold"
        >
          <Icon name="plus" :size="16" class="text-icon-white" />
          New Integration
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden">
      <table class="w-full">
        <!-- Table Header -->
        <thead>
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="px-2 py-4 text-left font-normal">Channel Name</th>
            <th class="px-6 py-4 text-left font-normal">Channel ID</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-100">
          <tr v-for="channel in filteredChannels" :key="channel.id" class="hover:bg-gray-50">
            <!-- Channel Name -->
            <td class="border-stroke-regular border-b px-2 py-4">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white"
                  :style="{ backgroundColor: channel.color }"
                >
                  {{ channel.icon }}
                </div>
                <span class="text-text-title font-medium">{{ channel.name }}</span>
              </div>
            </td>

            <!-- Channel ID -->
            <td class="border-stroke-regular border-b px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-text-title font-semibold">{{ channel.channelId }}</span>
                <button
                  class="rounded p-1 hover:bg-gray-100"
                  title="Copy Channel ID"
                  @click="copyToClipboard(channel.channelId)"
                >
                  <Icon name="copy" :size="12" class="text-icon-green" />
                </button>
              </div>
            </td>

            <!-- Action (Switch) -->
            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch
                v-model="channel.isActive"
                size="small"
                variant="success"
                @update:model-value="updateChannelStatus(channel.id, $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-between pt-4">
        <div class="flex items-center gap-2">
          <span class="text-text-subtitle text-sm">1-10 of 180 items</span>
        </div>

        <div class="flex items-center gap-4">
          <Icon name="double-chevron-left" class="text-icon-disable" :size="24" />
          <Icon name="chevron-left" class="text-icon-disable" :size="12" />
          <div
            class="shadow-small flex h-10 w-12 items-center justify-center rounded-lg text-base font-bold"
          >
            1
          </div>
          <Icon name="chevron-right" class="text-icon-green" :size="12" />
          <Icon name="double-chevron-right" class="text-icon-green" :size="24" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredChannels.length === 0" class="px-6 py-12 text-center">
        <p class="text-gray-500">No channels found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '@/components/icons/Icon.vue';
import Switch from '@/components/common/Switch.vue';

// Dummy data - replace with actual data from API
const channels = ref([
  {
    id: 1,
    name: 'Marketing_New',
    channelId: '123672',
    isActive: true,
    color: '#10B981',
    icon: 'M',
  },
  {
    id: 2,
    name: 'Free Ship',
    channelId: '123672',
    isActive: true,
    color: '#6B7280',
    icon: '⚡',
  },
  {
    id: 3,
    name: 'Save Big',
    channelId: '123672',
    isActive: true,
    color: '#EF4444',
    icon: 'S',
  },
  {
    id: 4,
    name: 'Bundle',
    channelId: '123672',
    isActive: true,
    color: '#EF4444',
    icon: 'B',
  },
  {
    id: 5,
    name: 'Special',
    channelId: '123672',
    isActive: true,
    color: '#10B981',
    icon: 'S',
  },
  {
    id: 6,
    name: 'Promo Natal',
    channelId: '123672',
    isActive: true,
    color: '#10B981',
    icon: 'P',
  },
  {
    id: 7,
    name: 'Clearance',
    channelId: '123672',
    isActive: false,
    color: '#10B981',
    icon: 'C',
  },
  {
    id: 8,
    name: 'New!',
    channelId: '123672',
    isActive: false,
    color: '#10B981',
    icon: 'N',
  },
  {
    id: 9,
    name: 'Flash Sale',
    channelId: '123672',
    isActive: false,
    color: '#10B981',
    icon: 'F',
  },
  {
    id: 10,
    name: 'Top Pick',
    channelId: '123672',
    isActive: false,
    color: '#10B981',
    icon: 'T',
  },
]);

const searchQuery = ref('');

// Computed property for filtered channels
const filteredChannels = computed(() => {
  if (!searchQuery.value) {
    return channels.value;
  }
  return channels.value.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // You can add a toast notification here
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const updateChannelStatus = (channelId, newStatus) => {
  const channel = channels.value.find((c) => c.id === channelId);
  if (channel) {
    channel.isActive = newStatus;
    // Here you would typically make an API call to update the status
    console.log(`Channel ${channelId} status updated to:`, newStatus);
  }
};
</script>
