<script setup lang="ts">
import { ref } from 'vue';

import Image from '@/components/common/Image.vue';
import Select from '@/components/form/Select.vue';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PhoneIcon,
  QiscusIcon,
  SignIcon,
  UserIcon,
} from '@/components/icons';
import { useAppConfigStore } from '@/stores/app-config';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const props = defineProps<{
  title: string;
  subtitle: string;
  description: string;
  liveChatTitle?: string;
  liveChatImage?: string;
  brandLogo?: string;
  buttonText?: string;
  isChannelEnabled?: boolean;
  customerIdentifier?: string;
  fields?: {
    id: string;
    icon: string;
    type: string;
    label: string;
    placeholder: string;
    options?: {
      value: string | number;
      text: string;
    }[];
  }[];
}>();
const { baseUrl } = useAppConfigStore();

const selectedField = ref<Record<string, string | number | undefined>>({});
</script>

<template>
  <div class="text-navy-500 shadow-card-float flex w-[360px] flex-col rounded-4xl bg-white">
    <div class="flex-1 p-8">
      <!-- HEADER PREVIEW -->
      <div v-if="!props.isChannelEnabled">
        <Image v-if="props.brandLogo" :src="props.brandLogo ?? ''" alt="Brand Logo" size="32" />
        <QiscusIcon v-else :size="32" />
        <div class="mt-6 text-2xl break-words">{{ props.title }}</div>
        <div class="text-2xl font-bold break-words">{{ props.subtitle }}</div>
      </div>

      <!-- if channel enabled -->
      <div v-else>
        <ChevronLeftIcon :size="28" />
        <div class="text-surface-primary-blue mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Image :src="props.liveChatImage || CHANNEL_BADGE_URL.qiscus" alt="Qiscus Live Chat" />
          <h2 class="min-w-0 flex-1 break-words">{{ props.liveChatTitle || 'Live Chat' }}</h2>
        </div>
      </div>
      <div :class="[props.isChannelEnabled ? 'mt-2' : 'mt-8', 'text-md break-words']">
        {{ props.description }}
      </div>

      <!-- MAIN CONTENT PREVIEW -->
      <div class="mt-8 flex w-full flex-col gap-4">
        <div class="shadow-card flex w-full items-center gap-3 rounded-2xl px-3 py-4">
          <div class="rounded-lg bg-gray-100 p-[7px]">
            <UserIcon :size="18" />
          </div>
          <input
            type="text"
            class="w-full outline-none placeholder:text-gray-800"
            placeholder="Type your name"
            disabled
          />
        </div>

        <div class="shadow-card flex w-full items-center gap-3 rounded-2xl px-3 py-4">
          <div class="rounded-lg bg-gray-100 p-[7px]">
            <SignIcon v-if="props.customerIdentifier === 'email'" :size="18" />
            <PhoneIcon v-else :size="18" />
          </div>
          <div
            v-if="props.customerIdentifier === 'phone'"
            class="text-text-title flex gap-2 text-sm font-medium"
          >
            <h4>+62</h4>
            <ChevronDownIcon :size="18" />
          </div>
          <input
            type="text"
            class="w-full outline-none placeholder:text-gray-800"
            :placeholder="
              props.customerIdentifier === 'email' ? 'Type your email address' : 'Type phone number'
            "
            disabled
          />
        </div>

        <div
          v-for="field in fields"
          :key="field.id"
          class="shadow-card flex w-full items-center gap-3 rounded-2xl px-3 py-4"
        >
          <div class="max-h-[32px] max-w-[32px] rounded-lg bg-gray-100 p-[7px]">
            <Image
              v-if="field.icon"
              :height="18"
              :width="18"
              :src="field.icon"
              :fallback-src="`${baseUrl}/img/icons/${field.icon.toLowerCase()}.png`"
              alt="field.label"
            />
          </div>

          <Select
            v-if="field.type === 'select'"
            :options="field.options || []"
            class="w-full max-w-[228px]"
            variant="ghost"
            v-model="selectedField[field.id]"
            :placeholder="field.placeholder"
          />
          <input
            v-else
            :type="field.type"
            class="w-full outline-none placeholder:text-gray-800"
            :placeholder="field.placeholder"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="px-8 py-3">
      <button
        class="bg-navy-500 w-full rounded-2xl px-3 py-4 text-base font-medium break-words text-white"
      >
        {{ props.buttonText || 'Start Chat' }}
      </button>
    </div>

    <div class="text-black-700 border-t border-gray-300 py-2 text-center text-xs font-medium">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
