import type { IParams } from '@/types/api';
import type { ICreateQiscusChannel, IUpdateTelegramChannel } from '@/types/channels';

import apiV1, { apiV2, apiV3 } from './../utils/axios';

// API v1 examples
export const channelsApi = {
  getChannels: () => apiV2.get<any[]>('/channels'),
  updateChannelStatus: (id: number, isActive: boolean) =>
    apiV2.post(`/qiscus/connect/${id}/update`, { is_active: isActive }),
};

export const qiscusApi = {
  get: (params?: IParams) => apiV3.get<any[]>('/admin/channel/qiscus', { params }),
  getById: (id: number | string) => apiV2.get<any>(`/qiscus/${id}`),
  update: (data: any) => apiV2.post<any>(`/qiscus/connect/${data.id}/update`, data),
  post: (data: ICreateQiscusChannel) => apiV2.post<any>(`/qiscus/connect`, data),
  getWidgetConfig: (appId: string, channelId: string) =>
    apiV2.get<any>(`/app/config/public-widget/${appId}/${channelId}`),
  postWidgetConfig: (channelId: string, data: any) =>
    apiV2.post<any>(`/qiscus/widget_configs/${channelId}`, data),
};

export const whatsappApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/wa', { params }),
  getById: (id: number) => apiV2.get<any>(`/wa/${id}`),
  update: (data: any) => apiV2.post<any>(`/wa/connect/${data.id}/update`, data),
};

export const instagramApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/ig', { params }),
  update: (data: any) => apiV2.post<any>(`/ig/connect/${data.id}/update`, data),
};

export const telegramApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/telegram', { params }),
  update: (channelId: number | undefined, data: IUpdateTelegramChannel) =>
    apiV2.post<any[]>(`/telegram/connect/${channelId}/update`, data),
  delete: (channelId: number | undefined) =>
    apiV2.post<any[]>(`/telegram/connect/${channelId}/delete`),
  create: (data: any) => apiV2.post<any[]>(`/telegram/connect`, data),
};

export const configApi = {
  get: (id: number | string, params: any) =>
    apiV2.get<any[]>(`/channels/${id}/configs`, { params }),
  update: (id: number | string, data: any) => apiV2.post<any[]>(`/channels/${id}/configs`, data),
};

export const botApi = {
  get: () => apiV1.get<any[]>('/app/bot'),
  changeStatus: (params: any) => apiV1.post<any[]>('/app/bot/activation', { params }),
};

export const featureApi = {
  get: () => apiV2.get<any[]>('/features'),
};

export const planApi = {
  get: () => apiV1.get<any[]>('/admin/my_plan'),
};
