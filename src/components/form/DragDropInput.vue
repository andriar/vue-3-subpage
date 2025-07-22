<template>
  <div :class="containerClasses">
    <label v-if="label" :for="id" class="text-text-subtitle mb-2 block text-sm font-medium">
      {{ label }}
    </label>
    <div :class="dropZoneClasses" @drop="handleDrop" @dragover="handleDragOver" @dragenter="handleDragEnter"
      @dragleave="handleDragLeave" @click="triggerFileInput">
      <input ref="fileInput" :id="id" type="file" :multiple="multiple" :accept="accept" @change="handleFileSelect"
        class="hidden" :disabled="isUploading" />

      <!-- Upload Icon -->
      <div class="flex flex-col items-center justify-center py-6">
        <UploadIcon :size="32" class="mb-2 text-gray-400" />
        <div class="text-center">
          <p class="mb-1 text-sm text-gray-600">
            Drag and Drop file here or
            <span class="text-primary cursor-pointer font-medium hover:underline">
              Choose File
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- details -->
    <div class="mt-2 flex items-center justify-between">
      <span class="text-xs font-normal text-gray-800">Supported File: {{ acceptText || 'PNG, JPG, GIF up to 10MB'
      }}</span>
      <span class="text-xs font-normal text-gray-800">Maximum Size: {{ formatFileSize(maxSize) }}</span>
    </div>

    <!-- File List -->
    <div v-if="files.length > 0" class="mt-4 space-y-2">
      <div v-for="(file, index) in files" :key="index"
        class="flex items-center justify-between rounded-lg border border-gray-500 bg-transparent p-3">
        <div class="flex items-center space-x-3">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
        <button @click="removeFile(index)"
          class="flex items-center justify-center p-1 text-red-500 hover:cursor-pointer hover:text-red-700 disabled:cursor-default"
          type="button" :disabled="props.isUploading">
          <ErrorIcon v-if="!props.isUploading" :size="24" class="text-red-500" />
          <div v-if="props.isUploading" class="relative">
            <svg class="h-5 w-5 animate-spin text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8v-2z"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error && errorMessage" class="text-danger mt-2 text-sm font-normal">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ErrorIcon from '../icons/ErrorIcon.vue';
import UploadIcon from '../icons/UploadIcon.vue';

interface Props {
  label?: string;
  id?: string;
  multiple?: boolean;
  accept?: string;
  acceptText?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  isUploading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  id: 'drag-drop-input',
  multiple: false,
  accept: 'image/*',
  acceptText: '',
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 1,
  error: false,
  errorMessage: '',
  disabled: false,
  isUploading: false,
});

const emit = defineEmits<{
  (e: 'error', message: string): void;
  (e: 'upload', files: File[]): void;
}>();

const fileInput = ref<HTMLInputElement>();
const isDragOver = ref(false);
const files = ref<File[]>([]);

const containerClasses = computed(() => [
  'w-full',
  { 'opacity-50 pointer-events-none': props.disabled },
]);

const dropZoneClasses = computed(() => [
  'border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 border-green-500',
  {
    'border-primary bg-primary/5': isDragOver.value,
    'border-gray-300 hover:border-gray-400': !isDragOver.value && !props.error,
    'border-red-300 bg-red-50': props.error,
  },
]);

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragOver.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragOver.value = false;
};

const handleDrop = (e: DragEvent) => {
  if (props.isUploading) return;
  e.preventDefault();
  e.stopPropagation();
  isDragOver.value = false;

  const droppedFiles = Array.from(e.dataTransfer?.files || []);
  processFiles(droppedFiles);
};

const triggerFileInput = () => {
  if (!props.disabled && !props.isUploading) {
    fileInput.value?.click();
  }
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files || []);
  processFiles(selectedFiles);
};

const processFiles = (newFiles: File[]) => {
  let validFiles = [...files.value];

  for (const file of newFiles) {
    // Check file size
    if (file.size > props.maxSize) {
      emit(
        'error',
        `File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxSize)}.`
      );
      continue;
    }

    // Check file type
    if (props.accept && !isFileTypeAccepted(file)) {
      emit('error', `File "${file.name}" is not an accepted file type.`);
      continue;
    }

    // Check max files limit
    if (!props.multiple && validFiles.length >= 1) {
      validFiles = [file]; // Replace existing file
      break;
    } else if (validFiles.length >= props.maxFiles) {
      emit('error', `Maximum ${props.maxFiles} files allowed.`);
      break;
    }

    validFiles.push(file);
  }

  files.value = validFiles;
  emit('upload', validFiles);
};

const isFileTypeAccepted = (file: File): boolean => {
  if (!props.accept) return true;

  const acceptedTypes = props.accept.split(',').map((type) => type.trim());

  return acceptedTypes.some((type) => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    if (type.includes('*')) {
      const [mainType] = type.split('/');
      return file.type.startsWith(mainType || '');
    }
    return file.type === type;
  });
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>
