<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
      <InputCustom
        id="search-input"
        v-model="searchQuery"
        placeholder="Search channel name"
        class="md:min-w-[340px]"
        clearable
      >
        <template #suffix-icon>
          <SearchIcon :size="24" />
        </template>
      </InputCustom>
      <Button
        id="new-integration-btn"
        @click="handleNewIntegration"
        variant="primary"
        class="flex w-fit items-center gap-2"
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
      <div class="flex flex-1 flex-col">
        <table class="w-full table-fixed">
          <thead class="sticky -top-2 z-10 bg-white">
            <tr class="text-text-subtitle text-[12px]" style="box-shadow: inset 0 -1px 0 #8f8f8f">
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
                    :fallbackSrc="CHANNEL_BADGE_URL.facebook"
                    alt="channel badge"
                    :width="24"
                    :height="24"
                    class="aspect-square max-h-6 max-w-6 rounded-full object-cover"
                  />
                  <span
                    class="text-text-title overflow-hidden font-medium text-ellipsis whitespace-nowrap"
                    >{{ channel.name }}</span
                  >
                </div>
              </td>
              <td class="border-stroke-regular cursor-pointer border-b px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-text-title font-semibold">{{ channel.id }}</span>
                  <ButtonIcon
                    title="Copy Channel ID"
                    @click.stop="copyToClipboard(`${channel.id}`)"
                  >
                    <CopyIcon :size="16" />
                  </ButtonIcon>
                </div>
              </td>
              <td class="border-stroke-regular border-b px-6 py-4 text-right">
                <Switch
                  id="enable-channel-switch"
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

        <div v-if="loadingList" class="grid h-full min-h-[650px] flex-1 place-items-center">
          <Animate :source="loadingAnimationData" />
        </div>

        <div
          v-if="channels.length === 0 && !loadingList"
          class="absolute inset-0 flex items-center justify-center"
        >
          <EmptyState
            title="No Results"
            description="You may want to try using different keywords or checking for the typos to find it."
            image-url="https://omnichannel.qiscus.com/img/empty-customer.svg"
          />
        </div>
      </div>

      <div v-if="isShowPagination" class="flex items-end justify-between px-6 py-4">
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
import { type Ref, computed, onMounted, ref, toValue, watch } from 'vue';
import { useRouter } from 'vue-router';

import loadingAnimationData from '@/assets/lottie/loading.json';
import { Animate, Button, ButtonIcon, Image, Switch } from '@/components/common/common';
import InputCustom from '@/components/form/InputCustom.vue';
import { CopyIcon, PlusIcon, SearchIcon } from '@/components/icons';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { useFetchFbChannel } from '@/composables/channels/facebook/useFetchFbChannel';
import { useUpdateFbChannel } from '@/composables/channels/facebook/useUpdateFbChannel';
import { useSweetAlert } from '@/composables/useSweetAlert';
import type { FbChannel } from '@/types/schemas/channels/fb-channel';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

interface FetchParams {
  search?: string;
  page?: number;
}

const searchQuery = ref('') as Ref<string>;
const params = ref<FetchParams>({});

// sweet alert
const { showAlert } = useSweetAlert();

// router
const router = useRouter();

// helper
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    // oxlint-disable-next-line no-this-alias
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

// fetch channels
const { fetchChannels, data: listData, loading: loadingList, meta } = useFetchFbChannel();

onMounted(async () => {
  await fetchChannels();
});

const channels = computed(() =>
  listData.value.map((channel) => ({
    badgeUrl: channel.badge_url,
    id: channel.id,
    isActive: channel.is_active,
    name: channel.name,
    pageId: channel.page_id,
  }))
);

// pagination
async function pagination(type: 'first' | 'prev' | 'next' | 'last') {
  const currentMeta = meta.value;
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

const isShowPagination = computed(() => {
  // Check if meta.value exists and has relevant properties, and channels array is not empty
  return meta.value && typeof meta.value.total === 'number' && channels.value.length > 0;
});

const paginationInfo = computed(() => {
  const newMeta = meta.value;
  if (!newMeta || newMeta.total === undefined) return '0-0 of 0 items'; // Handle case where meta is not yet loaded

  const start = (newMeta.page - 1) * newMeta.limit + 1;
  const end = Math.min(newMeta.page * newMeta.limit, newMeta.total);
  return `${start}-${end} of ${newMeta.total} items`;
});

// handlers
const handleNewIntegration = () => {
  router.push({
    name: 'facebook-new',
  });
};

const getDetailChannel = (channel: { id: number }) => {
  router.push({
    name: 'facebook-detail',
    params: {
      id: channel.id.toString(),
    },
  });
};

// update channel status handler
async function updateChannelStatus(id: number, is_active: boolean) {
  const { update, data, error } = useUpdateFbChannel();

  if (!is_active) {
    const resultShowAlert = await showAlert.warning({
      title: 'Deactivate Channel',
      text: `If you disable this channel, messages from customers trying to reach you will not be received in the Qiscus omnichannel. Do you want to proceed?`,
      confirmButtonText: 'Let me think again',
      cancelButtonText: 'Disable Now',
      allowOutsideClick: false,
    });

    if (resultShowAlert.isConfirmed) return;
  }

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

    const newData = toValue(data) as unknown as FbChannel;

    const status = newData.is_active ? 'Activated' : 'Deactivated';
    showAlert.success({
      title: 'Success',
      text: `${status} channel successfully`,
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });

    await fetchChannels(toValue(params));
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

// search handler
const handleSearch = debounce((newVal: string) => {
  params.value = { search: newVal };
  fetchChannels(toValue(params));
}, 500);

watch(searchQuery, handleSearch);
</script>
