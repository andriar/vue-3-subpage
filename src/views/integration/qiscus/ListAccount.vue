<template>
  <div class="flex w-full flex-col gap-8 px-12 py-8">
    <button class="text-primary flex items-center gap-2 font-semibold">
      <Icon name="arrow-left" :size="20" />
      Integration
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Icon name="chat" :size="24" />
      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
    </div>

    <div class="bg-surface-highlight rounded-lg p-4 text-sm font-medium">
      <p>
        To learn more about Qiscus Live Chat Integration, you can refer to this
        <a
          class="text-notification-link font-semibold underline"
          href="https://docs.qiscus.com/docs/live-chat-integration"
          target="_blank"
          >Documentation</a
        >.
      </p>
    </div>

    <!-- Table section -->
    <div class="shadow-large rounded-2xl bg-white p-4">
      <!-- Search Input with Icon -->
      <TableListAccount />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue';

import TableListAccount from '@/pages/integration/list-account/ListAccountTable.vue';
</script>
