import type { Meta, StoryObj } from '@storybook/vue3';

import InputCustom from '@/components/form/InputCustom.vue';
// Assuming TextInput.vue is in the same directory or adjust the path
import Icon from '@/components/icons/Icon.vue';

const meta: Meta<typeof InputCustom> = {
  title: 'Components/Input/InputCustom',
  component: InputCustom,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The v-model bound value of the input.',
    },
    label: {
      control: 'text',
      description: 'The label for the input field.',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input field.',
    },
    id: {
      control: 'text',
      description: 'The unique ID for the input element.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field if true.',
    },
    error: {
      control: 'boolean',
      description: 'Applies error styling to the input field if true.',
    },
    errorMessage: {
      control: 'text',
      description: 'The error message displayed when `error` is true.',
    },
    clearable: {
      control: 'boolean',
      description: 'Shows a clear button if the input has a value.',
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'The type of the input field (text or password).',
    },
    // Slots
    'suffix-icon': {
      control: false, // Hide slot from controls table
      description: 'Slot for a suffix icon.',
    },
    'append-button': {
      control: false, // Hide slot from controls table
      description: 'Slot for an appended button.',
    },
  },
  args: {
    // Default values for controls
    modelValue: '',
    label: 'Channel Name',
    placeholder: 'Enter channel name',
    id: 'channel-name-input',
    disabled: false,
    error: false,
    errorMessage: 'This field has an error',
    clearable: false,
    type: 'text',
  },
};

export default meta;

type Story = StoryObj<typeof InputCustom>;

/*
 * Stories
 * Each story represents a specific state or variation of the component.
 */

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text here',
  },
};

export const WithValue: Story = {
  args: {
    modelValue: 'Initial Value',
    label: 'Input with Value',
  },
};

export const PlaceholderOnly: Story = {
  args: {
    label: '', // No label for this story
    placeholder: 'Enter your email address',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const ClearableInput: Story = {
  args: {
    modelValue: 'Text to clear',
    label: 'Clearable Input',
    clearable: true,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 'Disabled Text',
    label: 'Disabled Input',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    modelValue: 'Invalid Value',
    label: 'Input with Error',
    error: true,
    errorMessage: 'This field has an error, please correct it.',
  },
};

export const WithSuffixIcon: Story = {
  args: {
    label: 'Search Input',
    placeholder: 'Search...',
  },
  render: (args) => ({
    components: { InputCustom, Icon }, // Make sure Icon component is imported
    setup() {
      return { args };
    },
    template: `
      <InputCustom v-bind="args">
        <template #suffix-icon>
          <Icon name="search" class="h-5 w-5 text-gray-800" />
        </template>
      </InputCustom>
    `,
  }),
};

export const WithAppendButton: Story = {
  args: {
    label: 'URL Input',
    placeholder: 'https://example.com',
    modelValue: 'https://',
  },
  render: (args) => ({
    components: { InputCustom },
    setup() {
      return { args };
    },
    template: `
      <InputCustom v-bind="args">
        <template #append-button="{ disabled }">
          <button :disabled="disabled">Go</button>
        </template>
      </InputCustom>
    `,
  }),
};

export const FullFeatured: Story = {
  args: {
    modelValue: 'Some Value',
    label: 'Full Featured Input',
    placeholder: 'Try everything!',
    clearable: true,
    type: 'text',
    error: false,
    errorMessage: 'Something went wrong.',
  },
  render: (args) => ({
    components: { InputCustom, Icon },
    setup() {
      return { args };
    },
    template: `
      <InputCustom v-bind="args">
        <template #suffix-icon>
          <Icon name="user" class="h-5 w-5 text-gray-800" />
        </template>
        <template #append-button="{ disabled }">
          <button :disabled="disabled">Submit</button>
        </template>
      </InputCustom>
    `,
  }),
};
