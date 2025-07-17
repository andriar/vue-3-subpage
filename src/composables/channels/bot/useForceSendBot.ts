import { ref } from 'vue';
import { z } from 'zod';

import { botApi } from '@/api/channels';
import {
  type ForceSendBot,
  ForceSendBotResponseSchema,
} from '@/types/schemas/channels/bot/force-send-bot';

export const useForceSendBot = () => {
  const loading = ref(false);
  const data = ref<ForceSendBot | null>(null);
  const error = ref<Error | null>(null);

  const forceSend = async (payload: { is_force_send_bot: boolean }) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.forceSendBot(payload);

      const validatedResponse = ForceSendBotResponseSchema.parse(response.data);
      data.value = validatedResponse.data.bot;
    } catch (err) {
      // Log all errors for debugging
      console.error('Error fetching:', err);

      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        console.error('Validation error:', err.issues);
        error.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    forceSend,
  };
};
