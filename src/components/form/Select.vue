<template>
  <div>
    <label v-if="label" :for="id" :class="computedLabelClasses">
      {{ label }}
    </label>
    <div :class="computedSelectWrapperClasses">
      <!-- Custom Select Button -->
      <button
        :id="id"
        type="button"
        @click="toggleDropdown"
        :class="computedSelectClasses"
        :disabled="disabled"
        @blur="handleBlur"
      >
        <span
          :class="[
            selectedOption?.text ? 'text-text-title font-medium' : 'text-text-placeholder',
            'block truncate text-left',
          ]"
        >
          {{ selectedOption?.text || placeholder }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            :class="
              [
                'text-icon-black h-5 w-5 transition-transform duration-200',
                isOpen ? 'rotate-180' : '',
              ].join(' ')
            "
          />
        </span>
      </button>

      <!-- Custom Dropdown -->
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
          class="bg-surface-primary-white shadow-small absolute z-[999] mt-1 max-h-60 w-full overflow-auto rounded-lg p-3"
        >
          <div
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="flex cursor-pointer items-center justify-between px-3 py-2 select-none hover:bg-gray-50"
          >
            <span
              :class="[
                'block truncate text-sm font-medium',
                selectedValue === option.value ? 'text-primary' : 'text-text-title',
              ]"
            >
              {{ option.text }}
            </span>

            <!-- Check icon for selected option -->
            <span v-if="selectedValue === option.value" class="text-icon-green flex items-center">
              <CheckIcon class="h-5 w-5" />
            </span>
          </div>
        </div>
      </Transition>
    </div>
    <p v-if="error" class="text-danger mt-2 text-sm font-normal">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed, nextTick, ref, toRefs } from 'vue';

import { CheckIcon, ChevronDownIcon } from '@/components/icons';

interface SelectOption {
  value: string | number;
  text: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as () => SelectOption[],
    required: true,
    validator: (value: unknown[]) =>
      value.every(
        (option) =>
          typeof option === 'object' && option !== null && 'value' in option && 'text' in option
      ),
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => 'custom-select-' + Math.random().toString(36).substring(2, 9),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select your field type',
  },
  variant: {
    type: String as () => 'default' | 'ghost',
    default: 'default',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const { modelValue } = toRefs(props);
const isOpen = ref(false);

const selectedValue = computed<string | number>({
  get: () => modelValue.value,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  },
});

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === selectedValue.value);
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: SelectOption) => {
  selectedValue.value = option.value;
  isOpen.value = false;
};

const handleBlur = async () => {
  // Add small delay to allow click events to fire first
  await nextTick();
  setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

const labelClasses = cva('block text-sm font-normal text-text-subtitle mb-2 rounded-md ', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
});

const selectWrapperClasses = cva('relative', {
  // Add any wrapper-specific variants here if needed
});

const selectClasses = cva(
  ' w-full cursor-default rounded-md  py-3 pl-3 pr-10 text-left  focus:outline-none focus:ring-1 sm:text-sm',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900 border cursor-pointer shadow-sm',
        ghost: 'bg-transparent text-gray-900 border-none shadow-none cursor-pointer',
      },
      disabled: {
        true: 'cursor-not-allowed !text-gray-800 !bg-surface-disable',
        false: 'bg-white text-gray-900 cursor-pointer',
      },
      error: {
        true: '!ring-1 !ring-danger focus:!ring-danger border-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
      error: false,
    },
    compoundVariants: [
      {
        variant: 'default',
        disabled: false,
        error: false,
        class: 'border-gray-300 focus:ring-primary focus:border-primary',
      },
      {
        variant: 'ghost',
        disabled: false,
        error: false,
        class: 'focus:ring-primary',
      },
      {
        variant: 'ghost',
        error: true,
        class: '!ring-1 !ring-danger focus:!ring-danger !border-0',
      },
    ],
  }
);

// Computed properties to apply disabled and error states to CVA classes
const computedLabelClasses = computed(() => labelClasses({ disabled: props.disabled }));
const computedSelectWrapperClasses = computed(() =>
  selectWrapperClasses({
    /* no specific variants for wrapper yet */
  })
);
const computedSelectClasses = computed(() =>
  selectClasses({
    disabled: props.disabled,
    error: props.error,
    variant: props.variant,
  })
);
</script>

<style scoped></style>
