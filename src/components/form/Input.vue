<template>
  <div :class="containerClasses()">
    <label v-if="props.label" :for="id" :class="computedLabelClasses">{{ label }}</label>
    <div :class="computedInputWrapperClasses">
      <input
        v-bind="$attrs"
        :id="id"
        type="text"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        :class="computedInputClasses"
        :disabled="disabled"
      />
      <!-- Character Counter - only show if maxlength is present in attrs -->
      <div
        v-if="attrs.maxlength"
        class="text-text-title pointer-events-none absolute right-3 bottom-2 text-xs font-semibold"
      >
        {{ currentLength }}/{{ attrs.maxlength }}
      </div>
    </div>
    <p v-if="error" class="text-danger mt-2 text-sm font-normal">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  id: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: 'channel-name-input',
  disabled: false,
  error: false,
  errorMessage: 'This field has an error',
  modelValue: '',
});

const attrs = useAttrs();
const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

// CVA classes for styling
const containerClasses = cva('space-y-1');

const labelClasses = cva('text-sm font-normal text-text-subtitle', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
});

const inputWrapperClasses = cva('mt-2 relative rounded-lg shadow-small bg-surface-primary-white', {
  variants: {
    disabled: {
      true: 'bg-gray-50 ring-gray-200',
    },
    error: {
      true: 'ring-red-500 focus-within:ring-red-500', // Error ring color
    },
  },
  // Default ring color when not disabled and not in error
  defaultVariants: {
    disabled: false,
    error: false,
  },
  compoundVariants: [
    {
      disabled: false,
      error: false,
      class: 'focus-within:ring-primary', // Default focus ring color
    },
  ],
});

const inputClasses = cva(
  'block w-full border-0 bg-white text-text-title placeholder:text-text-placeholder focus:ring-1 ring-primary sm:text-sm sm:leading-6 outline-none rounded-lg',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed !text-gray-800 !bg-surface-disable',
      },
      error: {
        true: '!ring-1 !ring-danger focus:!ring-danger',
      },
      hasCounter: {
        true: 'py-3 pb-8 px-4',
        false: 'py-3 px-4',
      },
    },
  }
);

// Computed properties to apply disabled and error states to CVA classes
const computedLabelClasses = computed(() => labelClasses({ disabled: props.disabled }));
const computedInputWrapperClasses = computed(() =>
  inputWrapperClasses({ disabled: props.disabled, error: props.error })
);
const computedInputClasses = computed(() =>
  inputClasses({
    disabled: props.disabled,
    error: props.error,
    hasCounter: !!attrs.maxlength,
  })
);
const currentLength = computed(() => {
  return String(props.modelValue).length;
});
</script>
