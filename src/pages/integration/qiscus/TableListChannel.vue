<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex items-center justify-between p-4">
      <InputCustom
        v-model="searchQuery"
        placeholder="Search channel name"
        class="min-w-[340px]"
        clearable
      >
        <template #suffix-icon>
          <SearchIcon :size="24" />
        </template>
      </InputCustom>

      <Button
        to="/qiscus/create"
        variant="primary"
        class="flex items-center gap-2"
        size="small"
        no-animation
      >
        <PlusIcon :size="24" />
        New Integration
      </Button>
    </div>

    <div
      class="relative flex min-h-[776px] flex-1 flex-col justify-between overflow-auto px-4 py-2"
    >
      <table class="w-full table-fixed">
        <thead class="sticky -top-2 z-10 bg-white">
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="max-w-[362px] px-2 py-4 text-left font-normal">Channel Name</th>
            <th class="px-6 py-4 text-left font-normal">Channel ID</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <tbody v-if="!loadingList" class="divide-y divide-gray-100">
          <tr
            v-for="channel in channels"
            :key="channel.id"
            class="hover:bg-gray-50"
            @click.prevent="getDetailChannel(channel)"
          >
            <td class="border-stroke-regular max-w-[362px] cursor-pointer border-b px-2 py-4">
              <div class="flex items-center gap-2">
                <Image
                  :src="channel.badgeUrl"
                  alt="channel badge"
                  :width="24"
                  :height="24"
                  class="aspect-square rounded-full object-cover"
                  :fallback-src="CHANNEL_BADGE_URL.qiscus"
                />
                <span
                  class="text-text-title overflow-hidden font-medium text-ellipsis whitespace-nowrap"
                  >{{ channel.name }}</span
                >
              </div>
            </td>

            <td class="border-stroke-regular cursor-pointer border-b px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-text-title font-semibold">{{ channel.channelId }}</span>
                <ButtonIcon
                  title="Copy Channel ID"
                  @click.stop="copyToClipboard(channel.channelId)"
                >
                  <CopyIcon :size="16" />
                </ButtonIcon>
              </div>
            </td>

            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch
                v-model="channel.isActive"
                size="small"
                variant="success"
                @click.stop
                @update:model-value="updateChannelStatus(channel.id, $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loadingList" class="grid h-full place-items-center">
        <Animate :source="loadingAnimationData" />
      </div>

      <div
        v-if="channels.length === 0 && !loadingList"
        class="absolute inset-0 flex items-center justify-center"
      >
        <EmptyState
          title="No Results"
          description="You may want to try using different keywords or checking for the typos to find it."
          image_url="https://omnichannel.qiscus.com/img/empty-customer.svg"
        />
      </div>

      <div v-if="isShowPagination" class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="text-text-subtitle text-sm">
            {{ paginationInfo }}
          </span>
        </div>

        <Pagination :meta="meta" @pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, computed, defineAsyncComponent, onMounted, ref, toValue, watch } from 'vue';
import { useRouter } from 'vue-router';

import loadingAnimationData from '@/assets/lottie/loading.json';
import { Button, ButtonIcon, Image, Switch } from '@/components/common/common';
import InputCustom from '@/components/form/InputCustom.vue';
import { CopyIcon, PlusIcon, SearchIcon } from '@/components/icons';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { useFetchQiscus, useUpdateQiscus } from '@/composables/channels/qiscus';
import { useSweetAlert } from '@/composables/useSweetAlert';
import type { IQiscusChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

// async component
const Animate = defineAsyncComponent(() => import('@/components/common/Animate.vue'));

// interface
interface IChannel {
  id: number;
  name: string;
  channelId: string;
  isActive: boolean;
  badgeUrl: string;
}

// Example IMeta interface (adjust based on your actual API response structure)
interface IMeta {
  page: number;
  limit: number;
  total: number;
  total_page: number;
  // Add other meta properties if they exist
}

// Helper: Simple debounce function
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

// declare
const searchQuery = ref('') as Ref<string>;

// Define a type for your parameters for better type safety
interface FetchParams {
  search?: string;
  page?: number;
  // Add other common query parameters if needed
}
const params = ref<FetchParams>({});

const router = useRouter();
// Assuming useFetchQiscus and useUpdateQiscus return strongly typed data and meta
const { fetchChannels, data: listData, loading: loadingList, meta } = useFetchQiscus();
const { showAlert } = useSweetAlert();

// Debounced search handler
const handleSearch = debounce((newVal: string) => {
  params.value = { search: newVal };
  fetchChannels(toValue(params));
}, 500);

watch(searchQuery, handleSearch);

// computed
const paginationInfo = computed(() => {
  // Ensure meta.value is not null/undefined before accessing its properties
  const newMeta = meta.value as IMeta; // Cast to IMeta for type safety within computed
  if (!newMeta || newMeta.total === undefined) return '0-0 of 0 items'; // Handle case where meta is not yet loaded

  const start = (newMeta.page - 1) * newMeta.limit + 1;
  const end = Math.min(newMeta.page * newMeta.limit, newMeta.total);
  return `${start}-${end} of ${newMeta.total} items`;
});

const isShowPagination = computed(() => {
  // Check if meta.value exists and has relevant properties, and channels array is not empty
  return meta.value && typeof (meta.value as IMeta).total === 'number' && channels.value.length > 0;
});

// function
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

const channels = computed(() => {
  return listData.value.map((channel) => ({
    id: channel.id,
    name: channel.name,
    channelId: channel.id.toString(), // Assuming channel.id is also the channelId for display
    isActive: channel.is_active,
    badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.qiscus,
  }));
});

async function updateChannelStatus(id: number, is_active: boolean) {
  const { update, data, error } = useUpdateQiscus();

  try {
    await update(id, { is_active });

    if (error.value) {
      // Revert the switch state on the client if API call fails
      const channelToRevert = channels.value.find((c) => c.id === id);
      if (channelToRevert) {
        channelToRevert.isActive = !is_active; // Revert to previous state
      }
      showAlert.error({
        title: 'Error',
        text: `Failed to update channel status. Please try again.`,
        confirmButtonText: 'Okay',
        showCancelButton: false,
      });
      return;
    }

    // Update the local listData with the new state from the API response
    const newData = toValue(data);
    if (newData) updateExistingListData(newData);
  } catch (err: any) {
    // Handle unexpected errors during the update process (e.g., network issues)
    const channelToRevert = channels.value.find((c) => c.id === id);
    if (channelToRevert) {
      channelToRevert.isActive = !is_active; // Revert to previous state
    }
    showAlert.error({
      title: 'Error',
      text: `An unexpected error occurred: ${err.message || 'Please try again.'}`,
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }
}

function updateExistingListData(newData: IQiscusChannel) {
  const fIdx = listData.value.findIndex((ld) => ld.id === newData.id);

  if (fIdx === -1) return;
  if (!listData.value[fIdx]) return;

  listData.value[fIdx].is_active = newData.is_active;

  const status = newData.is_active ? 'Activated' : 'Deactivated';
  showAlert.success({
    title: 'Success',
    text: `${status} channel successfully`,
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}

onMounted(async () => {
  await fetchChannels();
});

// pagination function
async function pagination(type: 'first' | 'prev' | 'next' | 'last') {
  const currentMeta = meta.value as IMeta; // Cast for type safety
  let page = currentMeta.page; // Start with current page

  switch (type) {
    case 'first':
      page = 1;
      break;
    case 'prev':
      page = Math.max(1, page - 1); // Ensure page doesn't go below 1
      break;
    case 'next':
      page = Math.min(currentMeta.total_page, page + 1); // Ensure page doesn't exceed total_page
      break;
    case 'last':
      page = currentMeta.total_page;
      break;
    default:
      break;
  }
  params.value = {
    ...params.value,
    page,
  };

  await fetchChannels(toValue(params));
}

function getDetailChannel(channel: IChannel) {
  router.push({
    name: 'qiscusDetail',
    params: { id: channel.id },
  });
}
</script>
