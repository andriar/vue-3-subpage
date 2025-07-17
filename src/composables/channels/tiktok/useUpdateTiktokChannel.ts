import { tiktokApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { TiktokChannel } from "@/types/schemas/tiktok-channel";
import { ref } from "vue";

export const useUpdateTiktokChannel = () => {
    const loading = ref(false);
    const data = ref<TiktokChannel | null>(null);
    const error = ref<Error | null>(null);

    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await tiktokApi.update({
                id: id,
                ...payload,
            })

            const dataResponse = response.data as unknown as IResponse<any>;
            const { channel } = dataResponse.data;
            data.value = channel;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('An unknown error occurred');
            data.value = null;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        data,
        error,
        update,
    }
}