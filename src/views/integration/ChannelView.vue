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
        <a href="//drive.google.com/drive/folders/1JxTfQEkWK2v0MlViZ_YYTNOLDDo6dZPH" target="_blank"
          rel="noopener noreferrer" class="text-notification-link text-sm font-semibold underline">this link</a>.
      </p>
    </div>

    <SubTab :tabs="dataTabs" v-model="activeTab" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      <router-link :to="channel.type" :id="`${channel.id}-card`" v-for="channel in filteredChannels" :key="channel.id"
        class="h-full">
        <ChannelCard :channel="channel" class="h-full" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ChannelCard from '@/components/common/Cards/ChannelCard.vue';
import SubTab from '@/components/common/Tabs/SubTab.vue';
import { IntegrationIcon } from '@/components/icons';

const router = useRouter();

const dataTabs = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'business_messaging',
    label: 'Business Messaging',
  },
  {
    id: 'live_chat',
    label: 'Live Chat',
  },
  {
    id: 'other',
    label: 'Other',
  },
];
const activeTab = ref(dataTabs[0]);

const channels = [
  {
    type: 'whatsapp',
    name: 'WhatsApp',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/whatsapp_badge.svg',
    status: 'popular',
    description:
      'Send personalized replies or broadcast messages to hundreds of customers in just a few clicks using WhatsApp.',
  },
  {
    type: 'instagram',
    name: 'Instagram',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/instagram_badge.svg',
    status: '',
    description:
      'Easily manage Instagram DMs and story replies from your omnichannel inbox, without opening app.',
  },
  {
    type: 'tiktok',
    name: 'Tiktok',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/tiktok_badge.svg',
    status: 'new',
    description:
      'Connect your TikTok business account to easily reply to DMs from your omnichannel inbox.',
  },
  {
    type: 'facebook',
    name: 'Facebook',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/messenger_badge.svg',
    status: '',
    description:
      'Manage all your Facebook Page messages efficiently, right from your omnichannel inbox.',
  },
  {
    type: 'line-channel',
    name: 'LINE',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/line_badge.svg',
    status: '',
    description: 'Connect your LINE Account to manage chats easily from your omnichannel inbox.',
  },
  {
    type: 'telegram-channel',
    name: 'Telegram',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/telegram_badge.svg',
    status: '',
    description:
      'Connect your Telegram account and easily manage all conversations from your omnichannel inbox.',
  },
  {
    type: 'qiscus',
    name: 'Qiscus Live Chat',
    group: 'live_chat',
    icon: 'https://omnichannel.qiscus.com/img/qiscus_badge.svg',
    status: 'popular',
    description:
      'Engage customers in real time through a customizable and visually appealing Qiscus Live Chat on your website.',
  },
  {
    type: 'custom-channel',
    name: 'Custom Channel',
    group: 'other',
    icon: 'https://omnichannel.qiscus.com/img/custom.svg',
    status: '',
    description:
      'Build a custom channel that fits your needs—like Tokopedia, Shopee, Email, and more.',
  },
  {
    type: 'bot-integration',
    name: 'Bot Integration',
    group: 'other',
    icon: 'https://omnichannel.qiscus.com/img/bot_badge.svg',
    status: '',
    description:
      'Enable and manage bots to assist with customer inquiries across all your connected channel.',
  },
];

const filteredChannels = computed(() => {
  if (activeTab.value.id === 'all') {
    return channels;
  }
  return channels.filter((channel) => channel.group === activeTab.value.id);
});
</script>
