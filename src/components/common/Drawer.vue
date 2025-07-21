<template>
  <teleport to="body">
    <transition name="drawer-backdrop-fade">
      <div
        v-if="isOpen"
        class="bg-opacity-50 bg-black-900/40 fixed inset-0 z-[998]"
        @click="closeDrawer"
      ></div>
    </transition>

    <transition name="drawer-slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-[999] flex h-full w-[408px] max-w-full flex-col rounded-l-2xl bg-white shadow-xl"
      >
        <div class="flex items-center justify-between border-b border-gray-200 p-4">
          <slot name="header">
            <h2 class="text-black-700 text-xl font-semibold">Preview Your Qiscus Live Chat</h2>
            <CloseIcon @click="closeDrawer" class="cursor-pointer" />
          </slot>
        </div>

        <div class="flex-grow overflow-y-auto">
          <slot>
            <p class="text-gray-700">This is the default content inside the drawer.</p>
            <p class="mt-2 text-gray-700">Provide your custom content using the default slot.</p>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

import CloseIcon from '../icons/CloseIcon.vue';

interface DrawerProps {
  isOpen: boolean;
}
const props = defineProps<DrawerProps>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

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
</script>

<style scoped>
/* Transition for Backdrop Fade */
.drawer-backdrop-fade-enter-active,
.drawer-backdrop-fade-leave-active {
  /* Option 1: Increase duration for a more gentle fade */
  transition: opacity 0.2s ease-in-out;
}

.drawer-backdrop-fade-enter-from,
.drawer-backdrop-fade-leave-to {
  opacity: 0;
}

/* Transition for Drawer Content Slide */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.2s ease-out;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.drawer-slide-enter-to,
.drawer-slide-leave-from {
  transform: translateX(0);
}
</style>
