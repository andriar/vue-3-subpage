<script setup lang="ts">
import { reactive } from 'vue';

import { useCreatePost } from '@/composables/posts/useCreatePost';
// Adjust path based on your project structure
import { useSweetAlert } from '@/composables/useSweetAlert';

// emits
const emit = defineEmits(['close']);

// Destructure values from the useCreatePost composable
const { loading, data, error, createPost } = useCreatePost();
const { showAlert } = useSweetAlert();

// Reactive form data
const postForm = reactive({
  title: '',
  body: '',
  userId: null as number | null, // Use null for optional number inputs
  tags: '', // Comma-separated string
  reactions: {
    likes: null as number | null,
    dislikes: null as number | null,
  },
});

// Function to handle form submission
const handleSubmit = async () => {
  // Prepare payload for the API call
  const payload = {
    title: postForm.title,
    // Conditionally include optional fields
    body: postForm.body || undefined,
    userId: postForm.userId !== null ? postForm.userId : undefined, // Check for explicit null
    tags: postForm.tags
      ? postForm.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : undefined,
    reactions: {
      likes: postForm.reactions.likes !== null ? postForm.reactions.likes : 0, // Default to 0 if null
      dislikes: postForm.reactions.dislikes !== null ? postForm.reactions.dislikes : 0, // Default to 0 if null
    },
  };

  await createPost(payload);

  if (error.value) {
    console.log(error);
    return showAlert.error({
      title: 'Error',
      text: 'error create post!',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  // Optionally, clear the form after successful submission
  // Check 'data.value' as `data` is a Ref returned by the composable
  if (data.value) {
    postForm.title = '';
    postForm.body = '';
    postForm.userId = null;
    postForm.tags = '';
    postForm.reactions.likes = null;
    postForm.reactions.dislikes = null;
  }

  showAlert
    .success({
      title: 'Success',
      text: 'success create post!',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    })
    .then((result) => {
      if (result.value) {
        // on close
        emit('close');
      }
    });
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title Input -->
      <div>
        <label for="title" class="mb-1 block text-sm font-medium text-gray-700">
          Title <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          v-model="postForm.title"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter post title"
        />
      </div>

      <!-- Body Textarea -->
      <div>
        <label for="body" class="mb-1 block text-sm font-medium text-gray-700"> Body </label>
        <textarea
          id="body"
          v-model="postForm.body"
          rows="4"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Write your post content here..."
        ></textarea>
      </div>

      <!-- User ID Input -->
      <div>
        <label for="userId" class="mb-1 block text-sm font-medium text-gray-700"> User ID </label>
        <input
          type="number"
          id="userId"
          v-model.number="postForm.userId"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., 5 (optional)"
        />
      </div>

      <!-- Tags Input -->
      <div>
        <label for="tags" class="mb-1 block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          v-model="postForm.tags"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., vue, javascript, web dev"
        />
      </div>

      <!-- Reactions -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label for="likes" class="mb-1 block text-sm font-medium text-gray-700"> Likes </label>
          <input
            type="number"
            id="likes"
            v-model.number="postForm.reactions.likes"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., 0"
          />
        </div>
        <div>
          <label for="dislikes" class="mb-1 block text-sm font-medium text-gray-700">
            Dislikes
          </label>
          <input
            type="number"
            id="dislikes"
            v-model.number="postForm.reactions.dislikes"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., 0"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-lg font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <span v-if="loading" class="flex items-center">
          <svg
            class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Creating Post...
        </span>
        <span v-else>Create Post</span>
      </button>
    </form>
  </div>
</template>
