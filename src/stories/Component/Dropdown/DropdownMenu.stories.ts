import type { Meta, StoryObj } from '@storybook/vue3';

import DropdownMenu from '@/components/common/DropdownMenu.vue';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile dropdown menu component with kebab icon trigger. Features click-outside-to-close functionality, smooth animations, and customizable options with actions.',
      },
    },
  },
  argTypes: {
    options: {
      control: { type: 'object' },
      description:
        'Array of dropdown options with label, value, icon, class, and action properties',
    },
    iconSize: {
      control: { type: 'number', min: 16, max: 32, step: 2 },
      description: 'Size of the kebab icon trigger',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the dropdown relative to the trigger',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic options for stories
const basicOptions = [
  {
    label: 'Edit',
    value: 'edit',
    action: () => alert('Edit clicked!'),
  },
  {
    label: 'Copy',
    value: 'copy',
    action: () => alert('Copy clicked!'),
  },
  {
    label: 'Delete',
    value: 'delete',
    class: 'text-red-600',
    action: () => alert('Delete clicked!'),
  },
];

// Default story
export const Default: Story = {
  args: {
    options: basicOptions,
    iconSize: 24,
    position: 'right',
  },
};

// Different positions
export const LeftPosition: Story = {
  args: {
    options: basicOptions,
    position: 'left',
  },
};

export const RightPosition: Story = {
  args: {
    options: basicOptions,
    position: 'right',
  },
};

// Different icon sizes
export const SmallIcon: Story = {
  args: {
    options: basicOptions,
    iconSize: 16,
  },
};

export const LargeIcon: Story = {
  args: {
    options: basicOptions,
    iconSize: 32,
  },
};

// Options with custom styling
export const StyledOptions: Story = {
  args: {
    options: [
      {
        label: 'View Details',
        value: 'view',
        class: 'text-blue-600 font-medium',
        action: () => alert('View Details clicked!'),
      },
      {
        label: 'Edit Item',
        value: 'edit',
        class: 'text-green-600',
        action: () => alert('Edit Item clicked!'),
      },
      {
        label: 'Archive',
        value: 'archive',
        class: 'text-yellow-600',
        action: () => alert('Archive clicked!'),
      },
      {
        label: 'Delete Forever',
        value: 'delete',
        class: 'text-red-600 font-semibold',
        action: () => alert('Delete Forever clicked!'),
      },
    ],
  },
};

// Interactive playground
export const Interactive: Story = {
  render: () => ({
    components: { DropdownMenu },
    data() {
      return {
        selectedOption: null,
        clickCount: 0,
        options: [
          {
            label: 'Option 1',
            value: 'option1',
            action: () => {
              this.selectedOption = 'Option 1';
              this.clickCount++;
            },
          },
          {
            label: 'Option 2',
            value: 'option2',
            action: () => {
              this.selectedOption = 'Option 2';
              this.clickCount++;
            },
          },
          {
            label: 'Reset Counter',
            value: 'reset',
            class: 'text-blue-600',
            action: () => {
              this.selectedOption = null;
              this.clickCount = 0;
            },
          },
        ],
      };
    },
    methods: {
      handleSelect(option: any) {
        console.log('Selected:', option);
      },
    },
    template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-4">Interactive Dropdown</h3>
          <DropdownMenu :options="options" @select="handleSelect" />
        </div>
        
        <div class="text-center bg-gray-100 p-4 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Last selected:</strong> {{ selectedOption || 'None' }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Click count:</strong> {{ clickCount }}
          </p>
        </div>
      </div>
    `,
  }),
};

// Multiple dropdowns
export const MultipleDropdowns: Story = {
  render: () => ({
    components: { DropdownMenu },
    data() {
      return {
        userOptions: [
          {
            label: 'View Profile',
            value: 'profile',
            action: () => alert('View Profile clicked!'),
          },
          {
            label: 'Edit User',
            value: 'edit',
            action: () => alert('Edit User clicked!'),
          },
          {
            label: 'Deactivate',
            value: 'deactivate',
            class: 'text-red-600',
            action: () => alert('Deactivate clicked!'),
          },
        ],
        projectOptions: [
          {
            label: 'Open Project',
            value: 'open',
            action: () => alert('Open Project clicked!'),
          },
          {
            label: 'Share',
            value: 'share',
            action: () => alert('Share clicked!'),
          },
          {
            label: 'Archive Project',
            value: 'archive',
            class: 'text-yellow-600',
            action: () => alert('Archive Project clicked!'),
          },
          {
            label: 'Delete Project',
            value: 'delete',
            class: 'text-red-600',
            action: () => alert('Delete Project clicked!'),
          },
        ],
      };
    },
    template: `
      <div class="space-y-8">
        <div class="flex gap-8 justify-center">
          <div class="text-center">
            <h3 class="text-sm font-medium mb-2">User Actions</h3>
            <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
              <span class="text-sm">John Doe</span>
              <DropdownMenu :options="userOptions" position="left" />
            </div>
          </div>
          
          <div class="text-center">
            <h3 class="text-sm font-medium mb-2">Project Actions</h3>
            <div class="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
              <span class="text-sm">My Project</span>
              <DropdownMenu :options="projectOptions" position="right" />
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <p class="text-xs text-gray-500">
            Multiple dropdown menus can be used independently
          </p>
        </div>
      </div>
    `,
  }),
};

// Real-world usage example
export const TableRowActions: Story = {
  render: () => ({
    components: { DropdownMenu },
    data() {
      return {
        users: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },
          { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'Active' },
        ],
      };
    },
    methods: {
      getRowOptions(user: any) {
        return [
          {
            label: 'View Details',
            value: 'view',
            action: () => alert('Viewing details for ' + user.name),
          },
          {
            label: 'Edit User',
            value: 'edit',
            action: () => alert('Editing ' + user.name),
          },
          {
            label: user.status === 'Active' ? 'Deactivate' : 'Activate',
            value: 'toggle-status',
            class: user.status === 'Active' ? 'text-yellow-600' : 'text-green-600',
            action: () => {
              user.status = user.status === 'Active' ? 'Inactive' : 'Active';
            },
          },
          {
            label: 'Delete User',
            value: 'delete',
            class: 'text-red-600',
            action: () => {
              if (confirm('Delete ' + user.name + '?')) {
                const index = this.users.findIndex((u: any) => u.id === user.id);
                this.users.splice(index, 1);
              }
            },
          },
        ];
      },
    },
    template: `
      <div class="max-w-2xl mx-auto">
        <h3 class="text-lg font-semibold mb-4">User Management Table</h3>
        <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ user.name }}</td>
                <td class="px-4 py-3 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-4 py-3 text-sm">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <DropdownMenu :options="getRowOptions(user)" position="left" :iconSize="20" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  }),
};

// Playground for testing
export const Playground: Story = {
  args: {
    options: basicOptions,
    iconSize: 24,
    position: 'right',
  },
};
