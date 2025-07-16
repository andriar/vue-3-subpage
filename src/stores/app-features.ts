import type { Feature } from "@/types/schemas/feature";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppFeaturesStore = defineStore('appFeatures', () => {
    const featureData = ref<Feature[]>([]);

    const dispatchFeatures = (features: Feature[]) => {
        featureData.value = features;
    }

    return {
        featureData,
        dispatchFeatures,
    }
})



