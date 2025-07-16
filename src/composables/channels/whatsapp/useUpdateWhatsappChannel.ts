import { whatsappApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { IWhatsappChannel } from "@/types/channels";
import { ref } from "vue";

export const useUpdateWhatsappChannel = () => {
    const loading = ref(false);
    const data = ref<IWhatsappChannel | null>(null);
    const error = ref<Error | null>(null);
    
    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await whatsappApi.update({
                id: id,
                ...payload,
            });

            const dataResponse = response.data as unknown as IResponse<any>;
            const { wa_channel } = dataResponse.data;
            data.value = wa_channel;
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
    };
}