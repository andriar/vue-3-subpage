<template>
  <button type="button" role="switch" :disabled="disabled" :aria-checked="modelValue" :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedby" :class="switchClass" @click="handleToggle" @keydown="handleKeydown">
    <span :class="[
      'absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm transition-transform duration-300',
      thumbSizeClass,
      {
        'translate-x-5': modelValue && (size === 'medium' || size === 'small'),
        'translate-x-7': modelValue && size === 'large',
        'translate-x-0': !modelValue,
      },
    ]"></span>
  </button>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface SwitchProps {
  modelValue?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  ariaLabel?: string;
  ariaDescribedby?: string;
  id: string;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'medium',
  variant: 'default',
  ariaLabel: 'Toggle switch',
  id: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const handleToggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue;
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleToggle();
  }
};

const thumbSizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-4 h-4';
    case 'large':
      return 'w-6 h-6';
    default:
      return 'w-5 h-5';
  }
});

const switchClass = computed(() =>
  cva(
    'relative rounded-full border-none cursor-pointer transition-all duration-300 ease-in-out outline-none p-0 focus:ring-2 focus:ring-offset-2',
    {
      variants: {
        size: {
          small: 'w-10 h-5',
          medium: 'w-11 h-6',
          large: 'w-14 h-7',
        },
        variant: {
          default: 'focus:ring-blue-500/20',
          success: 'focus:ring-primary/20',
          warning: 'focus:ring-yellow-500/20',
          danger: 'focus:ring-red-500/20',
        },
        state: {
          checked: '',
          unchecked: '',
        },
        disabled: {
          true: 'cursor-not-allowed opacity-50',
          false: 'hover:scale-105 active:scale-95',
        },
      },
      compoundVariants: [
        {
          variant: 'default',
          state: 'checked',
          class: 'bg-blue-500',
        },
        {
          variant: 'default',
          state: 'unchecked',
          class: 'bg-black-500',
        },
        {
          variant: 'success',
          state: 'checked',
          class: 'bg-primary',
        },
        {
          variant: 'success',
          state: 'unchecked',
          class: 'bg-black-500',
        },
        {
          variant: 'warning',
          state: 'checked',
          class: 'bg-yellow-500',
        },
        {
          variant: 'warning',
          state: 'unchecked',
          class: 'bg-black-500',
        },
        {
          variant: 'danger',
          state: 'checked',
          class: 'bg-red-500',
        },
        {
          variant: 'danger',
          state: 'unchecked',
          class: 'bg-black-500',
        },
        {
          disabled: true,
          class: '!pointer-events-none !hover:scale-100 !active:scale-100',
        },
      ],
      defaultVariants: {
        size: 'medium',
        variant: 'default',
        disabled: false,
      },
    }
  )({
    size: props.size,
    variant: props.variant,
    state: props.modelValue ? 'checked' : 'unchecked',
    disabled: props.disabled,
  })
);
</script>
