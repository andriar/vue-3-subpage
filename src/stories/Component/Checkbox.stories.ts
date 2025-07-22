// FormCheckbox.stories.ts or FormCheckbox.stories.js (depending on your preference)
import type { Meta, StoryObj } from '@storybook/vue3';

import Checkbox from '@/components/common/Checkbox.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/api/doc-block-meta
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Input/Checkbox', // This is how your component will appear in the Storybook sidebar
  component: Checkbox,
  tags: ['autodocs'], // This enables auto-generated documentation for your component
  argTypes: {
    // Define controls for your props in Storybook UI
    modelValue: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox.',
    },
    label: {
      control: 'text',
      description: 'The text label displayed next to the checkbox.',
    },
    id: {
      control: 'text',
      description: 'Optional unique ID for the checkbox input. Auto-generated if not provided.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox, making it unclickable and visually distinct.',
    },
  },
  args: {
    // Default values for controls in all stories
    modelValue: false,
    label: 'Check me out',
    disabled: false,
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default: StoryObj<typeof Checkbox> = {
  args: {
    // This story uses the default args set in meta
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    modelValue: true,
    label: 'I am checked!',
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  args: {
    disabled: true,
    label: 'Cannot click me',
  },
};

export const CheckedAndDisabled: StoryObj<typeof Checkbox> = {
  args: {
    modelValue: true,
    disabled: true,
    label: 'Checked and disabled',
  },
};

export const CustomLabel: StoryObj<typeof Checkbox> = {
  args: {
    label: 'Accept Terms and Conditions',
  },
};
