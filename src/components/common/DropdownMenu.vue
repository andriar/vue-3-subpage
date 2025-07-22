<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { MoreIcon } from '@/components/icons';

interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
  class?: string;
  action?: () => void;
}

interface Props {
  options: DropdownOption[];
  iconSize?: number;
  position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 24,
  position: 'right',
});

const emit = defineEmits<{
  (e: 'select', option: DropdownOption): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement>();

const toggleDropdown = (event: Event) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
};

const selectOption = (option: DropdownOption) => {
  if (option.action) {
    option.action();
  }
  emit('select', option);
  isOpen.value = false;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const positionClasses = {
  left: 'left-8',
  right: 'right-8',
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <!-- Kebab Icon Trigger -->
    <button
      @click="toggleDropdown"
      class="cursor-pointer rounded-md p-1 transition-colors duration-200 hover:bg-gray-100"
      type="button"
    >
      <MoreIcon :size="props.iconSize" class="text-gray-600" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute -top-10 z-50 min-w-40 rounded-lg border border-gray-300 bg-white py-1 shadow-lg',
          positionClasses[props.position],
        ]"
        @click.stop
      >
        <button
          v-for="option in props.options"
          :key="option.value"
          @click="selectOption(option)"
          :class="[
            'block w-full cursor-pointer px-6 py-5 text-left text-sm transition-colors duration-150 hover:bg-gray-200',
            option.class || 'text-gray-700',
          ]"
        >
          <div class="flex items-center gap-2">
            <component v-if="option.icon" :is="option.icon" class="h-4 w-4" />
            <span class="whitespace-nowrap">{{ option.label }}</span>
          </div>
        </button>
      </div>
    </Transition>
  </div>
</template>
