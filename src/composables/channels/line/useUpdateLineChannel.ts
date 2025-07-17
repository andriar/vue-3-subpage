import { lineApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { LineChannel } from "@/types/schemas/channels/line-channel";
import { ref } from "vue";

export const useUpdateLineChannel = () => {
    const loading = ref(false);
    const data = ref<LineChannel | null>(null);
    const error = ref<Error | null>(null);

    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await lineApi.update({
                id: id,
                ...payload,
            });

            const dataResponse = response.data as unknown as IResponse<any>;
            const { line_channel } = dataResponse.data;
            data.value = line_channel;
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