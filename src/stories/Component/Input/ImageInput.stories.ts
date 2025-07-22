import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import ImageInput from '@/components/form/ImageInput.vue';

const meta: Meta<typeof ImageInput> = {
  title: 'Components/Input/ImageInput',
  component: ImageInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized image input component with file validation, upload handling, and loading states. Features click-to-upload, image preview from modelValue, circular loading animation, and error handling.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the input field',
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the input',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in kilobytes',
    },
    acceptedFormats: {
      control: { type: 'text' },
      description: 'Accepted MIME types (comma-separated)',
    },
    isUploading: {
      control: { type: 'boolean' },
      description: 'Whether the component is in uploading state (shows loading animation)',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'Current image URL to display in preview',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Profile Picture',
    id: 'profile-pic',
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);
      const uploadedFileName = ref('');

      const handleImageUpload = async (file: File) => {
        console.log('Uploading:', file.name);
        uploadedFileName.value = file.name;
        isUploading.value = true;

        // Simulate upload
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Simulate success - in real app, this would be the server response URL
          imageUrl.value = URL.createObjectURL(file);
          console.log('Upload successful');
        } catch (error) {
          console.log('Upload failed');
        } finally {
          isUploading.value = false;
        }
      };

      const handleImageError = (error: string) => {
        console.log('Image error:', error);
      };

      return { args, imageUrl, isUploading, uploadedFileName, handleImageUpload, handleImageError };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput 
          v-bind="args" 
          v-model="imageUrl"
          :isUploading="isUploading"
          @upload="handleImageUpload"
          @error="handleImageError"
        />
        <div v-if="uploadedFileName && !isUploading" class="text-sm text-gray-600">
          <p><strong>Uploaded:</strong> {{ uploadedFileName }}</p>
        </div>
        <div v-if="isUploading" class="text-sm text-blue-600">
          <p>Uploading {{ uploadedFileName }}...</p>
        </div>
        <div class="text-xs text-gray-500">
          <p>Click to upload an image. Supports JPG, JPEG, PNG formats. Maximum 2MB.</p>
        </div>
      </div>
    `,
  }),
};

// Small image with custom size limit
export const SmallImage: Story = {
  args: {
    label: 'Avatar Image',
    id: 'avatar',
    maxSize: 1024,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);

      const handleUpload = async (file: File) => {
        isUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        imageUrl.value = URL.createObjectURL(file);
        isUploading.value = false;
      };

      return { args, imageUrl, isUploading, handleUpload };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
        <div class="text-xs text-gray-500">
          <p>Upload a square image at least 150x150 pixels. Maximum 1MB.</p>
        </div>
      </div>
    `,
  }),
};

// Large image upload
export const LargeImage: Story = {
  args: {
    label: 'Cover Photo',
    id: 'cover-photo',
    maxSize: 10240,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);

      const handleUpload = async (file: File) => {
        isUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Longer for large files
        imageUrl.value = URL.createObjectURL(file);
        isUploading.value = false;
      };

      return { args, imageUrl, isUploading, handleUpload };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
        <div class="text-xs text-gray-500">
          <p>Upload a high-resolution image at least 1920x1080 pixels. Maximum 10MB.</p>
        </div>
      </div>
    `,
  }),
};

// WebP support
export const WebPSupport: Story = {
  args: {
    label: 'Modern Image Upload',
    id: 'webp-image',
    acceptedFormats: 'image/jpeg,image/png,image/webp',
    maxSize: 5120,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);

      const handleUpload = async (file: File) => {
        isUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        imageUrl.value = URL.createObjectURL(file);
        isUploading.value = false;
      };

      return { args, imageUrl, isUploading, handleUpload };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
        <div class="text-xs text-gray-500">
          <p>Supports JPEG, PNG, and WebP formats. Maximum 5MB.</p>
        </div>
      </div>
    `,
  }),
};

// Simple upload without tips
export const SimpleUpload: Story = {
  args: {
    label: 'Simple Image Upload',
    id: 'simple-image',
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);

      const handleUpload = async (file: File) => {
        isUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        imageUrl.value = URL.createObjectURL(file);
        isUploading.value = false;
      };

      return { args, imageUrl, isUploading, handleUpload };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
      </div>
    `,
  }),
};

// PNG only
export const PNGOnly: Story = {
  args: {
    label: 'Logo Upload (PNG Only)',
    id: 'logo-png',
    acceptedFormats: 'image/png',
    maxSize: 2048,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);

      const handleUpload = async (file: File) => {
        isUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        imageUrl.value = URL.createObjectURL(file);
        isUploading.value = false;
      };

      return { args, imageUrl, isUploading, handleUpload };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
        <div class="text-xs text-gray-500">
          <p>PNG format only for transparent backgrounds. Maximum 2MB.</p>
        </div>
      </div>
    `,
  }),
};

// Interactive example with error handling
export const Interactive: Story = {
  args: {
    label: 'Interactive Image Upload',
    id: 'interactive-image',
    maxSize: 3072,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);
      const errorMessage = ref('');
      const successMessage = ref('');
      const currentFile = ref<File | null>(null);

      const handleImageUpload = async (file: File) => {
        errorMessage.value = '';
        successMessage.value = '';
        currentFile.value = file;
        isUploading.value = true;

        try {
          // Simulate random success/failure for demo
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              Math.random() > 0.3 ? resolve(void 0) : reject(new Error('Simulated upload failure'));
            }, 2000);
          });

          imageUrl.value = URL.createObjectURL(file);
          successMessage.value = `Successfully uploaded: ${file.name}`;
          setTimeout(() => {
            successMessage.value = '';
          }, 3000);
        } catch (error) {
          errorMessage.value = 'Upload failed. Please try again.';
          currentFile.value = null;
          setTimeout(() => {
            errorMessage.value = '';
          }, 5000);
        } finally {
          isUploading.value = false;
        }
      };

      const handleImageError = (error: string) => {
        errorMessage.value = error;
        successMessage.value = '';
        setTimeout(() => {
          errorMessage.value = '';
        }, 5000);
      };

      return {
        args,
        imageUrl,
        isUploading,
        errorMessage,
        successMessage,
        currentFile,
        handleImageUpload,
        handleImageError,
      };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput 
          v-bind="args" 
          v-model="imageUrl"
          :isUploading="isUploading"
          @upload="handleImageUpload"
          @error="handleImageError"
        />
        
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>
        
        <div v-if="successMessage" class="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>
        
        <div v-if="currentFile && !isUploading" class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 class="font-medium text-sm text-blue-800">File Details:</h4>
          <ul class="text-sm text-blue-600 mt-1 space-y-1">
            <li><strong>Name:</strong> {{ currentFile.name }}</li>
            <li><strong>Size:</strong> {{ (currentFile.size / 1024).toFixed(1) }}KB</li>
            <li><strong>Type:</strong> {{ currentFile.type }}</li>
            <li><strong>Last Modified:</strong> {{ new Date(currentFile.lastModified).toLocaleString() }}</li>
          </ul>
        </div>
        
        <div v-if="isUploading" class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-600 text-sm">Uploading... (70% chance of success for demo)</p>
        </div>
        
        <div class="text-xs text-gray-500">
          <p>Try uploading different file types and sizes to see validation in action. Maximum 3MB.</p>
        </div>
      </div>
    `,
  }),
};

// Upload with failure demonstration
export const UploadFailure: Story = {
  args: {
    label: 'Upload Failure Demo',
    id: 'failure-demo',
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageUrl = ref<string>('');
      const isUploading = ref(false);
      const errorMessage = ref('');

      const handleUpload = async (_file: File) => {
        isUploading.value = true;
        errorMessage.value = '';

        try {
          // Always fail for demo
          await new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Simulated failure')), 1500);
          });
        } catch (error) {
          errorMessage.value = 'Upload failed! You can try again.';
          setTimeout(() => {
            errorMessage.value = '';
          }, 4000);
        } finally {
          isUploading.value = false;
        }
      };

      return { args, imageUrl, isUploading, errorMessage, handleUpload };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput v-bind="args" v-model="imageUrl" :isUploading="isUploading" @upload="handleUpload" />
        
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>
        
        <div class="text-xs text-gray-500">
          <p>This demo always fails uploads to show error handling.</p>
        </div>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { ImageInput },
    setup() {
      const avatarUrl = ref<string>('');
      const coverUrl = ref<string>('');
      const logoUrl = ref<string>('');
      const simpleUrl = ref<string>('');

      const avatarUploading = ref(false);
      const coverUploading = ref(false);
      const logoUploading = ref(false);
      const simpleUploading = ref(false);

      const handleAvatarUpload = async (file: File) => {
        avatarUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        avatarUrl.value = URL.createObjectURL(file);
        avatarUploading.value = false;
      };

      const handleCoverUpload = async (file: File) => {
        coverUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 2500));
        coverUrl.value = URL.createObjectURL(file);
        coverUploading.value = false;
      };

      const handleLogoUpload = async (file: File) => {
        logoUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1800));
        logoUrl.value = URL.createObjectURL(file);
        logoUploading.value = false;
      };

      const handleSimpleUpload = async (file: File) => {
        simpleUploading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1200));
        simpleUrl.value = URL.createObjectURL(file);
        simpleUploading.value = false;
      };

      return {
        avatarUrl,
        coverUrl,
        logoUrl,
        simpleUrl,
        avatarUploading,
        coverUploading,
        logoUploading,
        simpleUploading,
        handleAvatarUpload,
        handleCoverUpload,
        handleLogoUpload,
        handleSimpleUpload,
      };
    },
    template: `
      <div class="space-y-8 w-full max-w-4xl">
        <div>
          <h3 class="text-lg font-semibold mb-4">Avatar Upload (Small)</h3>
          <div class="w-96 space-y-2">
            <ImageInput 
              v-model="avatarUrl"
              label="Profile Avatar"
              id="avatar-demo"
              :maxSize="1024"
              :isUploading="avatarUploading"
              @upload="handleAvatarUpload"
            />
            <p class="text-xs text-gray-500">Square image recommended, 150x150px minimum. Max 1MB.</p>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Cover Photo (Large)</h3>
          <div class="w-96 space-y-2">
            <ImageInput 
              v-model="coverUrl"
              label="Cover Image"
              id="cover-demo"
              :maxSize="10240"
              :isUploading="coverUploading"
              @upload="handleCoverUpload"
            />
            <p class="text-xs text-gray-500">High-resolution image, 1920x1080px recommended. Max 10MB.</p>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Logo Upload (PNG Only)</h3>
          <div class="w-96 space-y-2">
            <ImageInput 
              v-model="logoUrl"
              label="Company Logo"
              id="logo-demo"
              acceptedFormats="image/png"
              :maxSize="2048"
              :isUploading="logoUploading"
              @upload="handleLogoUpload"
            />
            <p class="text-xs text-gray-500">PNG format only for transparent backgrounds. Max 2MB.</p>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Simple Upload</h3>
          <div class="w-96">
            <ImageInput 
              v-model="simpleUrl"
              label="Simple Image"
              id="simple-demo"
              :isUploading="simpleUploading"
              @upload="handleSimpleUpload"
            />
          </div>
        </div>
      </div>
    `,
  }),
};
