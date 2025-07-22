// src/components/Select.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';

import Select from '@/components/form/Select.vue';

// Adjust the import path as needed

const meta: Meta<typeof Select> = {
  title: 'Components/Input/Select', // Category and name in Storybook UI
  component: Select,
  tags: ['autodocs'], // Enable autodocs for this component
  argTypes: {
    // Define argTypes to control how props are displayed and edited in Storybook UI
    modelValue: {
      control: { type: 'text' },
      description: 'The currently selected value.',
    },
    options: {
      control: 'object',
      description: 'An array of objects with `value` and `text` properties for the select options.',
    },
    label: {
      control: { type: 'text' },
      description: 'The label for the select input.',
    },
    id: {
      control: { type: 'text' },
      description: 'The unique ID for the select input.',
      table: {
        disable: true, // Hide from props table as it's auto-generated if not provided
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the select input.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Applies error styling to the select input.',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'The error message to display when `error` is true.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'The placeholder text for the select input.',
    },
  },
  args: {
    // Default args for all stories
    options: [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2' },
      { value: 'option3', text: 'Option 3' },
    ],
    label: 'Choose an option',
    placeholder: 'Select an item',
    modelValue: '', // Default empty selection
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/*
 * Stories
 * Each export is a story.
 * The 'args' define the initial state of the component for that story.
 */

// --- Basic Usage Story ---
export const Default: Story = {
  args: {
    // No specific args needed, will use meta.args
  },
};

// --- Pre-selected Option Story ---
export const PreselectedValue: Story = {
  args: {
    modelValue: 'option2',
  },
};

// --- Disabled State Story ---
export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'option1', // Can still show a pre-selected value even if disabled
  },
};

// --- Error State Story ---
export const ErrorState: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required.',
  },
};

// --- Long List of Options Story ---
export const ManyOptions: Story = {
  args: {
    label: 'Select a Country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', text: 'United States' },
      { value: 'ca', text: 'Canada' },
      { value: 'mx', text: 'Mexico' },
      { value: 'gb', text: 'United Kingdom' },
      { value: 'fr', text: 'France' },
      { value: 'de', text: 'Germany' },
      { value: 'jp', text: 'Japan' },
      { value: 'au', text: 'Australia' },
      { value: 'br', text: 'Brazil' },
      { value: 'in', text: 'India' },
      { value: 'cn', text: 'China' },
      { value: 'za', text: 'South Africa' },
      { value: 'eg', text: 'Egypt' },
      { value: 'ar', text: 'Argentina' },
      { value: 'kr', text: 'South Korea' },
    ],
  },
};

// --- Custom ID Example (though generally not needed for basic stories) ---
export const CustomId: Story = {
  args: {
    id: 'my-unique-select',
    label: 'Select with Custom ID',
  },
};
