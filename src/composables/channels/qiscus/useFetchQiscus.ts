import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import {
  type QiscusChannelList,
  QiscusChannelResponseSchema,
} from '@/types/schemas/channels/qiscus-list-channel';
import type { MetaPagination } from '@/types/schemas/common';
import { handleComposableError } from '@/utils/helper/errorHandler';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: MetaPagination = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<QiscusChannelList>([]);
  const meta = ref<MetaPagination>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchChannels = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await qiscusApi.get(newParams);

      const validatedResponse = QiscusChannelResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching qiscus');
      data.value = [];
      meta.value = { ...initMeta };
    } finally {
      loading.value = false;
    }
  };

  function _getParams(params: MetaPagination) {
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
