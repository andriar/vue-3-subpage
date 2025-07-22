import { ref } from 'vue';

import { botApi } from '@/api/channels';
import {
  type ForceSendBot,
  ForceSendBotResponseSchema,
} from '@/types/schemas/channels/bot/force-send-bot';
import { handleComposableError } from '@/utils/helper/errorHandler';

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
      handleComposableError(err, error, 'Error force send bot');
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
