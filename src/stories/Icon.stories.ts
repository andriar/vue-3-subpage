import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from '../components/icons/Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Icon System

A flexible icon system with two usage methods:

## 1. Icon Registry (Recommended)
Use the \`Icon\` component with the \`name\` prop for easy and consistent access:
\`\`\`vue
<Icon name="home" :size="24" />
\`\`\`

## 2. Direct Import
Import icon components directly for more specific control:
\`\`\`vue
<HomeIcon :size="24" class="text-icon-black" />
\`\`\`

All icons support the following props:
- \`size\`: Icon size (default varies per icon)
- \`class\`: Additional CSS classes
- \`gradientStart\` & \`gradientEnd\`: Specific to WidgetIcon

Icons use \`currentColor\` so they can be styled with CSS color properties.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'home',
        'user',
        'setting',
        'search',
        'plus',
        'copy',
        'close',
        'broadcast',
        'arrow-down',
        'arrow-left',
        'chevron-left',
        'chevron-right',
        'double-chevron-left',
        'double-chevron-right',
        'chat',
      ],
      description: 'Icon name to display',
    },
    size: {
      control: { type: 'number', min: 12, max: 96, step: 4 },
      description: 'Icon size in pixels',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
  },
};

// Size variations
export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-6">
        <div class="text-center">
          <Icon name="home" :size="8" />
          <p class="text-sm mt-2">8px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="12" />
          <p class="text-sm mt-2">12px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="16" />
          <p class="text-sm mt-2">16px</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" />
          <p class="text-sm mt-2">24px</p>
        </div>
      </div>
    `,
  }),
};

// Color variations
export const Colors: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-6">
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-black" />
          <p class="text-sm mt-2">Black</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-green" />
          <p class="text-sm mt-2">Green</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" class="text-icon-disable" />
          <p class="text-sm mt-2">Disable </p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="30" class="text-icon-white bg-slate-700 p-1 rounded-md" />
          <p class="text-sm mt-2">White</p>
        </div>
        
      </div>
    `,
  }),
};

// All available icons
export const AllIcons: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-7">
        <div class="text-center">
          <Icon name="inbox" :size="24" />
          <p class="text-xs mt-2">inbox</p>
        </div>
        <div class="text-center">
          <Icon name="broadcast" :size="24" />
          <p class="text-xs mt-2">broadcast</p>
        </div>
        <div class="text-center">
          <Icon name="customer" :size="24" />
          <p class="text-xs mt-2">customer</p>
        </div>
        <div class="text-center">
          <Icon name="analytics" :size="24" />
          <p class="text-xs mt-2">analytics</p>
        </div>
        <div class="text-center">
          <Icon name="integration" :size="24" />
          <p class="text-xs mt-2">integration</p>
        </div>
        <div class="text-center">
          <Icon name="app-center" :size="24" />
          <p class="text-xs mt-2">app-center</p>
        </div>
        <div class="text-center">
          <Icon name="robolabs" :size="24" />
          <p class="text-xs mt-2">robolabs</p>
        </div>
        <div class="text-center">
          <Icon name="ticketing" :size="24" />
          <p class="text-xs mt-2">ticketing</p>
        </div>
        <div class="text-center">
          <Icon name="qcrm" :size="24" />
          <p class="text-xs mt-2">qcrm</p>
        </div>
        <div class="text-center">
          <Icon name="workflow" :size="24" />
          <p class="text-xs mt-2">workflow</p>
        </div>
        <div class="text-center">
          <Icon name="mobile" :size="24" />
          <p class="text-xs mt-2">mobile</p>
        </div>
        <div class="text-center">
          <Icon name="setting" :size="24" />
          <p class="text-xs mt-2">setting</p>
        </div>
        <div class="text-center">
          <Icon name="help" :size="24" />
          <p class="text-xs mt-2">help</p>
        </div>
        <div class="text-center">
          <Icon name="logout" :size="24" />
          <p class="text-xs mt-2">logout</p>
        </div>
        <div class="text-center">
          <Icon name="filter-on" :size="24" />
          <p class="text-xs mt-2">filter-on</p>
        </div>
        <div class="text-center">
          <Icon name="chat-template" :size="24" />
          <p class="text-xs mt-2">chat-template</p>
        </div>
        <div class="text-center">
          <Icon name="notes" :size="24" />
          <p class="text-xs mt-2">notes</p>
        </div>
        <div class="text-center">
          <Icon name="credit-card" :size="24" />
          <p class="text-xs mt-2">credit-card</p>
        </div>
        <div class="text-center">
          <Icon name="user" :size="24" />
          <p class="text-xs mt-2">user</p>
        </div>
        <div class="text-center">
          <Icon name="predifined-message" :size="24" />
          <p class="text-xs mt-2">predifined-message</p>
        </div>
        <div class="text-center">
          <Icon name="hours" :size="24" />
          <p class="text-xs mt-2">hours</p>
        </div>
        <div class="text-center">
          <Icon name="tags" :size="24" />
          <p class="text-xs mt-2">tags</p>
        </div>
        <div class="text-center">
          <Icon name="bulk-resolved" :size="24" />
          <p class="text-xs mt-2">bulk-resolved</p>
        </div>
        <div class="text-center">
          <Icon name="send" :size="24" />
          <p class="text-xs mt-2">send</p>
        </div>
        <div class="text-center">
          <Icon name="customer-properties" :size="24" />
          <p class="text-xs mt-2">customer-properties</p>
        </div>
        <div class="text-center">
          <Icon name="notification" :size="24" />
          <p class="text-xs mt-2">notification</p>
        </div>
        <div class="text-center">
          <Icon name="search" :size="24" />
          <p class="text-xs mt-2">search</p>
        </div>
        <div class="text-center">
          <Icon name="subscription" :size="24" />
          <p class="text-xs mt-2">subscription</p>
        </div>
        <div class="text-center">
          <Icon name="merge" :size="24" />
          <p class="text-xs mt-2">merge</p>
        </div>
        <div class="text-center">
          <Icon name="eye" :size="24" />
          <p class="text-xs mt-2">eye</p>
        </div>
        <!-- Common icons -->
        <div class="text-center">
          <Icon name="home" :size="24" />
          <p class="text-xs mt-2">home</p>
        </div>
        <div class="text-center">
          <Icon name="plus" :size="24" />
          <p class="text-xs mt-2">plus</p>
        </div>
        <div class="text-center">
          <Icon name="copy" :size="24" />
          <p class="text-xs mt-2">copy</p>
        </div>
        <div class="text-center">
          <Icon name="close" :size="24" />
          <p class="text-xs mt-2">close</p>
        </div>
        
        <div class="text-center">
          <Icon name="chevron-down" :size="24" />
          <p class="text-xs mt-2">chevron-down</p>
        </div>
        <div class="text-center">
          <Icon name="arrow-left" :size="24" />
          <p class="text-xs mt-2">arrow-left</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-left" :size="24" />
          <p class="text-xs mt-2">chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-right" :size="24" />
          <p class="text-xs mt-2">chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-left" :size="24" />
          <p class="text-xs mt-2">double-chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-right" :size="24" />
          <p class="text-xs mt-2">double-chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="chat" :size="24" />
          <p class="text-xs mt-2">chat</p>
        </div>
      </div>
    `,
  }),
};

// Individual icon stories for better documentation
export const HomeIcon: Story = {
  args: {
    name: 'home',
    size: 32,
  },
};

export const UserIcon: Story = {
  args: {
    name: 'user',
    size: 32,
  },
};

export const SettingIcon: Story = {
  args: {
    name: 'setting',
    size: 32,
  },
};

export const SearchIcon: Story = {
  args: {
    name: 'search',
    size: 32,
  },
};

export const PlusIcon: Story = {
  args: {
    name: 'plus',
    size: 32,
  },
};

export const CopyIcon: Story = {
  args: {
    name: 'copy',
    size: 32,
  },
};

export const CloseIcon: Story = {
  args: {
    name: 'close',
    size: 32,
  },
};

export const BroadcastIcon: Story = {
  args: {
    name: 'broadcast',
    size: 32,
  },
};

export const ArrowDownIcon: Story = {
  args: {
    name: 'arrow-down',
    size: 32,
  },
};

export const ArrowLeftIcon: Story = {
  args: {
    name: 'arrow-left',
    size: 32,
  },
};

export const ChevronLeftIcon: Story = {
  args: {
    name: 'chevron-left',
    size: 32,
  },
};

export const ChevronRightIcon: Story = {
  args: {
    name: 'chevron-right',
    size: 32,
  },
};

export const DoubleChevronLeftIcon: Story = {
  args: {
    name: 'double-chevron-left',
    size: 32,
  },
};

export const DoubleChevronRightIcon: Story = {
  args: {
    name: 'double-chevron-right',
    size: 32,
  },
};

export const ChatIcon: Story = {
  args: {
    name: 'chat',
    size: 32,
  },
};

// Error handling
export const IconNotFound: Story = {
  args: {
    name: 'non-existent-icon',
    size: 32,
  },
};
