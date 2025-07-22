import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

// Needed for `faqItems`
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';

// Adjust path if needed

// --- IMPORTANT PATHING NOTE ---
// Ensure the path for CollapsibleGroup is correct relative to THIS .stories.ts file.
// Example:
// If your structure is:
// - src/
//   - components/
//     - CollapsibleComponent.vue
//     - CollapsibleGroup.vue
//   - stories/
//     - CollapsibleGroup.stories.ts
//
// Then the path would be:
// import CollapsibleGroup from '../components/CollapsibleGroup.vue';
// ------------------------------

const meta = {
  title: 'Components/CollapsibleGroup', // Grouped under Components, distinct from single CollapsibleComponent
  component: CollapsibleGroup,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object', // Allows editing the array of items in Storybook's Controls panel
      description: 'An array of objects, each representing a collapsible item.',
      table: {
        type: { summary: 'CollapsibleItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
} satisfies Meta<typeof CollapsibleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Define a common set of FAQ items to use across stories
const defaultFaqItems = ref([
  {
    id: 'faq-1',
    title: 'What is your refund policy?',
    content:
      '<p class="text-gray-700">Our refund policy allows returns within 30 days of purchase. Please see our full terms for more details. For digital products, refunds are only available if the product is proven to be defective or not as described.</p>',
    initiallyOpen: true, // This item will be open by default
  },
  {
    id: 'faq-2',
    title: 'How do I contact support?',
    content:
      '<p class="text-gray-700">You can contact our support team via email at <a href="mailto:support@example.com" class="text-blue-600 hover:underline">support@example.com</a> or by calling <strong>1-800-555-1234</strong> during business hours (9 AM - 5 PM WIB, Monday to Friday).</p>',
  },
  {
    id: 'faq-3',
    title: 'Can I change my password?',
    content:
      '<p class="text-gray-700">Yes, you can change your password from your account settings page. Look for the "Security" or "Password" section.</p>',
  },
  {
    id: 'faq-4',
    title: 'Do you offer international shipping?',
    content:
      '<p class="text-gray-700">Currently, we only ship within Indonesia. We are working on expanding our shipping options in the near future!</p>',
  },
]);

// Story 1: Default FAQ Group (using the predefined items)
export const DefaultFaqGroup: Story = {
  args: {
    items: defaultFaqItems.value, // Pass the ref's value
  },
  render: (args) => ({
    components: { CollapsibleGroup },
    setup() {
      return { args };
    },
    template: `
      <div class="p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <CollapsibleGroup v-bind="args" />
      </div>
    `,
  }),
};

// Story 2: All Collapsed Initially
export const AllCollapsed: Story = {
  args: {
    // Create new items where 'initiallyOpen' is explicitly false or omitted
    items: defaultFaqItems.value.map((item) => ({ ...item, initiallyOpen: false })),
  },
  render: (args) => ({
    components: { CollapsibleGroup },
    setup() {
      return { args };
    },
    template: `
      <div class="p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-center">All Questions Collapsed</h2>
        <CollapsibleGroup v-bind="args" />
      </div>
    `,
  }),
};

// Story 3: Single Item Group
export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 'single-faq',
        title: 'This is a single FAQ item.',
        content:
          '<p class="text-gray-700">Sometimes you just need one collapsible item. Here it is!</p>',
        initiallyOpen: true,
      },
    ],
  },
  render: (args) => ({
    components: { CollapsibleGroup },
    setup() {
      return { args };
    },
    template: `
      <div class="p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-center">Single Collapsible Item</h2>
        <CollapsibleGroup v-bind="args" />
      </div>
    `,
  }),
};

// Story 4: Empty Group
export const EmptyGroup: Story = {
  args: {
    items: [], // An empty array
  },
  render: (args) => ({
    components: { CollapsibleGroup },
    setup() {
      return { args };
    },
    template: `
      <div class="p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-center">Empty FAQ Section</h2>
        <CollapsibleGroup v-bind="args" />
        <p class="mt-4 text-gray-500 text-center">No FAQ items available at the moment.</p>
      </div>
    `,
  }),
};
