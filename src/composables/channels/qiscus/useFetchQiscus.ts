import { ref } from 'vue';
import { z } from 'zod';

import { qiscusApi } from '@/api/channels';
import type { IPagination2 } from '@/types/api';
import { filterFilledObj } from '@/utils/helper/object';

import { type Pagination, type QiscusChannel, QiscusResponseSchema } from '../schema/qiscus';

const initMeta: IPagination2 = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<QiscusChannel[]>([]);
  const meta = ref<Pagination>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchChannels = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await qiscusApi.get(newParams);

      // Validasi response dengan Zod
      const validatedResponse = QiscusResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        console.error('Validation Error:', err.errors);
        error.value = new Error(
          `Validation failed: ${err.errors.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
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
    fetchChannels,
  };
};
