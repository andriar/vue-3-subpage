<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ChannelCard from '@/components/common/Cards/ChannelCard.vue';
import SubTab from '@/components/common/Tabs/SubTab.vue';
import { IntegrationIcon } from '@/components/icons';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useAppFeaturesStore } from '@/stores/app-features';
import { CHANNEL_LIST, CHANNEL_TABS } from '@/utils/constant/channels';
import { FEATURE_STATUS } from '@/utils/enum/feature-status';

const router = useRouter();
const { showAlert } = useSweetAlert();
const { featureData } = storeToRefs(useAppFeaturesStore());

const activeTab = ref(CHANNEL_TABS[0]!);

// Add type for channel types
type ChannelType = keyof typeof CHANNEL_FEATURE_MAPPING;

const CHANNEL_FEATURE_MAPPING = {
  whatsapp: 'WA',
  instagram: 'INSTAGRAM',
  tiktok: 'TIKTOK',
  facebook: 'FACEBOOK',
  'line-channel': 'LINE',
  'telegram-channel': 'TELEGRAM',
  qiscus: 'QISCUS',
  'custom-channel': 'CUSTOM_CHANNEL',
  'bot-integration': 'BOT',
} as const;

// --- Computed Properties ---

// Get integration features safely
const integrationFeatures = computed(() => {
  const hasFeatureData = featureData.value.length > 0;
  const firstFeatureItem = featureData.value[0];

  if (!hasFeatureData || !firstFeatureItem?.features) {
    return [];
  }

  return firstFeatureItem.features;
});

// Add feature status data to channel list
const channelsWithStatus = computed(() => {
  return CHANNEL_LIST.map((channel) => ({
    ...channel,
    featureStatus: getFeatureStatus(channel.type),
  }));
});

const filteredChannels = computed(() => {
  let filtered = channelsWithStatus.value;

  // Filter based on active tab
  if (activeTab.value?.id !== 'all') {
    filtered = filtered.filter((channel) => channel.group === activeTab.value?.id);
  }

  // Filter based on feature status - only show enabled or disabled features
  filtered = filtered.filter((channel) => {
    const { featureStatus } = channel;
    return featureStatus === FEATURE_STATUS.ENABLED || featureStatus === FEATURE_STATUS.DISABLED;
  });

  return filtered;
});

// --- Helper Functions ---

// Find feature by name
const findFeatureByName = (featureName: string) => {
  return integrationFeatures.value.find((feature) => feature.name === featureName);
};

// Get feature status with fallback
const getFeatureStatus = (channelType: ChannelType) => {
  const featureName = CHANNEL_FEATURE_MAPPING[channelType];
  const feature = findFeatureByName(featureName);

  return feature?.status ?? FEATURE_STATUS.HIDDEN;
};

const handleChannelClick = async (channel: any) => {
  if (channel.featureStatus === 3) {
    await showAlert.error({
      title: 'Failed',
      text: `This feature is disabled because it's not included in your current plan`,
      confirmButtonText: 'Close',
      showCancelButton: false,
    });
    return;
  }

  // Navigate to channel if status is not 3
  router.push(channel.type);
};
</script>

<template>
  <div class="text-text-title flex min-h-screen flex-col gap-8 px-12 py-8 text-sm">
    <div>
      <div class="mb-4 flex gap-3">
        <IntegrationIcon alt="Icon Integration" />
        <h2 class="text-text-title text-xl font-semibold">Integration Channel</h2>
      </div>
      <p class="text-text-subtitle">
        Choose your first channel to connect with by click a channel icon below to start connecting
        with your customers. To learn more regarding Qiscus Omnichannel Chat integration and
        tutorial, you can watch tutorial video demo in
        <a
          href="//drive.google.com/drive/folders/1JxTfQEkWK2v0MlViZ_YYTNOLDDo6dZPH"
          target="_blank"
          rel="noopener noreferrer"
          class="text-notification-link text-sm font-semibold underline"
          >this link</a
        >.
      </p>
    </div>

    <SubTab :tabs="CHANNEL_TABS" v-model="activeTab" />

    <div class="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="channel in filteredChannels"
        :id="`${channel.type}-card`"
        :key="channel.type"
        class="h-full cursor-pointer"
        @click="handleChannelClick(channel)"
      >
        <ChannelCard :channel="channel" class="h-full" :id="channel.type" />
      </div>
    </div>
  </div>
</template>
