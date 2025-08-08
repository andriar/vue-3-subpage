<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { Icon } from '@/components/icons';

interface Props {
  title?: string;
  initiallyCollapsed?: boolean;
  collapsed?: boolean; // controlled mode
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Collapsible Section',
  initiallyCollapsed: true,
});

const emit = defineEmits<{ (e: 'update:collapsed', value: boolean): void }>();

const isControlled = computed(() => props.collapsed !== undefined);
const isCollapsed = ref(props.collapsed ?? props.initiallyCollapsed);

watch(
  () => props.collapsed,
  (v) => {
    if (v !== undefined) isCollapsed.value = v;
  }
);

const contentWrapper = ref<HTMLElement | null>(null);
const maxHeight = ref('0px');

const setMaxHeightForOpen = () => {
  const h = contentWrapper.value?.scrollHeight ?? 0;
  maxHeight.value = `${h}px`;
};

const animate = () => {
  const el = contentWrapper.value;
  if (!el) return;

  if (isCollapsed.value) {
    // closing: set current height, then animate to 0
    const current = el.scrollHeight;
    maxHeight.value = `${current}px`;
    requestAnimationFrame(() => {
      maxHeight.value = '0px';
    });
  } else {
    // opening: measure and set to content height
    nextTick(() => setMaxHeightForOpen());
  }
};

onMounted(() => {
  if (isCollapsed.value) {
    maxHeight.value = '0px';
  } else {
    setMaxHeightForOpen();
  }
});

// re-run animation whenever collapse state changes
watch(isCollapsed, () => animate());

const toggleCollapse = () => {
  const next = !isCollapsed.value;
  emit('update:collapsed', next);
  if (!isControlled.value) {
    isCollapsed.value = next;
  }
};
</script>

<template>
  <div class="overflow-hidden bg-white">
    <!-- Collapsible Header -->
    <div
      class="flex cursor-pointer items-center justify-between px-6 py-[18px] select-none"
      @click="toggleCollapse"
    >
      <!-- Slot for the title/header content -->
      <div class="text-text-title text-sm font-semibold">
        <slot name="title">{{ title }}</slot>
      </div>
      <!-- Arrow icon, rotates based on collapse state -->
      <Icon
        name="chevron-down"
        :class="{ 'rotate-180': !isCollapsed }"
        class="text-gray-600 transition-transform duration-300 ease-in-out"
      />
    </div>

    <div
      ref="contentWrapper"
      :style="{ maxHeight, overflow: 'hidden', willChange: 'max-height' }"
      class="transition-[max-height] duration-300 ease-in-out"
    >
      <!-- Slot for the collapsible content -->
      <div class="px-6 pt-2 pb-[18px]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
