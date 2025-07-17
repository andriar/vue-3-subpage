import { defineStore } from 'pinia';
import { ref } from 'vue';
import z from 'zod';

import { appApi } from '@/api/app';
import { AppResponseSchema, type AppSchemaType } from '@/types/schemas/app';

const defaultData = {
  app_code: '',
  bot_webhook_url: '',
  created_at: '',
  id: 0,
  is_active: false,
  is_bot_enabled: false,
  is_sessional: false,
  name: '',
  paid_channel_approved: null,
  secret_key: '',
  use_2fa: false,
  user: null,
};

const defaultAccountSecurity = {
  expiration_day: 0,
  expired_on: 0,
  id: 0,
  last_password_update: '',
};

export const useAppDetailStore = defineStore('appDetail', () => {
  const detail = ref<AppSchemaType>({ ...defaultData, user: defaultAccountSecurity });
  const error = ref<Error | null>();

  const fetch = async () => {
    try {
      const { data } = await appApi.get();

      // satisfy response schema
      const response = { data };

      const validatedResponse = AppResponseSchema.parse(response);
      detail.value = validatedResponse.data;
    } catch (err) {
      console.error('Error fetching plan data:', err);
      if (err instanceof z.ZodError) {
        console.error('Validation error:', err.issues);
        error.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
    }
  };
  return {
    detail,
    error,
    fetch,
  };
});
