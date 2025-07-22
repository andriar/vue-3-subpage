import type { Meta, StoryObj } from '@storybook/vue3';

import Input from '@/components/form/Input.vue';

// Adjust the path to your component

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The value of the input.',
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
      description: 'If true, the input field will be disabled.',
    },
    error: {
      control: 'boolean',
      description: 'If true, the input field will display an error state.',
    },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when `error` is true.',
    },
  },
  args: {
    modelValue: '',
    label: 'Channel Name',
    placeholder: 'e.g. My Awesome Channel',
    id: 'default-input',
    disabled: false,
    error: false,
    errorMessage: 'This field has an error',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/*
 * Stories
 */

export const Default: Story = {
  args: {
    modelValue: '',
  },
};

export const WithPlaceholder: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter your name here',
  },
};

export const WithInitialValue: Story = {
  args: {
    modelValue: 'Initial Channel Name',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 'Disabled Value',
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    modelValue: 'Invalid input',
    error: true,
    errorMessage: 'Channel name is too short',
  },
};

export const NoLabel: Story = {
  args: {
    modelValue: 'Input without a label',
    label: '', // Set label to an empty string to hide it
  },
};

export const CustomId: Story = {
  args: {
    modelValue: 'Custom ID Input',
    id: 'my-custom-input-id',
  },
};
