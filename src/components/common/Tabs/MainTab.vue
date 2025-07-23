<script setup lang="ts">
const props = defineProps<{
  tabs: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleTabClick = (tabLabel: string) => {
  emit('update:modelValue', tabLabel);
};

const baseAfterClasses =
  'after:absolute after:bottom-1/2 after:translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:w-full after:z-10 after:text-current after:block after:transition-all after:duration-100';

</script>

<template>
  <ul class="flex w-fit gap-0.5 rounded-xl bg-gray-300 p-1 select-none">
    <li v-for="tab in tabs" :key="tab" :data-tab-content="tab" :tabindex="0" role="tab"
      :aria-selected="props.modelValue === tab ? 'true' : 'false'"
      :aria-controls="`tab-panel-${tab.toLowerCase().replace(/\s/g, '-')}`" :aria-label="tab"
      @click="handleTabClick(tab)" @keydown.enter="handleTabClick(tab)" @keydown.space="handleTabClick(tab)" class="
        relative text-text-title grid cursor-pointer place-items-center
        rounded-lg px-6 py-2 text-center transition-all duration-100 ease-out
        hover:bg-white/50 focus:ring focus:ring-gray-400 focus:outline-none text-sm
      " :class="[
        baseAfterClasses, // Apply common ::after styles
        props.modelValue === tab ? 'bg-white after:font-semibold' : '',
      ]">
      <span class="invisible">{{ tab }}</span>
    </li>
  </ul>
</template>

<style scoped>
li[data-tab-content]::after {
  content: attr(data-tab-content);
}
</style>