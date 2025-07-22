import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import { type QiscusChannel, QiscusDetailResponseSchema } from '@/types/schemas/qiscus';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchQiscusDetail = () => {
  const loading = ref(false);
  const data = ref<QiscusChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetchChannelById = async (id: number | string) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.getById(id);

      // Validate the response using Zod schema
      const validatedResponse = QiscusDetailResponseSchema.parse(response.data);
      data.value = validatedResponse.data.qiscus_channel;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching qiscus detail');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  const isLatestVersion = () => {
    const version = parseInt(data.value?.widget_version || '0');
    if (version < 5) {
      return false;
    }
    return true;
  };

  return {
    loading,
    data,
    error,
    fetchChannelById,
    isLatestVersion,
  };
};
