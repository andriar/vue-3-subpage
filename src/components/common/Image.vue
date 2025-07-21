<template>
  <div class="relative" :style="{ width: width + 'px', height: height + 'px' }">
    <img
      v-show="!isLoading"
      v-bind="$attrs"
      :src="currentSrc"
      :alt="alt"
      :width="width"
      :height="height"
      @load="handleImageLoad"
      @error="handleImageError"
      class="z-0 transition-all duration-300 ease-in-out"
    />

    <SpinnerIcon
      v-if="isLoading"
      :size="width - 5"
      class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 animate-spin text-green-600"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

import SpinnerIcon from '../icons/SpinnerIcon.vue';

// Define props using defineProps, which is globally available in <script setup>
interface Props {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Assign the defined props to a variable. 'props' will be a reactive object.
const props = withDefaults(defineProps<Props>(), {
  fallbackSrc: CHANNEL_BADGE_URL.qiscus, // Default fallback image
  alt: 'Image',
  width: 24,
  height: 24,
});

// currentSrc will hold the URL currently displayed by the <img> tag.
// It initially takes the value of the `src` prop.
const currentSrc = ref(props.src);

// hasError is a flag to prevent multiple attempts to load the fallback image.
const hasError = ref(false);
const isLoading = ref(false);

// Watch for changes in the `src` prop.
// 'props.src' is already a reactive reference provided by defineProps.
watch(
  () => props.src,
  (newSrc) => {
    isLoading.value = true;
    currentSrc.value = newSrc;
    hasError.value = false; // Reset error state for the new image
  },
  { immediate: true }
);

const handleImageLoad = () => {
  isLoading.value = false; // Set loading to false when image loads successfully
};

/**
 * Handles the 'error' event on the <img> tag.
 * If an error occurs and it hasn't been handled yet,
 * it switches the `currentSrc` to the `fallbackSrc`.
 */
const handleImageError = () => {
  if (!hasError.value) {
    // Prevent multiple error attempts
    currentSrc.value = props.fallbackSrc; // Access fallbackSrc directly from props
    hasError.value = true;
    console.warn(`Image failed to load: ${props.src}. Displaying fallback image.`);
  }
};

// With <script setup>, any top-level declarations (like currentSrc, handleImageError)
// are automatically exposed to the template. No explicit return is needed.
</script>
