import { ref } from 'vue';

import { botApi } from '@/api/channels';
import {
  type IntegrateBot,
  IntegrateBotResponseSchema,
} from '@/types/schemas/channels/bot/integrate-bot';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useActivateBot = () => {
  const loading = ref(false);
  const data = ref<IntegrateBot | null>(null);
  const error = ref<Error | null>(null);

  const activate = async (payload: { is_active: boolean }) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.activate(payload);

      const validatedResponse = IntegrateBotResponseSchema.parse(response.data);
      data.value = validatedResponse.data.app;
    } catch (err) {
      handleComposableError(err, error, 'Error activate bot');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    activate,
  };
};
