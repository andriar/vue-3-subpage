import { ref } from 'vue';
import { z } from 'zod';

import { botApi } from '@/api/channels';
import {
  type IntegrateBot,
  IntegrateBotResponseSchema,
} from '@/types/schemas/channels/bot/integrate-bot';

export const useIntegrateBot = () => {
  const loading = ref(false);
  const data = ref<IntegrateBot | null>(null);
  const error = ref<Error | null>(null);

  const integrate = async (payload: { bot_webhook_url: string; is_bot_enabled: boolean }) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.integrate(payload);

      const validatedResponse = IntegrateBotResponseSchema.parse(response.data);
      data.value = validatedResponse.data.app;
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
    integrate,
  };
};
