import type { Meta, StoryObj } from '@storybook/vue3';

import Chip from '@/components/common/Chip.vue';

const meta: Meta<typeof Chip> = {
  title: 'Components/Tag/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A chip component for displaying tags or labels with an optional close button. Perfect for showing selected items, tags, or removable elements.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The text label displayed on the chip',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function triggered when the close button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Chip',
    onClose: () => {},
  },
};

// Short label
export const Short: Story = {
  args: {
    label: 'Tag',
    onClose: () => {},
  },
};

// Long label
export const Long: Story = {
  args: {
    label: 'This is a very long chip label that might truncate',
    onClose: () => {},
  },
};

// Without close functionality
export const WithoutClose: Story = {
  args: {
    label: 'Read-only Chip',
    onClose: undefined,
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => ({
    components: { Chip },
    data() {
      return {
        chips: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
      };
    },
    methods: {
      removeChip(index: number) {
        this.chips.splice(index, 1);
      },
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive Chips (Click to remove)</h3>
        <div class="flex gap-2 flex-wrap">
          <Chip 
            v-for="(chip, index) in chips" 
            :key="chip" 
            :label="chip"
            :onClose="() => removeChip(index)"
          />
        </div>
        <p class="text-sm text-gray-600">{{ chips.length }} chips remaining</p>
      </div>
    `,
  }),
};

// Multiple chips showcase
export const MultipleChips: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Technology Stack</h3>
          <div class="flex gap-2 flex-wrap">
            <Chip label="Vue.js" :onClose="() => {}" />
            <Chip label="TypeScript" :onClose="() => {}" />
            <Chip label="Tailwind CSS" :onClose="() => {}" />
            <Chip label="Vite" :onClose="() => {}" />
            <Chip label="Storybook" :onClose="() => {}" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Categories</h3>
          <div class="flex gap-2 flex-wrap">
            <Chip label="Frontend" :onClose="() => {}" />
            <Chip label="Backend" :onClose="() => {}" />
            <Chip label="DevOps" :onClose="() => {}" />
            <Chip label="Design" :onClose="() => {}" />
          </div>
        </div>
      </div>
    `,
  }),
};

// Dropdown item simulation
export const DropdownItems: Story = {
  render: () => ({
    components: { Chip },
    data() {
      return {
        items: ['Option 1', 'Option 2', 'Long Option Name', 'Another Item'],
      };
    },
    methods: {
      removeItem(index: number) {
        this.items.splice(index, 1);
      },
    },
    template: `
      <div class="p-4 bg-gray-200 rounded-lg border border-gray-300 max-w-md">
        <h3 class="text-sm font-semibold mb-3">Dropdown Items</h3>
        <div class="flex flex-wrap gap-2">
          <Chip 
            v-for="(item, index) in items" 
            :key="item" 
            :label="item"
            :onClose="() => removeItem(index)"
          />
        </div>
        <p class="text-xs text-gray-600 mt-2" v-if="items.length === 0">
          No items selected
        </p>
      </div>
    `,
  }),
};
