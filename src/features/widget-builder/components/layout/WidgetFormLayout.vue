<script lang="ts" setup>
import { computed } from 'vue';

import Switch from '@/components/common/Switch.vue';
import Divider from '@/components/ui/Divider.vue';

const props = defineProps<{
  label: string;
  modelValue?: boolean;
  isSwitch?: boolean;
  id: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>

<template>
  <div class="border-stroke-regular bg-surface-secondary flex w-full flex-1 flex-col gap-4 rounded-lg border p-6">
    <!-- Header Section -->
    <div class="flex w-full items-center justify-between gap-2">
      <label class="text-text-title text-base font-semibold">{{ label }}</label>
      <Switch :id="id" v-if="isSwitch" v-model="modelValue" variant="success" />
    </div>

    <!-- Divider -->
    <Divider v-if="modelValue || $slots['additional-info']" />

    <!-- Additional Info -->
    <slot name="additional-info" />

    <!-- Inputs -->
    <div class="flex flex-col gap-6" v-if="modelValue || !isSwitch">
      <slot name="inputs" />
    </div>
  </div>
</template>
