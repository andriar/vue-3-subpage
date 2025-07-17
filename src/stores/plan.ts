import { defineStore } from 'pinia';
import { ref } from 'vue';
import z from 'zod';

import { planApi } from '@/api/app';
import { type PlanData, PlaneResponseSchema } from '@/types/schemas/plan';

export const usePlanStore = defineStore('plan', () => {
  const planData = ref<PlanData | null>(null);
  const errorPlanData = ref<Error | null>(null);

  const getPlanData = async () => {
    try {
      const { data } = await planApi.get();
      const validatedResponse = PlaneResponseSchema.parse(data);
      planData.value = validatedResponse.data;
    } catch (err) {
      console.error('Error fetching plan data:', err);
      if (err instanceof z.ZodError) {
        console.error('Validation error:', err.issues);
        errorPlanData.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        errorPlanData.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
    }
  };

  return {
    planData,
    errorPlanData,
    getPlanData,
  };
});
