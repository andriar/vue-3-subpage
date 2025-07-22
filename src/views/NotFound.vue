<template>
  <div class="text-center h-screen flex flex-col items-center justify-center gap-4 px-4">
    <p class="text-base font-semibold text-primary">404</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page not found</h1>
    <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re
      looking for.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <Button id="back-btn" to="/" intent="primary" shape="rectangular" size="large">
        Go back integration
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue';
</script>