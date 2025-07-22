import { ref } from 'vue';

import { telegramApi } from '@/api/channels';
import type { ICreateTelegramChannel } from '@/types/channels';
import {
  type TelegramChannel,
  TelegramChannelUpdateResponseSchema,
} from '@/types/schemas/channels/telegram/telegram-list-channel';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useCreateTelegram = () => {
  const loading = ref(false);
  const data = ref<TelegramChannel | null>(null);
  const error = ref<Error | null>(null);

  const createTelegram = async (payload: ICreateTelegramChannel) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await telegramApi.create(payload);

      // Same validation with update telegram channel
      const validatedResponse = TelegramChannelUpdateResponseSchema.parse(response.data);
      data.value = validatedResponse.data.telegram_channel;
    } catch (err) {
      handleComposableError(err, error, 'Error create telegram');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    createTelegram,
  };
};
