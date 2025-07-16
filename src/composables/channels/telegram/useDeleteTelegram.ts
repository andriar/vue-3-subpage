import { ref } from 'vue';

import { telegramApi } from '@/api/channels';

export const useDeleteTelegram = () => {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const deleteTelegram = async (channelId: number | undefined) => {
    try {
      loading.value = true;
      error.value = null;

      await telegramApi.delete(channelId);
    } catch (err) {
      // Log all errors for debugging
      console.error('Error fetching:', err);

      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    deleteTelegram,
  };
};
