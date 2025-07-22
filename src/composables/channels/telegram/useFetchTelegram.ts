import { ref } from 'vue';

import { telegramApi } from '@/api/channels';
import type { IPagination2 } from '@/types/api';
import {
  type TelegramChannel,
  TelegramChannelResponseSchema,
} from '@/types/schemas/channels/telegram/telegram-list-channel';
import type { MetaPagination } from '@/types/schemas/common';
import { handleComposableError } from '@/utils/helper/errorHandler';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: IPagination2 = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchTelegram = () => {
  const loading = ref(false);
  const data = ref<TelegramChannel[]>([]);
  const meta = ref<MetaPagination>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchTelegram = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await telegramApi.get(newParams);

      const validatedResponse = TelegramChannelResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching telegram');
      data.value = [];
      meta.value = { ...initMeta };
    } finally {
      loading.value = false;
    }
  };

  function _getParams(params: IPagination2) {
    return filterFilledObj(params);
  }

  return {
    loading,
    data,
    meta,
    error,
    fetchTelegram,
  };
};
