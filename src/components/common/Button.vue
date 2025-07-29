<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger' | 'flat';
  size?: 'xsmall' | 'small' | 'large'; // Added xsmall to interface
  disabled?: boolean;
  shape?: 'rounded' | 'rectangular';
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disableAnimation?: boolean;
  id: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  intent: 'primary',
  size: 'small',
  disabled: false,
  shape: 'rounded',
  type: 'button',
  disableAnimation: false,
  id: '',
});

const componentType = computed(() => (props.to && !props.disabled ? 'router-link' : 'button'));

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
  }
};

const buttonClass = computed(() =>
  cva('font-semibold flex gap-2 items-center', {
    // Removed base transitions here
    variants: {
      intent: {
        primary: 'bg-primary text-white shadow-sm',
        secondary: 'bg-transparent inset-ring ring-primary text-primary ',
        danger: 'bg-transparent ring ring-red-600 text-red-600 shadow-sm',
        flat: 'bg-transparent text-primary',
      },
      size: {
        xsmall: 'py-1 px-2 text-xs',
        small: 'py-2 px-6 text-sm',
        large: 'py-4 px-8 text-lg',
      },
      disabled: {
        true: '!cursor-not-allowed !pointer-events-none', // Consolidated disabled cursor/events
        false: 'cursor-pointer',
      },
      shape: {
        rounded: 'rounded-full',
        rectangular: 'rounded-lg',
      },
      animation: {
        true: 'transition-all duration-200 ease-out transform active:scale-98 hover:shadow-md', // Added transitions and default hover shadow here
        false: '', // No animation class if false
      },
    },
    compoundVariants: [
      // Disabled states - specific color/border adjustments
      {
        intent: 'primary',
        disabled: true,
        class: '!bg-gray-300 !text-gray-500 !border-none',
      },
      {
        intent: 'secondary',
        disabled: true,
        class: '!text-gray-400 !border-gray-300',
      },
      {
        intent: 'danger',
        disabled: true,
        class: '!text-red-300 !border-red-300',
      },
      {
        intent: 'flat',
        disabled: true,
        class: '!text-gray-400',
      },

      // Hover states (only when animation is enabled and not disabled)
      {
        intent: 'primary',
        disabled: false,
        animation: true,
        class: 'hover:bg-primary-hover',
      },
      {
        intent: 'secondary',
        disabled: false,
        animation: true,
        class: 'hover:bg-primary/5',
      },
      {
        intent: 'danger',
        disabled: false,
        animation: true,
        class: 'hover:bg-red-50',
      },
      {
        intent: 'flat',
        disabled: false,
        animation: true,
        class: 'hover:bg-slate-50', // Reverted to original hover for flat
      },
      // No active/hover effects when animations are disabled
      {
        animation: false,
        class: '!active:scale-100 ', // Ensure no active scale and shadow remains fixed
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'small',
      disabled: false,
      shape: 'rounded',
      animation: true,
    },
  })({
    intent: props.intent,
    size: props.size,
    disabled: props.disabled,
    shape: props.shape,
    animation: !props.disableAnimation,
  })
);
</script>

<template>
  <component
    :is="componentType"
    :id="id"
    :to="props.to && !props.disabled ? to : undefined"
    :type="componentType === 'button' ? type : undefined"
    :disabled="componentType === 'button' ? disabled : undefined"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot name="prefixIcon" />
    <slot />
    <slot name="suffixIcon" />
  </component>
</template>
