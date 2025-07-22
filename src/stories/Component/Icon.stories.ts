import type { Meta, StoryObj } from '@storybook/vue3';

import Icon from '@/components/icons/Icon.vue';

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
        'inbox',
        'broadcast',
        'customer',
        'analytics',
        'integration',
        'app-center',
        'robolabs',
        'ticketing',
        'qcrm',
        'workflow',
        'mobile',
        'setting',
        'help',
        'logout',
        'filter-on',
        'chat-template',
        'notes',
        'credit-card',
        'user',
        'predifined-message',
        'hours',
        'tags',
        'bulk-resolved',
        'send',
        'customer-properties',
        'notification',
        'search',
        'subscription',
        'merge',
        'eye',
        'custom-agent-allocation',
        'template-message',
        'submit-ticket',
        'whatsapp-business',
        'general',
        'agent-management',
        'api',
        'copy',
        'information',
        'more',
        'plus',
        'filter',
        'edit',
        'refresh',
        'puzzle',
        'success',
        'error',
        'attention',
        'warning',
        'chevron-right',
        'chevron-left',
        'chevron-up',
        'chevron-down',
        'next-pagination',
        'back-pagination',
        'close',
        'back',
        'next',
        'shop',
        'chat',
        'minus',
        'check',
        'additional-information',
        'date',
        'reply',
        'currencies',
        'coin-stack',
        'file-search',
        'clock-fast-forward',
        'line-chart',
        'login',
        'identification',
        'window',
        'package',
        'newspaper',
        'megaphone',
        'edit-file',
        'presentation',
        'user-3',
        'clipboard',
        'delete',
        'open-tab',
        'trending',
        'square',
        'user-circle',
        'omnichannel',
        'home',
        'double-chevron-left',
        'double-chevron-right',
        'qiscus',
        'sign',
        'chat-outline',
        'pallete',
        'table',
        'toggle-left',
        'server',
        'pin',
        'briefcase',
        'globe',
        'phone',
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
          <p class="text-sm mt-2">Disabled</p>
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
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
        <div class="text-center">
          <Icon name="inbox" :size="24" />
          <p class="text-xs mt-1">inbox</p>
        </div>
        <div class="text-center">
          <Icon name="broadcast" :size="24" />
          <p class="text-xs mt-1">broadcast</p>
        </div>
        <div class="text-center">
          <Icon name="customer" :size="24" />
          <p class="text-xs mt-1">customer</p>
        </div>
        <div class="text-center">
          <Icon name="analytics" :size="24" />
          <p class="text-xs mt-1">analytics</p>
        </div>
        <div class="text-center">
          <Icon name="integration" :size="24" />
          <p class="text-xs mt-1">integration</p>
        </div>
        <div class="text-center">
          <Icon name="app-center" :size="24" />
          <p class="text-xs mt-1">app-center</p>
        </div>
        <div class="text-center">
          <Icon name="robolabs" :size="24" />
          <p class="text-xs mt-1">robolabs</p>
        </div>
        <div class="text-center">
          <Icon name="ticketing" :size="24" />
          <p class="text-xs mt-1">ticketing</p>
        </div>
        <div class="text-center">
          <Icon name="qcrm" :size="24" />
          <p class="text-xs mt-1">qcrm</p>
        </div>
        <div class="text-center">
          <Icon name="workflow" :size="24" />
          <p class="text-xs mt-1">workflow</p>
        </div>
        <div class="text-center">
          <Icon name="mobile" :size="24" />
          <p class="text-xs mt-1">mobile</p>
        </div>
        <div class="text-center">
          <Icon name="setting" :size="24" />
          <p class="text-xs mt-1">setting</p>
        </div>
        <div class="text-center">
          <Icon name="help" :size="24" />
          <p class="text-xs mt-1">help</p>
        </div>
        <div class="text-center">
          <Icon name="logout" :size="24" />
          <p class="text-xs mt-1">logout</p>
        </div>
        <div class="text-center">
          <Icon name="filter-on" :size="24" />
          <p class="text-xs mt-1">filter-on</p>
        </div>
        <div class="text-center">
          <Icon name="chat-template" :size="24" />
          <p class="text-xs mt-1">chat-template</p>
        </div>
        <div class="text-center">
          <Icon name="notes" :size="24" />
          <p class="text-xs mt-1">notes</p>
        </div>
        <div class="text-center">
          <Icon name="credit-card" :size="24" />
          <p class="text-xs mt-1">credit-card</p>
        </div>
        <div class="text-center">
          <Icon name="user" :size="24" />
          <p class="text-xs mt-1">user</p>
        </div>
        <div class="text-center">
          <Icon name="predifined-message" :size="24" />
          <p class="text-xs mt-1">predifined-message</p>
        </div>
        <div class="text-center">
          <Icon name="hours" :size="24" />
          <p class="text-xs mt-1">hours</p>
        </div>
        <div class="text-center">
          <Icon name="tags" :size="24" />
          <p class="text-xs mt-1">tags</p>
        </div>
        <div class="text-center">
          <Icon name="bulk-resolved" :size="24" />
          <p class="text-xs mt-1">bulk-resolved</p>
        </div>
        <div class="text-center">
          <Icon name="send" :size="24" />
          <p class="text-xs mt-1">send</p>
        </div>
        <div class="text-center">
          <Icon name="customer-properties" :size="24" />
          <p class="text-xs mt-1">customer-properties</p>
        </div>
        <div class="text-center">
          <Icon name="notification" :size="24" />
          <p class="text-xs mt-1">notification</p>
        </div>
        <div class="text-center">
          <Icon name="search" :size="24" />
          <p class="text-xs mt-1">search</p>
        </div>
        <div class="text-center">
          <Icon name="subscription" :size="24" />
          <p class="text-xs mt-1">subscription</p>
        </div>
        <div class="text-center">
          <Icon name="merge" :size="24" />
          <p class="text-xs mt-1">merge</p>
        </div>
        <div class="text-center">
          <Icon name="eye" :size="24" />
          <p class="text-xs mt-1">eye</p>
        </div>
        <div class="text-center">
          <Icon name="custom-agent-allocation" :size="24" />
          <p class="text-xs mt-1">custom-agent-allocation</p>
        </div>
        <div class="text-center">
          <Icon name="template-message" :size="24" />
          <p class="text-xs mt-1">template-message</p>
        </div>
        <div class="text-center">
          <Icon name="submit-ticket" :size="24" />
          <p class="text-xs mt-1">submit-ticket</p>
        </div>
        <div class="text-center">
          <Icon name="whatsapp-business" :size="24" />
          <p class="text-xs mt-1">whatsapp-business</p>
        </div>
        <div class="text-center">
          <Icon name="general" :size="24" />
          <p class="text-xs mt-1">general</p>
        </div>
        <div class="text-center">
          <Icon name="agent-management" :size="24" />
          <p class="text-xs mt-1">agent-management</p>
        </div>
        <div class="text-center">
          <Icon name="api" :size="24" />
          <p class="text-xs mt-1">api</p>
        </div>
        <div class="text-center">
          <Icon name="copy" :size="24" />
          <p class="text-xs mt-1">copy</p>
        </div>
        <div class="text-center">
          <Icon name="information" :size="24" />
          <p class="text-xs mt-1">information</p>
        </div>
        <div class="text-center">
          <Icon name="more" :size="24" />
          <p class="text-xs mt-1">more</p>
        </div>
        <div class="text-center">
          <Icon name="plus" :size="24" />
          <p class="text-xs mt-1">plus</p>
        </div>
        <div class="text-center">
          <Icon name="filter" :size="24" />
          <p class="text-xs mt-1">filter</p>
        </div>
        <div class="text-center">
          <Icon name="edit" :size="24" />
          <p class="text-xs mt-1">edit</p>
        </div>
        <div class="text-center">
          <Icon name="refresh" :size="24" />
          <p class="text-xs mt-1">refresh</p>
        </div>
        <div class="text-center">
          <Icon name="puzzle" :size="24" />
          <p class="text-xs mt-1">puzzle</p>
        </div>
        <div class="text-center">
          <Icon name="success" :size="24" />
          <p class="text-xs mt-1">success</p>
        </div>
        <div class="text-center">
          <Icon name="error" :size="24" />
          <p class="text-xs mt-1">error</p>
        </div>
        <div class="text-center">
          <Icon name="attention" :size="24" />
          <p class="text-xs mt-1">attention</p>
        </div>
        <div class="text-center">
          <Icon name="warning" :size="24" />
          <p class="text-xs mt-1">warning</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-right" :size="24" />
          <p class="text-xs mt-1">chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-left" :size="24" />
          <p class="text-xs mt-1">chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-up" :size="24" />
          <p class="text-xs mt-1">chevron-up</p>
        </div>
        <div class="text-center">
          <Icon name="chevron-down" :size="24" />
          <p class="text-xs mt-1">chevron-down</p>
        </div>
        <div class="text-center">
          <Icon name="next-pagination" :size="24" />
          <p class="text-xs mt-1">next-pagination</p>
        </div>
        <div class="text-center">
          <Icon name="back-pagination" :size="24" />
          <p class="text-xs mt-1">back-pagination</p>
        </div>
        <div class="text-center">
          <Icon name="close" :size="24" />
          <p class="text-xs mt-1">close</p>
        </div>
        <div class="text-center">
          <Icon name="back" :size="24" />
          <p class="text-xs mt-1">back</p>
        </div>
        <div class="text-center">
          <Icon name="next" :size="24" />
          <p class="text-xs mt-1">next</p>
        </div>
        <div class="text-center">
          <Icon name="shop" :size="24" />
          <p class="text-xs mt-1">shop</p>
        </div>
        <div class="text-center">
          <Icon name="chat" :size="24" />
          <p class="text-xs mt-1">chat</p>
        </div>
        <div class="text-center">
          <Icon name="minus" :size="24" />
          <p class="text-xs mt-1">minus</p>
        </div>
        <div class="text-center">
          <Icon name="check" :size="24" />
          <p class="text-xs mt-1">check</p>
        </div>
        <div class="text-center">
          <Icon name="additional-information" :size="24" />
          <p class="text-xs mt-1">additional-information</p>
        </div>
        <div class="text-center">
          <Icon name="date" :size="24" />
          <p class="text-xs mt-1">date</p>
        </div>
        <div class="text-center">
          <Icon name="reply" :size="24" />
          <p class="text-xs mt-1">reply</p>
        </div>
        <div class="text-center">
          <Icon name="currencies" :size="24" />
          <p class="text-xs mt-1">currencies</p>
        </div>
        <div class="text-center">
          <Icon name="coin-stack" :size="24" />
          <p class="text-xs mt-1">coin-stack</p>
        </div>
        <div class="text-center">
          <Icon name="file-search" :size="24" />
          <p class="text-xs mt-1">file-search</p>
        </div>
        <div class="text-center">
          <Icon name="clock-fast-forward" :size="24" />
          <p class="text-xs mt-1">clock-fast-forward</p>
        </div>
        <div class="text-center">
          <Icon name="line-chart" :size="24" />
          <p class="text-xs mt-1">line-chart</p>
        </div>
        <div class="text-center">
          <Icon name="login" :size="24" />
          <p class="text-xs mt-1">login</p>
        </div>
        <div class="text-center">
          <Icon name="identification" :size="24" />
          <p class="text-xs mt-1">identification</p>
        </div>
        <div class="text-center">
          <Icon name="window" :size="24" />
          <p class="text-xs mt-1">window</p>
        </div>
        <div class="text-center">
          <Icon name="package" :size="24" />
          <p class="text-xs mt-1">package</p>
        </div>
        <div class="text-center">
          <Icon name="newspaper" :size="24" />
          <p class="text-xs mt-1">newspaper</p>
        </div>
        <div class="text-center">
          <Icon name="megaphone" :size="24" />
          <p class="text-xs mt-1">megaphone</p>
        </div>
        <div class="text-center">
          <Icon name="edit-file" :size="24" />
          <p class="text-xs mt-1">edit-file</p>
        </div>
        <div class="text-center">
          <Icon name="presentation" :size="24" />
          <p class="text-xs mt-1">presentation</p>
        </div>
        <div class="text-center">
          <Icon name="user-3" :size="24" />
          <p class="text-xs mt-1">user-3</p>
        </div>
        <div class="text-center">
          <Icon name="clipboard" :size="24" />
          <p class="text-xs mt-1">clipboard</p>
        </div>
        <div class="text-center">
          <Icon name="delete" :size="24" />
          <p class="text-xs mt-1">delete</p>
        </div>
        <div class="text-center">
          <Icon name="open-tab" :size="24" />
          <p class="text-xs mt-1">open-tab</p>
        </div>
        <div class="text-center">
          <Icon name="trending" :size="24" />
          <p class="text-xs mt-1">trending</p>
        </div>
        <div class="text-center">
          <Icon name="square" :size="24" />
          <p class="text-xs mt-1">square</p>
        </div>
        <div class="text-center">
          <Icon name="user-circle" :size="24" />
          <p class="text-xs mt-1">user-circle</p>
        </div>
        <div class="text-center">
          <Icon name="omnichannel" :size="24" />
          <p class="text-xs mt-1">omnichannel</p>
        </div>
        <div class="text-center">
          <Icon name="home" :size="24" />
          <p class="text-xs mt-1">home</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-left" :size="24" />
          <p class="text-xs mt-1">double-chevron-left</p>
        </div>
        <div class="text-center">
          <Icon name="double-chevron-right" :size="24" />
          <p class="text-xs mt-1">double-chevron-right</p>
        </div>
        <div class="text-center">
          <Icon name="qiscus" :size="24" />
          <p class="text-xs mt-1">qiscus</p>
        </div>
        <div class="text-center">
          <Icon name="sign" :size="24" />
          <p class="text-xs mt-1">sign</p>
        </div>
        <div class="text-center">
          <Icon name="chat-outline" :size="24" />
          <p class="text-xs mt-1">chat-outline</p>
        </div>
        <div class="text-center">
          <Icon name="pallete" :size="24" />
          <p class="text-xs mt-1">pallete</p>
        </div>
        <div class="text-center">
          <Icon name="table" :size="24" />
          <p class="text-xs mt-1">table</p>
        </div>
        <div class="text-center">
          <Icon name="toggle-left" :size="24" />
          <p class="text-xs mt-1">toggle-left</p>
        </div>
        <div class="text-center">
          <Icon name="server" :size="24" />
          <p class="text-xs mt-1">server</p>
        </div>
        <div class="text-center">
          <Icon name="pin" :size="24" />
          <p class="text-xs mt-1">pin</p>
        </div>
        <div class="text-center">
          <Icon name="briefcase" :size="24" />
          <p class="text-xs mt-1">briefcase</p>
        </div>
        <div class="text-center">
          <Icon name="globe" :size="24" />
          <p class="text-xs mt-1">globe</p>
        </div>
        <div class="text-center">
          <Icon name="phone" :size="24" />
          <p class="text-xs mt-1">phone</p>
        </div>
      </div>
    `,
  }),
};

// Interactive playground
export const Playground: Story = {
  args: {
    name: 'home',
    size: 24,
    class: 'text-icon-black',
  },
};
