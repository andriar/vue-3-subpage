import { ref } from 'vue';

import { configApi } from '@/api/channels';
import { type ConfigChannel, ConfigChannelResponseSchema } from '@/types/schemas/config-channel';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchConfig = () => {
  const loading = ref(false);
  const data = ref<ConfigChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async (id: number | string, source: string) => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        source,
      };
      const response = await configApi.get(id, params);

      // Validate the response using Zod schema
      const validatedResponse = ConfigChannelResponseSchema.parse(response.data);
      data.value = validatedResponse.data.channel_config;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching config channel');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    fetch,
  };
};
