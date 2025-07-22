<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { Icon } from '@/components/icons';
import type { IconName } from '@/components/icons/Icon.vue';

interface Props {
  modelValue: string | undefined;
  icons: Icon[];
  id: string;
}

interface Icon {
  name: string;
  icon: IconName;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);
const iconClasses = cva(
  'flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 border',
  {
    variants: {
      selected: {
        true: 'border-primary shadow-medium',
        false: 'border-gray-300 hover:border-gray-400',
      },
    },
  }
);

const getIconClasses = (iconName: string) =>
  iconClasses({ selected: props.modelValue === iconName });

const selectIcon = (iconName: string) => {
  if (iconName !== props.modelValue) {
    emit('update:modelValue', iconName);
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-text-subtitle text-sm font-normal">Icon Field</label>

    <div class="flex flex-wrap gap-3" :id="id" :data-testid="id">
      <div
        v-for="icon in props.icons"
        :key="icon.name"
        :class="getIconClasses(icon.name)"
        @click="selectIcon(icon.name)"
        :title="icon.name"
        :data-value="icon.name"
        :data-testid="`${id}-${icon.name}`"
        :id="`${id}-${icon.name}`"
      >
        <Icon :name="icon.icon" :alt="icon.name" />
      </div>
    </div>
  </div>
</template>
