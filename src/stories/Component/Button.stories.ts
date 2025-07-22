// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';

import Button from '@/components/common/Button.vue';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible button component with multiple variants, sizes, and states. Supports both regular buttons and router links.',
      },
    },
  },
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'flat'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'large'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'rectangular'],
      description: 'Shape of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'rounded' },
      },
    },
    to: {
      control: { type: 'text' },
      description: 'Router link destination (makes button a router-link)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    disableAnimation: {
      control: { type: 'boolean' },
      description: 'Disable hover and active animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: { type: 'text' },
      description: 'HTML id attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    // Slot controls
    default: {
      control: { type: 'text' },
      description: 'Button text content',
      table: {
        type: { summary: 'slot' },
      },
    },
    prefixIcon: {
      control: { type: 'boolean' },
      description: 'Show prefix icon',
      table: {
        type: { summary: 'slot' },
      },
    },
    suffixIcon: {
      control: { type: 'boolean' },
      description: 'Show suffix icon',
      table: {
        type: { summary: 'slot' },
      },
    },
  },
  args: {
    default: 'Button',
    prefixIcon: false,
    suffixIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};

// Intent variants
export const Primary: Story = {
  args: {
    intent: 'primary',
    default: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    default: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    intent: 'danger',
    default: 'Danger Button',
  },
};

export const Flat: Story = {
  args: {
    intent: 'flat',
    default: 'Flat Button',
  },
};

// Size variants
export const ExtraSmall: Story = {
  args: {
    size: 'xsmall',
    default: 'Extra Small',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    default: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    default: 'Large Button',
  },
};

// Shape variants
export const Rounded: Story = {
  args: {
    shape: 'rounded',
    default: 'Rounded Button',
  },
};

export const Rectangular: Story = {
  args: {
    shape: 'rectangular',
    default: 'Rectangular Button',
  },
};

// State variants
export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled Button',
  },
};

export const WithoutAnimation: Story = {
  args: {
    disableAnimation: true,
    default: 'No Animation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with animations disabled - no hover effects or active scale.',
      },
    },
  },
};

// Router link variant
export const AsRouterLink: Story = {
  args: {
    to: '/example',
    default: 'Router Link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button rendered as a router-link when `to` prop is provided.',
      },
    },
  },
};

// With icons
export const WithPrefixIcon: Story = {
  args: {
    default: 'With Prefix',
    prefixIcon: true,
  },
  render: (args) => ({
    components: { Button, PlusIcon },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" @click="args.onClick">
        <template #prefixIcon>
          <PlusIcon />
        </template>
        {{ args.default }}
      </Button>
    `,
  }),
};

export const WithSuffixIcon: Story = {
  args: {
    default: 'With Suffix',
    suffixIcon: true,
  },
  render: (args) => ({
    components: { Button, ChevronRightIcon },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" @click="args.onClick">
        {{ args.default }}
        <template #suffixIcon>
          <ChevronRightIcon />
        </template>
      </Button>
    `,
  }),
};

export const WithBothIcons: Story = {
  args: {
    default: 'Both Icons',
    prefixIcon: true,
    suffixIcon: true,
  },
  render: (args) => ({
    components: { Button, PlusIcon, ChevronRightIcon },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" @click="args.onClick">
        <template #prefixIcon>
          <PlusIcon />
        </template>
        {{ args.default }}
        <template #suffixIcon>
          <ChevronRightIcon />
        </template>
      </Button>
    `,
  }),
};

// All intents showcase
export const AllIntents: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="flat">Flat</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button intent variants displayed together.',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 items-center flex-wrap">
        <Button size="xsmall">Extra Small</Button>
        <Button size="small">Small</Button>
        <Button size="large">Large</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};

// Disabled states showcase
export const DisabledStates: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button intent="primary" disabled>Primary Disabled</Button>
        <Button intent="secondary" disabled>Secondary Disabled</Button>
        <Button intent="danger" disabled>Danger Disabled</Button>
        <Button intent="flat" disabled>Flat Disabled</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button intents in disabled state.',
      },
    },
  },
};

// Form buttons
export const FormButtons: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button type="submit" intent="primary">Submit</Button>
        <Button type="reset" intent="secondary">Reset</Button>
        <Button type="button" intent="flat">Cancel</Button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different HTML types for form usage.',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    intent: 'primary',
    size: 'small',
    disabled: false,
    shape: 'rounded',
    disableAnimation: false,
    default: 'Playground Button',
    id: 'playground-btn',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all button properties. Use the controls panel to experiment with different combinations.',
      },
    },
  },
};
