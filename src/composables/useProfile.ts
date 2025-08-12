import { ref } from 'vue';

import { profileApi } from '@/api/app';
import { type ProfileData, ProfileResponseSchema } from '@/types/schemas/profile';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchProfile = () => {
  const loading = ref(false);
  const data = ref<ProfileData | null>(null);
  const error = ref<Error | null>(null);

  const fetchProfile = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await profileApi.get();

      const validatedResponse = ProfileResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching profile');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    fetchProfile,
  };
};
