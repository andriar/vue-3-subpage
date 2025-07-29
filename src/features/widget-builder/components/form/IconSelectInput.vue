<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { Image } from '@/components/common/common';
import { Icon } from '@/components/icons';
import { useAppConfigStore } from '@/stores/app-config';

interface Props {
  modelValue: string | undefined;
  icons: Icon[];
  id: string;
}

interface Icon {
  name: string;
  icon: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);
const { baseUrl } = useAppConfigStore();

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

const getIconClasses = (iconUrl: string) => iconClasses({ selected: props.modelValue === iconUrl });

const selectIcon = (iconUrl: string) => {
  if (iconUrl !== props.modelValue) {
    emit('update:modelValue', iconUrl);
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
        :class="getIconClasses(icon.icon)"
        @click="selectIcon(icon.icon)"
        :title="icon.name"
        :data-value="icon.name"
        :data-testid="`${id}-${icon.name}`"
        :id="`${id}-${icon.name}`"
      >
        <Image
          :src="icon.icon"
          :alt="icon.name"
          :fallback-src="`${baseUrl}/img/icons/${icon.name.toLowerCase()}.png`"
        />
      </div>
    </div>
  </div>
</template>
