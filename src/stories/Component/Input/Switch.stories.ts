import type { Meta, StoryObj } from '@storybook/vue3';

import Switch from '@/components/common/Switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Components/Input/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component with multiple variants, sizes, and accessibility features. Supports keyboard navigation and screen readers.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: 'The current state of the switch (v-model)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the switch',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger'],
      description: 'The visual variant of the switch',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label for screen readers',
    },
    ariaDescribedby: {
      control: { type: 'text' },
      description: 'ID of element that describes the switch',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    modelValue: false,
  },
};

// Checked state
export const Checked: Story = {
  args: {
    modelValue: true,
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'small',
    modelValue: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    modelValue: false,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    modelValue: false,
  },
};

// Variant variants
export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    modelValue: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    modelValue: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    modelValue: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    modelValue: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    modelValue: true,
  },
};

// With accessibility
export const WithAccessibility: Story = {
  args: {
    modelValue: false,
    ariaLabel: 'Enable notifications',
    ariaDescribedby: 'notifications-desc',
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-2">
        <Switch v-bind="args" />
        <p id="notifications-desc" class="text-sm text-gray-600">
          Receive push notifications for important updates
        </p>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        switches: {
          default: false,
          success: true,
          warning: false,
          danger: true,
        },
      };
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Variants</h3>
          <div class="flex gap-6 items-center flex-wrap">
            <div class="flex items-center gap-2">
              <Switch v-model="switches.default" variant="default" />
              <span class="text-sm">Default</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch v-model="switches.success" variant="success" />
              <span class="text-sm">Success</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch v-model="switches.warning" variant="warning" />
              <span class="text-sm">Warning</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch v-model="switches.danger" variant="danger" />
              <span class="text-sm">Danger</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Sizes</h3>
          <div class="flex gap-6 items-center flex-wrap">
            <div class="flex items-center gap-2">
              <Switch size="small" />
              <span class="text-sm">Small</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch size="medium" />
              <span class="text-sm">Medium</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch size="large" />
              <span class="text-sm">Large</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">States</h3>
          <div class="flex gap-6 items-center flex-wrap">
            <div class="flex items-center gap-2">
              <Switch />
              <span class="text-sm">Normal</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch disabled />
              <span class="text-sm">Disabled</span>
            </div>
            <div class="flex items-center gap-2">
              <Switch disabled :model-value="true" />
              <span class="text-sm">Disabled (Checked)</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => ({
    components: { Switch },
    data() {
      return {
        notifications: false,
        darkMode: true,
        autoSave: false,
        analytics: true,
      };
    },
    template: `
      <div class="space-y-4 max-w-md">
        <h3 class="text-lg font-semibold mb-4">Interactive Examples</h3>
        
        <div class="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 class="font-medium">Push Notifications</h4>
            <p class="text-sm text-gray-600">Receive notifications for updates</p>
          </div>
          <Switch v-model="notifications" variant="success" />
        </div>
        
        <div class="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 class="font-medium">Dark Mode</h4>
            <p class="text-sm text-gray-600">Switch to dark theme</p>
          </div>
          <Switch v-model="darkMode" variant="default" />
        </div>
        
        <div class="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 class="font-medium">Auto Save</h4>
            <p class="text-sm text-gray-600">Automatically save changes</p>
          </div>
          <Switch v-model="autoSave" variant="warning" />
        </div>
        
        <div class="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 class="font-medium">Analytics</h4>
            <p class="text-sm text-gray-600">Share usage data</p>
          </div>
          <Switch v-model="analytics" variant="danger" />
        </div>
      </div>
    `,
  }),
};

// Playground
export const Playground: Story = {
  args: {
    modelValue: false,
    size: 'medium',
    variant: 'default',
    disabled: false,
    ariaLabel: 'Toggle switch',
  },
};
