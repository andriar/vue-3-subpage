// src/stories/Image.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';

import Image from '@/components/common/Image.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

// Mock SpinnerIcon component for stories
const MockSpinnerIcon = {
  props: ['size'],
  template: `
    <div 
      :style="{ width: size + 'px', height: size + 'px' }" 
      class="border-2 border-green-600 border-t-transparent rounded-full animate-spin"
    />
  `,
};

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An intelligent image component with loading states, error handling, and automatic fallback support. Perfect for user avatars, channel badges, and any images that need graceful degradation.',
      },
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Primary image source URL',
      table: {
        type: { summary: 'string' },
      },
    },
    fallbackSrc: {
      control: { type: 'text' },
      description: 'Fallback image URL when primary fails to load',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'CHANNEL_BADGE_URL.qiscus' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Image' },
      },
    },
    width: {
      control: { type: 'number', min: 16, max: 500, step: 1 },
      description: 'Image width in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '24' },
      },
    },
    height: {
      control: { type: 'number', min: 16, max: 500, step: 1 },
      description: 'Image height in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '24' },
      },
    },
  },
  args: {
    src: 'https://via.placeholder.com/100x100/007acc/ffffff?text=Primary',
    fallbackSrc: CHANNEL_BADGE_URL.qiscus,
    alt: 'Test Image',
    width: 100,
    height: 100,
  },
  // Global decorator to provide mock dependencies
  decorators: [
    () => ({
      components: { MockSpinnerIcon },
      provide: {
        // Mock the constant if needed
        CHANNEL_BADGE_URL: CHANNEL_BADGE_URL,
      },
      template: '<div><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};

// Different sizes
export const Small: Story = {
  args: {
    width: 32,
    height: 32,
    alt: 'Small image',
  },
};

export const Medium: Story = {
  args: {
    width: 64,
    height: 64,
    alt: 'Medium image',
  },
};

export const Large: Story = {
  args: {
    width: 128,
    height: 128,
    alt: 'Large image',
  },
};

// Loading state demonstration
export const LoadingState: Story = {
  args: {
    src: 'https://httpbin.org/delay/3', // This will delay for 3 seconds
    width: 100,
    height: 100,
    alt: 'Loading image',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the loading spinner while image is being fetched. This example uses a delayed endpoint to show the loading state.',
      },
    },
  },
};

// Error/Fallback state
export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    fallbackSrc: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Fallback',
    width: 100,
    height: 100,
    alt: 'Image with fallback',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows fallback behavior when the primary image fails to load. The primary URL is intentionally broken to demonstrate the fallback.',
      },
    },
  },
};

// Custom fallback
export const CustomFallback: Story = {
  args: {
    src: 'https://another-invalid-url.jpg',
    fallbackSrc: 'https://via.placeholder.com/100x100/ffd93d/000000?text=Custom+Fallback',
    width: 100,
    height: 100,
    alt: 'Custom fallback image',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a custom fallback image different from the default.',
      },
    },
  },
};

// Different aspect ratios
export const Square: Story = {
  args: {
    src: 'https://via.placeholder.com/100x100/6c5ce7/ffffff?text=Square',
    width: 100,
    height: 100,
    alt: 'Square image',
  },
};

export const Rectangle: Story = {
  args: {
    src: 'https://via.placeholder.com/150x100/a29bfe/ffffff?text=Rectangle',
    width: 150,
    height: 100,
    alt: 'Rectangle image',
  },
};

export const Portrait: Story = {
  args: {
    src: 'https://via.placeholder.com/100x150/fd79a8/ffffff?text=Portrait',
    width: 100,
    height: 150,
    alt: 'Portrait image',
  },
};

// Avatar use case
export const UserAvatar: Story = {
  args: {
    src: 'https://via.placeholder.com/64x64/00b894/ffffff?text=User',
    fallbackSrc: 'https://via.placeholder.com/64x64/ddd/666?text=?',
    width: 64,
    height: 64,
    alt: 'User avatar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Common use case for user avatars with appropriate fallback.',
      },
    },
  },
};

// Channel badge use case
export const ChannelBadge: Story = {
  args: {
    src: 'https://via.placeholder.com/24x24/00cec9/ffffff?text=Ch',
    fallbackSrc: 'https://via.placeholder.com/24x24/636e72/ffffff?text=?',
    width: 24,
    height: 24,
    alt: 'Channel badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small channel badge example, typical for chat applications.',
      },
    },
  },
};

// Showcase different states
export const AllStates: Story = {
  render: () => ({
    components: { Image, MockSpinnerIcon },
    template: `
      <div class="flex flex-col gap-6 p-6">
        <div class="flex gap-4 items-center">
          <h3 class="text-lg font-semibold">Success State:</h3>
          <Image 
            src="https://via.placeholder.com/80x80/00b894/ffffff?text=Success"
            :width="80"
            :height="80"
            alt="Success state"
          />
        </div>
        
        <div class="flex gap-4 items-center">
          <h3 class="text-lg font-semibold">Loading State:</h3>
          <Image 
            src="https://httpbin.org/delay/5"
            :width="80"
            :height="80"
            alt="Loading state"
          />
        </div>
        
        <div class="flex gap-4 items-center">
          <h3 class="text-lg font-semibold">Error/Fallback State:</h3>
          <Image 
            src="https://invalid-url-for-demo.jpg"
            fallbackSrc="https://via.placeholder.com/80x80/e17055/ffffff?text=Error"
            :width="80"
            :height="80"
            alt="Error state"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates all possible states of the image component: successful load, loading, and error/fallback.',
      },
    },
  },
};

// Size variations showcase
export const SizeVariations: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div class="flex gap-4 items-end">
        <div class="text-center">
          <Image 
            src="https://via.placeholder.com/24x24/6c5ce7/ffffff?text=24"
            :width="24"
            :height="24"
            alt="24x24"
          />
          <p class="text-xs mt-1">24x24</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://via.placeholder.com/32x32/a29bfe/ffffff?text=32"
            :width="32"
            :height="32"
            alt="32x32"
          />
          <p class="text-xs mt-1">32x32</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://via.placeholder.com/48x48/fd79a8/ffffff?text=48"
            :width="48"
            :height="48"
            alt="48x48"
          />
          <p class="text-xs mt-1">48x48</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://via.placeholder.com/64x64/fdcb6e/ffffff?text=64"
            :width="64"
            :height="64"
            alt="64x64"
          />
          <p class="text-xs mt-1">64x64</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://via.placeholder.com/96x96/00b894/ffffff?text=96"
            :width="96"
            :height="96"
            alt="96x96"
          />
          <p class="text-xs mt-1">96x96</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Common size variations for different use cases.',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    src: 'https://via.placeholder.com/100x100/007acc/ffffff?text=Playground',
    fallbackSrc: 'https://via.placeholder.com/100x100/cccccc/666666?text=Fallback',
    alt: 'Playground image',
    width: 100,
    height: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test different image URLs, sizes, and fallback scenarios. Use the controls panel to experiment with different combinations.',
      },
    },
  },
};

// Test with real images
export const RealImages: Story = {
  render: () => ({
    components: { Image },
    template: `
      <div class="flex gap-4 flex-wrap">
        <div class="text-center">
          <Image 
            src="https://picsum.photos/80/80?random=1"
            fallbackSrc="https://via.placeholder.com/80x80/ddd/666?text=User"
            :width="80"
            :height="80"
            alt="Random image 1"
          />
          <p class="text-xs mt-1">Random 1</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://picsum.photos/80/80?random=2"
            fallbackSrc="https://via.placeholder.com/80x80/ddd/666?text=User"
            :width="80"
            :height="80"
            alt="Random image 2"
          />
          <p class="text-xs mt-1">Random 2</p>
        </div>
        
        <div class="text-center">
          <Image 
            src="https://picsum.photos/80/80?random=3"
            fallbackSrc="https://via.placeholder.com/80x80/ddd/666?text=User"
            :width="80"
            :height="80"
            alt="Random image 3"
          />
          <p class="text-xs mt-1">Random 3</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Examples using real images from Picsum for more realistic testing.',
      },
    },
  },
};
