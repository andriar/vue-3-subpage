import apiV1, { apiV2 } from '@/utils/axios';

export const featureApi = {
  get: () => apiV2.get<any[]>('/features'),
};

export const planApi = {
  get: () => apiV1.get<any[]>('/admin/my_plan'),
};

export const appApi = {
  get: () => apiV2.get<any[]>('/app/details'),
};

export const profileApi = {
  get: () => apiV1.get<any[]>('/admin/get_profile'),
};
