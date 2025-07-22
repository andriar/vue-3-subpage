import { ref } from 'vue';

import { botApi } from '@/api/channels';
import {
  type IntegrateBot,
  IntegrateBotResponseSchema,
} from '@/types/schemas/channels/bot/integrate-bot';
import { handleComposableError } from '@/utils/helper/errorHandler';

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
      handleComposableError(err, error, 'Error integrate bot');
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
