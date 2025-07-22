import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import {
  type QiscusWidgetConfigData,
  QiscusWidgetConfigResponseSchema,
} from '@/types/schemas/channels/qiscus-widget/config-qiscus-widget';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchConfigWidgetQiscus = () => {
  const loading = ref(false);
  const data = ref<QiscusWidgetConfigData | null>(null);
  const error = ref<Error | null>(null);

  const fetchConfigWidget = async (appId: string, channelId: string) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.getWidgetConfig(appId, channelId);

      const validatedResponse = QiscusWidgetConfigResponseSchema.parse(response.data);

      data.value = validatedResponse.data.widget.variables || null;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching config widget qiscus');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    fetchConfigWidget,
  };
};
