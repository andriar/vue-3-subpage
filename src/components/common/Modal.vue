<template>
  <teleport to="body">
    <transition name="drawer-backdrop-fade">
      <div v-if="isOpen" class="bg-opacity-50 fixed inset-0 z-[998] flex items-center justify-center bg-black-900/40"
        @click="closeDrawer"></div>
    </transition>

    <transition name="modal-slide-fade">
      <div @click.stop v-if="isOpen" id="modal-container" :class="[
        dynamicWidthClass,
        'z-[999] flex h-auto max-h-[90vh] max-w-full flex-col rounded-2xl bg-white shadow-xl',
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      ]">
        <div class="flex items-center justify-between border-b border-gray-200 p-6">
          <slot name="header">
            <h2 class="text-xl font-semibold text-black-700">
              <slot name="title">Modal Title</slot>
            </h2>
            <CloseIcon @click="closeDrawer" class="cursor-pointer" />
          </slot>
        </div>

        <div class="z-[999] flex-grow overflow-y-auto px-6">
          <slot name="content"> </slot>
        </div>
        <div
          class="flex items-center justify-center gap-3.5 border-t border-gray-200 p-4 shadow-[0px_-4px_8px_0px_#00000014]">
          <slot name="footer">
            <button @click="closeDrawer" class="rounded-md bg-gray-200 px-4 py-2 text-gray-800">
              Cancel
            </button>
            <button @click="confirmAction" class="bg-primary rounded-md px-4 py-2 text-white">
              {{ props.confirmText || 'Save' }}
            </button>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';

import CloseIcon from '../icons/CloseIcon.vue';

interface ModalProps {
  isOpen: boolean;
  /**
   * Defines the width of the modal.
   * Can be a Tailwind class (e.g., 'w-lg', 'w-full')
   * or an arbitrary CSS width value (e.g., '500px', '75%', '30vw').
   * It will be converted to w-[value] if not already a Tailwind class.
   */
  width?: string;
  confirmText?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: false,
  width: 'w-[456px]', // Default width: 456 pixels using arbitrary value syntax
  confirmText: 'Save',
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const confirmAction = (): void => {
  emit('confirm');
};

const closeDrawer = (): void => {
  emit('close');
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (props.isOpen && event.key === 'Escape') {
    closeDrawer();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

watch(
  () => props.isOpen,
  (newVal: boolean) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  },
  { immediate: true }
);

// Computed property to generate the dynamic Tailwind width class
const dynamicWidthClass = computed(() => {
  // Check if the provided width already starts with 'w-' (e.g., 'w-lg', 'w-full', 'w-[500px]')
  if (props.width.startsWith('w-')) {
    return props.width;
  }
  // If it's a raw CSS value like '500px', '75%', '30vw', wrap it in arbitrary value syntax 'w-[...]'
  // This allows Tailwind's JIT compiler to generate the necessary CSS.
  return `w-[${props.width}]`;
});
</script>

<style scoped>
/* Backdrop fade transition */
.drawer-backdrop-fade-enter-active,
.drawer-backdrop-fade-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-backdrop-fade-enter-from,
.drawer-backdrop-fade-leave-to {
  opacity: 0;
}

/* Modal slide-fade transition */
.modal-slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.modal-slide-fade-enter-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

.modal-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.modal-slide-fade-leave-active {
  transition:
    opacity 0.25s ease-in,
    transform 0.25s ease-in;
}
</style>
