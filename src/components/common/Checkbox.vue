<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

const checkboxWrapperVariants = cva('flex items-center space-x-2 cursor-pointer select-none', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const checkboxInputVariants = cva(
  'appearance-none h-5 w-5 border-2 rounded-sm focus:outline-none ',
  {
    variants: {
      checked: {
        true: 'bg-primary text-white',
        false: 'bg-white border-gray-300',
      },
      disabled: {
        true: '!cursor-not-allowed !border-gray-800 !bg-surface-disable !text-text-disable',
        false: 'border-primary',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

const checkboxIconVariants = cva('h-4 w-4 ', {
  variants: {
    checked: {
      true: 'block',
      false: 'hidden',
    },
    disabled: {
      true: '!text-gray-800 !opacity-50',
      false: 'text-white',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

const labelVariants = cva('text-text-subtitle text-sm font-medium', {
  variants: {
    disabled: {
      true: 'text-gray-800',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

interface FormCheckboxProps {
  modelValue: boolean;
  label: string;
  id: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<FormCheckboxProps>(), {
  id: '',
  disabled: false,
});

const emit = defineEmits(['update:modelValue']);

const uniqueId = computed(
  () => props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`
);

const wrapperClasses = computed(() => checkboxWrapperVariants({ disabled: props.disabled }));
const inputClasses = computed(() =>
  checkboxInputVariants({ checked: props.modelValue, disabled: props.disabled })
);
const labelClasses = computed(() => labelVariants({ disabled: props.disabled }));

const toggleCheckbox = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<template>
  <label :for="uniqueId" :class="wrapperClasses" @click="toggleCheckbox">
    <div :class="[
      inputClasses,
      'relative flex items-center justify-center transition-all duration-200 ease-in-out',
    ]" :tabindex="disabled ? -1 : 0" @keydown.space.prevent="toggleCheckbox" @keydown.enter.prevent="toggleCheckbox">
      <input type="checkbox" :id="uniqueId" :checked="modelValue" :disabled="disabled" class="sr-only"
        @change="toggleCheckbox" />
      <svg v-if="modelValue" :class="checkboxIconVariants({ checked: modelValue, disabled: disabled })" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <span :class="labelClasses">{{ label }}</span>
  </label>
</template>
