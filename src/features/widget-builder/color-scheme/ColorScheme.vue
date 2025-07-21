<script setup lang="ts">
import { storeToRefs } from 'pinia';

import Banner from '@/components/common/Banner.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import WidgetFormLayout from '@/features/widget-builder/components/layout/WidgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import PreviewColorScheme from './components/PreviewColorScheme.vue';

const { colorWidgetState } = storeToRefs(useQiscusLiveChatStore());
</script>

<template>
  <div class="flex w-full flex-col lg:flex-row items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Base Color Live Chat Customization">
        <template #additional-info> </template>
        <template #inputs>
          <Banner intent="positive" type="outline">
            This configuration sets the base color theme for your live chat, affecting the header
            text, action buttons, and chat bubbles.
          </Banner>

          <InputCustom v-model="colorWidgetState" :clearable="false" :disabled="false" :error="false"
            errorMessage="This field has an error" id="base-color-input" label="Base Color Theme"
            placeholder="Enter color code (e.g., #0141C)" type="text">
            <template #append-button-icon>
              <div class="relative">
                <!-- Color Preview -->
                <div class="h-6 w-6 rounded border border-gray-200" :style="{ backgroundColor: colorWidgetState }">
                </div>
                <!-- Hidden Color Picker -->
                <input type="color" :value="colorWidgetState"
                  @input="colorWidgetState = ($event.target as HTMLInputElement).value"
                  class="absolute inset-0 h-6 w-6 cursor-pointer opacity-0" />
              </div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- Preview Section -->
    <div class="flex flex-1 flex-col items-end gap-4 p-6">
      <PreviewColorScheme />
    </div>
  </div>
</template>
