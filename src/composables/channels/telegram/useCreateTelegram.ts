import { ref } from 'vue';
import { z } from 'zod';

import { telegramApi } from '@/api/channels';
import type { ICreateTelegramChannel } from '@/types/channels';
import {
  type TelegramChannel,
  TelegramChannelUpdateResponseSchema,
} from '@/types/schemas/channels/telegram/telegram-list-channel';

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
    createTelegram,
  };
};
