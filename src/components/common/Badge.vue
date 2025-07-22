<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface BadgeProps {
  intent?: 'positive' | 'progress' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const props = withDefaults(defineProps<BadgeProps>(), {
  intent: 'positive',
  size: 'medium',
  disabled: false,
});

const badgeClass = computed(() =>
  cva(
    'font-bold transition-all duration-200 ease-out transform inline-flex items-center justify-center',
    {
      variants: {
        intent: {
          positive: 'bg-positive-100 text-positive-400',
          progress: 'bg-progressive-100 text-progressive-400',
          warning: 'bg-cautions-100 text-cautions-400',
          danger: 'bg-negative-100 text-negative-400',
        },
        size: {
          small: 'py-1 px-2 text-xs rounded-sm',
          medium: 'p-2 rounded-lg text-xs',
          large: 'py-3 px-4 text-base rounded-lg',
        },
        disabled: {
          true: '!transform-none !pointer-events-none  !bg-gray-200 !text-gray-800',
          false: 'cursor-pointer',
        },
      },
      defaultVariants: {
        intent: 'positive',
        size: 'medium',
        disabled: false,
      },
    }
  )({
    intent: props.intent,
    size: props.size,
    disabled: props.disabled,
  })
);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    return;
  }

  emit('click', event);
};
</script>

<template>
  <div :class="badgeClass" @click="handleClick" :disabled="disabled">
    <slot />
  </div>
</template>
