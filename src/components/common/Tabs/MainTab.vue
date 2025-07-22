<script setup lang="ts">
const props = defineProps<{
  tabs: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleTabClick = (tab: string) => {
  emit('update:modelValue', tab);
};
</script>

<template>
  <ul class="flex w-fit gap-0.5 rounded-xl bg-gray-300 p-1 select-none">
    <li
      v-for="tab in tabs"
      :key="tab"
      @click="handleTabClick(tab)"
      @keydown.enter="handleTabClick(tab)"
      @keydown.space="handleTabClick(tab)"
      :tabindex="0"
      role="tab"
      :aria-selected="props.modelValue === tab"
      :aria-controls="`tab-panel-${tab}`"
      class="text-text-title grid cursor-pointer place-items-center rounded-lg px-6 py-2 text-center transition-all duration-200 ease-out hover:bg-white/50 focus:ring focus:ring-gray-400 focus:outline-none"
      :class="[
        props.modelValue === tab ? 'bg-white text-sm font-bold shadow-sm' : 'text-sm shadow-none',
      ]"
    >
      {{ tab }}
    </li>
  </ul>
</template>
