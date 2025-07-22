import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import DragDropInput from '@/components/form/DragDropInput.vue';

const meta: Meta<typeof DragDropInput> = {
  title: 'Components/Input/DragDropInput',
  component: DragDropInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A drag-and-drop file input component that supports both drag & drop and click-to-select functionality. Features file validation, size limits, multiple file support, and comprehensive error handling with visual feedback.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the input field',
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple file selection',
    },
    accept: {
      control: { type: 'text' },
      description: 'Accepted file types (MIME types or extensions)',
    },
    acceptText: {
      control: { type: 'text' },
      description: 'Custom text describing accepted file types',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Maximum number of files allowed',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state styling',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input',
    },
    isUploading: {
      control: { type: 'boolean' },
      description: 'Show uploading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Upload Files',
    id: 'default-upload',
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
        <div v-if="files.length > 0" class="mt-4">
          <p class="text-sm font-medium">Selected files:</p>
          <ul class="text-xs text-gray-600">
            <li v-for="file in files" :key="file.name">{{ file.name }}</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Single file upload
export const SingleFile: Story = {
  args: {
    label: 'Upload Image',
    multiple: false,
    accept: 'image/*',
    acceptText: 'PNG, JPG, GIF up to 5MB',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Multiple files
export const MultipleFiles: Story = {
  args: {
    label: 'Upload Documents',
    multiple: true,
    accept: '.pdf,.doc,.docx,.txt',
    acceptText: 'PDF, DOC, DOCX, TXT up to 10MB each',
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Error state
export const WithError: Story = {
  args: {
    label: 'Upload Files',
    error: true,
    errorMessage: 'File size exceeds the maximum limit of 10MB',
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Upload Files (Disabled)',
    disabled: true,
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Loading/Uploading state
export const Uploading: Story = {
  args: {
    label: 'Upload Files (Uploading)',
    isUploading: true,
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Large file limit
export const LargeFiles: Story = {
  args: {
    label: 'Upload Video Files',
    accept: 'video/*',
    acceptText: 'MP4, AVI, MOV up to 100MB',
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true,
    maxFiles: 3,
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Without label
export const NoLabel: Story = {
  args: {
    accept: 'image/*',
    acceptText: 'Images only',
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const handleUpload = (uploadedFiles: File[]) => {
        files.value = uploadedFiles;
      };
      return { args, files, handleUpload };
    },
    template: `
      <div class="w-96">
        <DragDropInput v-bind="args" @upload="handleUpload" />
      </div>
    `,
  }),
};

// Interactive example with file handling
export const Interactive: Story = {
  args: {
    label: 'Interactive File Upload',
    multiple: true,
    accept: 'image/*,application/pdf',
    acceptText: 'Images and PDF files',
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 10,
  },
  render: (args) => ({
    components: { DragDropInput },
    setup() {
      const files = ref<File[]>([]);
      const errorMessage = ref('');
      const hasError = ref(false);
      const isUploading = ref(false);

      const handleUpload = async (uploadedFiles: File[]) => {
        isUploading.value = true;
        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        files.value = uploadedFiles;
        isUploading.value = false;
      };

      const handleError = (message: string) => {
        errorMessage.value = message;
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
          errorMessage.value = '';
        }, 3000);
      };

      return { args, files, errorMessage, hasError, isUploading, handleUpload, handleError };
    },
    template: `
      <div class="w-96 space-y-4">
        <DragDropInput 
          v-bind="args" 
          :error="hasError"
          :error-message="errorMessage"
          :is-uploading="isUploading"
          @upload="handleUpload"
          @error="handleError"
        />
        
        <div v-if="files.length > 0" class="space-y-2">
          <h4 class="font-medium text-sm">Uploaded Files ({{ files.length }}):</h4>
          <div class="space-y-1">
            <div 
              v-for="(file, index) in files" 
              :key="index"
              class="text-xs bg-gray-50 p-2 rounded flex justify-between items-center"
            >
              <span>{{ file.name }}</span>
              <span class="text-gray-500">{{ (file.size / 1024).toFixed(1) }}KB</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { DragDropInput },
    setup() {
      const singleFile = ref<File[]>([]);
      const multipleFiles = ref<File[]>([]);
      const errorFiles = ref<File[]>([]);

      const handleSingleUpload = (files: File[]) => {
        singleFile.value = files;
      };

      const handleMultipleUpload = (files: File[]) => {
        multipleFiles.value = files;
      };

      const handleErrorUpload = (files: File[]) => {
        errorFiles.value = files;
      };

      return {
        singleFile,
        multipleFiles,
        errorFiles,
        handleSingleUpload,
        handleMultipleUpload,
        handleErrorUpload,
      };
    },
    template: `
      <div class="space-y-8 w-full max-w-4xl">
        <div>
          <h3 class="text-lg font-semibold mb-4">Single File Upload</h3>
          <div class="w-96">
            <DragDropInput 
              label="Upload Profile Picture"
              :multiple="false"
              accept="image/*"
              accept-text="PNG, JPG up to 2MB"
              :max-size="2 * 1024 * 1024"
              @upload="handleSingleUpload"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Multiple Files Upload</h3>
          <div class="w-96">
            <DragDropInput 
              label="Upload Documents"
              :multiple="true"
              accept=".pdf,.doc,.docx"
              accept-text="PDF, DOC, DOCX up to 10MB each"
              :max-size="10 * 1024 * 1024"
              :max-files="5"
              @upload="handleMultipleUpload"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Error State</h3>
          <div class="w-96">
            <DragDropInput 
              label="Upload with Error"
              :error="true"
              error-message="File validation failed"
              @upload="handleErrorUpload"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Disabled State</h3>
          <div class="w-96">
            <DragDropInput 
              label="Disabled Upload"
              :disabled="true"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Uploading State</h3>
          <div class="w-96">
            <DragDropInput 
              label="Uploading Files"
              :is-uploading="true"
            />
          </div>
        </div>
      </div>
    `,
  }),
};
