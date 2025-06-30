import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { myPlanApi } from '@/api/plan';
import type { IPlan } from '@/types/plan';
import { initialPlan } from '@/utils/constant/plan';

export const useMyPlan = defineStore('my-plan', () => {
  // const
  const initPlan: IPlan = { ...initialPlan };

  // State
  const plan = ref<IPlan>({ ...initPlan });

  // getter
  const isActive = computed(() => {
    return !!(!plan.value.is_sku && plan.value.subscription_status === 'inactive');
  });

  // methods
  async function getMyPlan() {
    try {
      const data = await myPlanApi.get({});
      const response = data as any;
      plan.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getMyPlan,
    plan,
    isActive,
  };
});
