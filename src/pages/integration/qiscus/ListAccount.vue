<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button class="text-primary flex items-center gap-2 font-semibold">
      <ChevronLeftIcon :size="20" />
      Integration
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <ChatIcon :size="20" />
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
      <div class="flex items-center justify-between">
        <!-- Search Input with Icon -->
        <TableListAccount />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatIcon from '@/components/icons/ChatIcon.vue';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue';
import TableListAccount from '@/pages/integration/list-account/TableListAccount.vue';
</script>
