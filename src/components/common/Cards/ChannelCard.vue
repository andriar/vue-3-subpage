<template>
  <div
    class="card bg-white-100 flex min-h-40 cursor-pointer flex-col gap-3 rounded-2xl border border-gray-300 p-6 transition-colors duration-200 ease-in"
    :class="channel.type">
    <div class="z-10 flex items-center justify-between text-sm font-semibold">
      <div class="flex items-center gap-3">
        <Image :src="channel.icon" alt="channel badge" :width="40" :height="40" />
        {{ channel.name }}
      </div>
      <Badge v-if="channel.status === 'new'" intent="positive">New</Badge>
      <Badge v-if="channel.status === 'popular'" intent="progress">Popular</Badge>
    </div>
    <div class="text-text-subtitle z-10 text-sm font-normal">
      {{ channel.description }}
    </div>
  </div>
</template>
<script setup lang="ts">
import Badge from '@/components/common/Badge.vue';
import Image from '../Image.vue';

defineProps<{
  channel: {
    type: string;
    name: string;
    icon: string;
    status: string;
    description: string;
  };
}>();
</script>
<style scoped>
.card {
  position: relative;
  overflow: hidden;
}

.card:hover {
  border-color: #27b199;
}

.card::after {
  content: '';
  position: absolute;
  left: -162px;
  bottom: -54px;
  width: 260px;
  height: 260px;
  filter: blur(115px);
  opacity: 0.2;
}

.card.whatsapp::after {
  background-image: url('https://omnichannel.qiscus.com/img/whatsapp_badge.svg');
  background-size: cover;
}

.card.instagram::after {
  background-image: url('https://omnichannel.qiscus.com/img/instagram_badge.svg');
  background-size: cover;
}

.card.tiktok::after {
  background-image: url('https://omnichannel.qiscus.com/img/tiktok_badge.svg');
  background-size: cover;
}

.card.facebook::after {
  background-image: url('https://omnichannel.qiscus.com/img/messenger_badge.svg');
  background-size: cover;
}

.card.line::after {
  background-image: url('https://omnichannel.qiscus.com/img/line_badge.svg');
  background-size: cover;
}

.card.telegram::after {
  background-image: url('https://omnichannel.qiscus.com/img/telegram_badge.svg');
  background-size: cover;
}

.card.qiscus::after {
  background-image: url('https://omnichannel.qiscus.com/img/qiscus_badge.svg');
  background-size: cover;
}

.card.custom_channel::after {
  background-image: url('https://omnichannel.qiscus.com/img/custom.svg');
  background-size: cover;
}

.card.bot_integration::after {
  background-image: url('https://omnichannel.qiscus.com/img/bot_badge.svg');
  background-size: cover;
}
</style>
