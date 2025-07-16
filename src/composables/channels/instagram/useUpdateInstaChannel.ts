import { instagramApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { InstaChannel } from "@/types/schemas/insta-channel";
import { ref } from "vue";

export const useUpdateInstaChannel = () => {
    const loading = ref(false);
    const data = ref<InstaChannel | null>(null);
    const error = ref<Error | null>(null);

    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await instagramApi.update({
                id: id,
                ...payload,
            });

            const dataResponse = response.data as unknown as IResponse<any>;
            const { ig_channel } = dataResponse.data;
            data.value = ig_channel;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('An unknown error occurred');
            data.value = null;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        data,
        error,
        update,
    }
}