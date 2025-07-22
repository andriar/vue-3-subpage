// composables/useFetchBot.ts
import axios from 'axios';
import { onUnmounted, ref } from 'vue';

import { botApi } from '@/api/channels';
import { type BotData, BotResponseSchema } from '@/types/schemas/channels/bot/bot';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchBot = () => {
  const loading = ref(false);
  const data = ref<BotData | null>(null);
  const error = ref<Error | null>(null);

  let controller: AbortController | null = null;

  const fetch = async () => {
    if (controller) {
      controller.abort('New request initiated, cancelling previous.');
    }

    controller = new AbortController();
    const signal = controller.signal;

    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.get({ signal });

      const validatedResponse = BotResponseSchema.parse(response.data);
      data.value = validatedResponse.data;
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        handleComposableError(err, error, 'Error fetching bot');
        data.value = null;
      }
    } finally {
      loading.value = false;
      controller = null;
    }
  };

  onUnmounted(() => {
    if (controller) {
      controller.abort('Component unmounted, cancelling bot fetch request.');
    }
  });

  return {
    loading,
    data,
    error,
    fetch,
  };
};
