<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  id?: string;
  name?: string;
  label?: string;
  options: RadioOption[] | string[] | number[];
  modelValue?: string | number;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  id: 'radio-input',
  label: '',
  disabled: false,
  name: '',
  modelValue: '',
  options: () => [],
});

const containerClasses = cva('space-y-1');
const labelClasses = cva('text-sm font-normal text-gray-800', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
});

const emit = defineEmits<Emits>();

const isChecked = (option: RadioOption | string | number): boolean => {
  return props.modelValue === getOptionValue(option);
};

const selectOption = (value: string | number) => {
  emit('update:modelValue', value);
  emit('change', value);
};

const getOptionValue = (option: RadioOption | string | number): string | number => {
  if (typeof option === 'object' && option !== null) {
    return option.value;
  }
  return option;
};

const getOptionLabel = (option: RadioOption | string | number): string => {
  if (typeof option === 'object' && option !== null) {
    return option.label;
  }
  return String(option);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = isNaN(Number(target.value)) ? target.value : Number(target.value);

  emit('update:modelValue', value);
  emit('change', value);
};

const computedLabelClasses = computed(() => labelClasses({ disabled: props.disabled }));
</script>

<template>
  <div :class="containerClasses()">
    <label v-if="label" :class="computedLabelClasses">
      {{ label }}
    </label>
    <div class="mt-4 flex flex-col gap-4">
      <div v-for="option in options" :key="getOptionValue(option)" class="flex items-center">
        <div class="relative">
          <input :id="`${id}-${getOptionValue(option)}`" :name="name || id" :value="getOptionValue(option)"
            :checked="isChecked(option)" type="radio" class="sr-only" @change="handleChange" />
          <div
            class="border-button-primary flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-full border-2 transition-colors"
            :class="[isChecked(option) ? 'bg-button-primary' : 'bg-white']"
            @click="selectOption(getOptionValue(option))">
            <div v-if="isChecked(option)" class="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>
        <label :for="`${id}-${getOptionValue(option)}`"
          class="ml-3 cursor-pointer text-sm disabled:cursor-not-allowed disabled:opacity-50" :class="[
            isChecked(option) ? 'text-text-title font-medium' : 'text-text-subtitle font-normal',
          ]" @click="selectOption(getOptionValue(option))">
          {{ getOptionLabel(option) }}
        </label>
      </div>
    </div>
  </div>
</template>
