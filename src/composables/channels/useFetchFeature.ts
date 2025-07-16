import { featureApi } from "@/api/channels";
import { useAppFeaturesStore } from "@/stores/app-features";
import { FeatureResponseSchema } from "@/types/schemas/feature";
import { ref } from "vue";
import z from "zod";

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
            console.error('Error fetching feature:', err);
            if (err instanceof z.ZodError) {
                console.error('Validation error:', err.issues);
                error.value = new Error(
                    `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
                );
            } else {
                error.value = err instanceof Error ? err : new Error('An unknown error occurred');
            }
        } finally {
            loading.value = false;
        };

    };
    return {
        loading,
        error,
        fetchFeature,
    };
}