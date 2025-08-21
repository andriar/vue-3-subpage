<script setup lang="ts">
import type { Component } from 'vue';

interface TabItem {
  label: string;
  icon?: Component;
}

const props = withDefaults(
  defineProps<{
    tabs: TabItem[];
    modelValue: string;
  }>(),
  {
    modelValue: '',
    tabs: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleTabClick = (tab: string) => {
  emit('update:modelValue', tab);
};
</script>

<template>
  <ul class="flex w-fit items-center gap-1 select-none flex-wrap">
    <li v-for="tab in tabs" :key="tab.label" @click="handleTabClick(tab.label)"
      @keydown.enter="handleTabClick(tab.label)" @keydown.space="handleTabClick(tab.label)" :tabindex="0" role="tab"
      :aria-selected="props.modelValue === tab.label" :aria-controls="`tab-panel-${tab.label}`"
      class="text-text-title flex cursor-pointer items-center gap-2 rounded-full border-[1px] px-3 py-2 transition-all duration-200 ease-linear border-transparent bg-transparent hover:bg-gray-300 "
      :class="{
        '!bg-primary/10 !border-primary': modelValue === tab.label
      }">
      <span v-if="tab.icon">
        <component :is="tab.icon" :size="24"
          :class="props.modelValue === tab.label ? 'text-primary' : 'text-text-title'" />
      </span>
      <span :class="props.modelValue === tab.label ? 'text-primary' : 'text-text-title'">{{
        tab.label
        }}</span>
    </li>
  </ul>
</template>
