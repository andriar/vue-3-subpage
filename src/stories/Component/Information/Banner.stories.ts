import type { Meta, StoryObj } from '@storybook/vue3';

import Banner from '@/components/common/Banner.vue';

const meta: Meta<typeof Banner> = {
  title: 'Components/Information/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['positive', 'negative', 'warning'],
      description: 'Defines the semantic meaning and color of the banner.',
    },
    type: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
      description: 'Determines the visual style of the banner (solid background or outlined).',
    },
    closeable: {
      control: 'boolean',
      description: 'If true, a close button will be displayed on the banner.',
    },
    default: {
      control: { type: 'text' },
      description: 'The content to display inside the banner.',
      table: {
        type: { summary: 'slot' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    intent: 'positive',
    type: 'solid',
    closeable: false,
    default: 'This is a default positive solid banner.',
  },
};

export const PositiveSolid: Story = {
  args: {
    intent: 'positive',
    type: 'solid',
    default: 'Your action was successful!',
  },
};

export const PositiveOutline: Story = {
  args: {
    intent: 'positive',
    type: 'outline',
    default: 'Information: This is an outline positive banner.',
  },
};

export const NegativeSolid: Story = {
  args: {
    intent: 'negative',
    type: 'solid',
    default: 'Error: Something went wrong. Please try again.',
  },
};

export const NegativeOutline: Story = {
  args: {
    intent: 'negative',
    type: 'outline',
    default: 'Warning: Your session is about to expire.',
  },
};

export const WarningSolid: Story = {
  args: {
    intent: 'warning',
    type: 'solid',
    default: 'Caution: This action cannot be undone.',
  },
};

export const WarningOutline: Story = {
  args: {
    intent: 'warning',
    type: 'outline',
    default: 'Heads up: Review your changes before saving.',
  },
};

export const CloseableBanner: Story = {
  args: {
    intent: 'positive',
    type: 'solid',
    closeable: true,
    default: 'You can close this banner by clicking the X.',
  },
};
