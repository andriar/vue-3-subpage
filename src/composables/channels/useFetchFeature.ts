import { ref } from 'vue';

import { featureApi } from '@/api/app';
import { useAppFeaturesStore } from '@/stores/app-features';
import { FeatureResponseSchema } from '@/types/schemas/feature';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchFeature = () => {
  const loading = ref(false);
  const { dispatchFeatures } = useAppFeaturesStore();
  const error = ref<Error | null>(null);

  const fetchFeature = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await featureApi.get();

      const validatedResponse = FeatureResponseSchema.parse(response.data);
      dispatchFeatures(validatedResponse.data.features);
    } catch (err) {
      handleComposableError(err, error, 'Error fetching feature');
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    error,
    fetchFeature,
  };
};
