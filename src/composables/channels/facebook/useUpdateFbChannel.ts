import { fbApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { FbChannel } from "@/types/schemas/fb-channel";
import { ref } from "vue";

export const useUpdateFbChannel = () => {
    const loading = ref(false);
    const data = ref<FbChannel | null>(null);
    const error = ref<Error | null>(null);

    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await fbApi.update({
                id: id,
                ...payload,
            });

            const dataResponse = response.data as unknown as IResponse<any>;
            const { fb_channel } = dataResponse.data;
            data.value = fb_channel;
        } catch (err) {
            error.value = err instanceof Error ? err : new Error('An unknown error occurred');
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