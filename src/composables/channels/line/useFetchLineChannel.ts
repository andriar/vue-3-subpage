import { ref } from 'vue';

import { lineApi } from '@/api/channels';
import {
  type LineChannelList,
  LineChannelResponseSchema,
} from '@/types/schemas/channels/line-channel';
import type { MetaPagination } from '@/types/schemas/common';
import { handleComposableError } from '@/utils/helper/errorHandler';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: MetaPagination = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

const _getParams = (params: MetaPagination) => {
  return filterFilledObj(params);
};

export const useFetchLineChannel = () => {
  const loading = ref(false);
  const meta = ref<MetaPagination>({ ...initMeta });
  const error = ref<Error | null>(null);
  const data = ref<LineChannelList>([]);

  const fetchChannels = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await lineApi.get(newParams);

      const validatedResponse = LineChannelResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching line channel');
      data.value = [];
      meta.value = { ...initMeta };
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    meta,
    error,
    fetchChannels,
  };
};
