import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref } from 'vue';

import TextArea from '@/components/form/TextArea.vue';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Input/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible textarea component with auto-resize functionality, customizable height limits, validation states, and clean styling. Features automatic height adjustment based on content while respecting minimum and maximum height constraints.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the textarea',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when textarea is empty',
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the textarea',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is disabled',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether to show error state styling',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display when in error state',
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Minimum height of the textarea (CSS units)',
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height of the textarea (CSS units)',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'The current value of the textarea',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...',
    id: 'description',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
        <div v-if="value" class="mt-4 text-sm text-gray-600">
          <p><strong>Current value:</strong></p>
          <pre class="bg-gray-50 p-2 rounded text-xs">{{ value }}</pre>
          <p class="mt-2"><strong>Character count:</strong> {{ value.length }}</p>
        </div>
      </div>
    `,
  }),
};

// With initial content
export const WithContent: Story = {
  args: {
    label: 'Message',
    placeholder: 'Write your message...',
    id: 'message',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(
        'This is some initial content that demonstrates how the textarea auto-resizes based on the amount of text. You can continue typing and it will expand up to the maximum height limit.'
      );
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

// Error state
export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Please enter your comments...',
    id: 'comments',
    error: true,
    errorMessage: 'This field is required and must be at least 10 characters long.',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('Too short');
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Read-only Content',
    id: 'readonly',
    disabled: true,
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref(
        'This textarea is disabled and cannot be edited. It shows how the component looks in a read-only state with proper styling to indicate it cannot be interacted with.'
      );
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

// Custom height limits
export const CustomHeight: Story = {
  args: {
    label: 'Large Text Area',
    placeholder: 'This textarea has custom height limits...',
    id: 'large-textarea',
    minHeight: '120px',
    maxHeight: '300px',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
        <p class="text-xs text-gray-500 mt-2">
          Min height: {{ args.minHeight }}, Max height: {{ args.maxHeight }}
        </p>
      </div>
    `,
  }),
};

// Compact textarea
export const Compact: Story = {
  args: {
    label: 'Short Note',
    placeholder: 'Brief note...',
    id: 'compact',
    minHeight: '60px',
    maxHeight: '120px',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
        <p class="text-xs text-gray-500 mt-2">
          Compact version with smaller height limits
        </p>
      </div>
    `,
  }),
};

// No label
export const NoLabel: Story = {
  args: {
    placeholder: 'Enter text without a label...',
    id: 'no-label',
    label: '',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

// Interactive feedback example
export const Interactive: Story = {
  args: {
    label: 'Interactive Feedback',
    placeholder: 'Start typing to see real-time feedback...',
    id: 'interactive',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      const wordCount = computed(() =>
        value.value.trim() ? value.value.trim().split(/\s+/).length : 0
      );
      const charCount = computed(() => value.value.length);
      const isError = computed(() => charCount.value > 0 && charCount.value < 10);

      return { args, value, wordCount, charCount, isError };
    },
    template: `
      <div class="w-96 space-y-4">
        <TextArea 
          v-bind="args" 
          v-model="value" 
          :error="isError"
          :error-message="isError ? 'Please enter at least 10 characters' : ''"
        />
        
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="bg-blue-50 p-3 rounded-lg">
            <p class="font-medium text-blue-800">Characters</p>
            <p class="text-blue-600 text-xl font-bold">{{ charCount }}</p>
          </div>
          <div class="bg-green-50 p-3 rounded-lg">
            <p class="font-medium text-green-800">Words</p>
            <p class="text-green-600 text-xl font-bold">{{ wordCount }}</p>
          </div>
        </div>
        
        <div v-if="value" class="bg-gray-50 p-3 rounded-lg">
          <p class="font-medium text-gray-700 mb-2">Live Preview:</p>
          <div class="text-gray-600 text-sm whitespace-pre-wrap">{{ value }}</div>
        </div>
      </div>
    `,
  }),
};

// Form validation example
export const FormValidation: Story = {
  args: {
    label: 'Product Description',
    placeholder: 'Describe your product in detail...',
    id: 'product-description',
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('');
      const touched = ref(false);
      const minLength = 20;
      const maxLength = 500;

      const isValid = computed(
        () => value.value.length >= minLength && value.value.length <= maxLength
      );

      const errorMessage = computed(() => {
        if (!touched.value) return '';
        if (value.value.length < minLength) {
          return `Description must be at least ${minLength} characters long (currently ${value.value.length})`;
        }
        if (value.value.length > maxLength) {
          return `Description must be no more than ${maxLength} characters long (currently ${value.value.length})`;
        }
        return '';
      });

      const handleBlur = () => {
        touched.value = true;
      };

      return { args, value, touched, isValid, errorMessage, maxLength, handleBlur };
    },
    template: `
      <div class="w-96 space-y-4">
        <TextArea 
          v-bind="args" 
          v-model="value" 
          :error="touched && !isValid"
          :error-message="errorMessage"
          @blur="handleBlur"
        />
        
        <div class="flex justify-between items-center text-sm">
          <span :class="isValid ? 'text-green-600' : 'text-red-600'">
            {{ value.length }}/{{ maxLength }} characters
          </span>
          <div class="flex items-center gap-2">
            <div :class="[
              'w-3 h-3 rounded-full', 
              isValid ? 'bg-green-500' : 'bg-red-500'
            ]"></div>
            <span class="text-xs text-gray-500">
              {{ isValid ? 'Valid' : 'Invalid' }}
            </span>
          </div>
        </div>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { TextArea },
    setup() {
      const defaultValue = ref('');
      const errorValue = ref('Invalid input');
      const disabledValue = ref('This content cannot be edited');
      const largeValue = ref(
        'This is a larger textarea with custom height limits. It can expand to accommodate more content while maintaining its maximum height constraint.'
      );

      return { defaultValue, errorValue, disabledValue, largeValue };
    },
    template: `
      <div class="space-y-8 w-full max-w-4xl">
        <div>
          <h3 class="text-lg font-semibold mb-4">Default TextArea</h3>
          <div class="w-96">
            <TextArea 
              v-model="defaultValue"
              label="Standard Description"
              placeholder="Enter your text here..."
              id="default-demo"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Error State</h3>
          <div class="w-96">
            <TextArea 
              v-model="errorValue"
              label="Invalid Input"
              placeholder="This field has an error..."
              id="error-demo"
              :error="true"
              error-message="This field contains invalid information"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Disabled State</h3>
          <div class="w-96">
            <TextArea 
              v-model="disabledValue"
              label="Read-only Content"
              id="disabled-demo"
              :disabled="true"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Custom Height Limits</h3>
          <div class="w-96">
            <TextArea 
              v-model="largeValue"
              label="Extended Content"
              placeholder="Large textarea with custom limits..."
              id="large-demo"
              min-height="120px"
              max-height="300px"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Compact Version</h3>
          <div class="w-96">
            <TextArea 
              v-model="defaultValue"
              label="Brief Note"
              placeholder="Short message..."
              id="compact-demo"
              min-height="60px"
              max-height="120px"
            />
          </div>
        </div>
      </div>
    `,
  }),
};
