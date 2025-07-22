import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import RadioInput from '@/components/form/RadioInput.vue';

const meta: Meta<typeof RadioInput> = {
  title: 'Components/Input/RadioInput',
  component: RadioInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description:
        'Array of options - can be strings, numbers, or objects with label/value properties',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'The selected value',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the radio group',
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the radio group',
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for the radio inputs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    modelValue: 'Option 1',
  },
  render: (args) => ({
    components: { RadioInput },
    setup() {
      const selectedValue = ref(args.modelValue);
      return {
        args: { ...args, modelValue: selectedValue },
        selectedValue,
      };
    },
    template: `
      <div class="w-80">
        <RadioInput 
          v-bind="args" 
          v-model="selectedValue"
          @change="(value) => console.log('Selected:', value)"
        />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};

export const WithObjectOptions: Story = {
  args: {
    label: 'Select your preference',
    options: [
      { label: 'Small (S)', value: 'small' },
      { label: 'Medium (M)', value: 'medium' },
      { label: 'Large (L)', value: 'large' },
      { label: 'Extra Large (XL)', value: 'xl' },
    ],
    modelValue: 'medium',
  },
  render: (args) => ({
    components: { RadioInput },
    setup() {
      const selectedValue = ref(args.modelValue);
      return {
        args: { ...args, modelValue: selectedValue },
        selectedValue,
      };
    },
    template: `
      <div class="w-80">
        <RadioInput 
          v-bind="args" 
          v-model="selectedValue"
          @change="(value) => console.log('Selected:', value)"
        />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};

export const WithNumericOptions: Story = {
  args: {
    label: 'Rating',
    options: [1, 2, 3, 4, 5],
    modelValue: 3,
  },
  render: (args) => ({
    components: { RadioInput },
    setup() {
      const selectedValue = ref(args.modelValue);
      return {
        args: { ...args, modelValue: selectedValue },
        selectedValue,
      };
    },
    template: `
      <div class="w-80">
        <RadioInput 
          v-bind="args" 
          v-model="selectedValue"
          @change="(value) => console.log('Selected:', value)"
        />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};

export const WithMixedOptions: Story = {
  args: {
    label: 'Priority Level',
    options: [
      { label: 'Low Priority', value: 1 },
      { label: 'Medium Priority', value: 2 },
      { label: 'High Priority', value: 3 },
      { label: 'Critical', value: 4 },
    ],
    modelValue: 2,
  },
  render: (args) => ({
    components: { RadioInput },
    setup() {
      const selectedValue = ref(args.modelValue);
      return {
        args: { ...args, modelValue: selectedValue },
        selectedValue,
      };
    },
    template: `
      <div class="w-80">
        <RadioInput 
          v-bind="args" 
          v-model="selectedValue"
          @change="(value) => console.log('Selected:', value)"
        />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  args: {
    options: ['Yes', 'No', 'Maybe'],
    modelValue: 'No',
  },
  render: (args) => ({
    components: { RadioInput },
    setup() {
      const selectedValue = ref(args.modelValue);
      return {
        args: { ...args, modelValue: selectedValue },
        selectedValue,
      };
    },
    template: `
      <div class="w-80">
        <RadioInput 
          v-bind="args" 
          v-model="selectedValue"
          @change="(value) => console.log('Selected:', value)"
        />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
};
