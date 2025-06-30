import type { IParams } from '@/types/api';

import apiV1 from './../utils/axios';

// API v1 examples
export const myPlanApi = {
  get: (params: IParams) => apiV1.get<any[]>('/admin/my_plan', { params }),
};
