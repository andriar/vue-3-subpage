import { ref } from 'vue';

import { telegramApi } from '@/api/channels';
import type { IUpdateTelegramChannel } from '@/types/channels';
import {
  type TelegramChannel,
  TelegramChannelUpdateResponseSchema,
} from '@/types/schemas/channels/telegram/telegram-list-channel';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useUpdateTelegram = () => {
  const loading = ref(false);
  const data = ref<TelegramChannel | null>(null);
  const error = ref<Error | null>(null);

  const updateTelegram = async (channelId: number | undefined, payload: IUpdateTelegramChannel) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await telegramApi.update(channelId, payload);

      const validatedResponse = TelegramChannelUpdateResponseSchema.parse(response.data);
      data.value = validatedResponse.data.telegram_channel;
    } catch (err) {
      handleComposableError(err, error, 'Error update telegram');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    updateTelegram,
  };
};
