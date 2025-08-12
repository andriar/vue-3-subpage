<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';

import { useSvgContent } from '@/composables/useSvgContent';

interface Props {
  src: string;
  size?: number;
  title?: string;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 18,
  title: 'Icon',
  ariaLabel: 'Icon',
  class: '',
});

const { fetchSvgContent, getSvgContent, isLoading, hasError, retryFetch } = useSvgContent();

const svgDataUrl = computed(() => getSvgContent(props.src));
const isLoadingSvg = computed(() => isLoading(props.src));
const hasErrorSvg = computed(() => hasError(props.src));
const className = computed(() => props.class);

// Load SVG when component mounts or src changes
const loadSvg = async () => {
  if (props.src && !svgDataUrl.value && !isLoadingSvg.value) {
    try {
      await fetchSvgContent(props.src);
    } catch (error) {
      console.warn(`SvgIcon failed to load: ${props.src}`, error);
    }
  }
};

// Retry function for failed SVGs
const retryLoad = async () => {
  if (props.src && hasErrorSvg.value) {
    try {
      await retryFetch(props.src);
    } catch (error) {
      console.warn(`SvgIcon retry failed: ${props.src}`, error);
    }
  }
};

// Expose retry function for parent components
defineExpose({
  retryLoad,
});

onMounted(loadSvg);

watch(() => props.src, loadSvg, { immediate: true });
</script>

<template>
  <div class="relative inline-block" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Loading spinner -->
    <div v-if="isLoadingSvg" class="absolute inset-0 flex items-center justify-center">
      <div
        class="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50"
      ></div>
    </div>

    <!-- SVG Icon -->
    <div
      v-else-if="svgDataUrl"
      :class="['h-full w-full transition-all duration-200', className]"
      :style="{
        maskImage: `url(${svgDataUrl})`,
        WebkitMaskImage: `url(${svgDataUrl})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        backgroundColor: 'currentColor',
      }"
      :title="title"
      :aria-label="ariaLabel"
      role="img"
    ></div>

    <!-- Fallback icon when error -->
    <div
      v-else-if="hasErrorSvg"
      :class="[
        'flex h-full w-full cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-gray-600',
        className,
      ]"
      :title="`Failed to load: ${title}. Click to retry.`"
      @click="retryLoad"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
  </div>
</template>
