import type { RouteRecordRaw } from 'vue-router';

import ChannelView from '@/views/integration/ChannelView.vue';

export const integrationRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: ChannelView,
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=whatsapp`;
      return false;
    },
  },
  {
    path: '/instagram',
    name: 'instagram',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=instagram`;
      return false;
    },
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=tiktok`;
      return false;
    },
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=facebook`;
      return false;
    },
  },
  {
    path: '/line',
    name: 'line',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=line`;
      return false;
    },
  },
  {
    path: '/telegram',
    name: 'telegram',
    redirect: { name: 'telegram-detail' },
    children: [
      {
        path: '',
        name: 'telegram-detail',
        component: () => import('@/views/integration/telegram/TelegramView.vue'),
      },
      {
        path: 'create',
        name: 'telegram-create',
        component: () => import('@/views/integration/telegram/TelegramCreateChannelView.vue'),
      },
    ],
  },
  {
    path: '/qiscus',
    name: 'qiscus',
    redirect: { name: 'qiscus-list' },
    children: [
      {
        path: '',
        name: 'qiscus-list',
        component: () => import('@/views/integration/widget/WidgetChannelView.vue'),
      },
      {
        path: ':id',
        name: 'qiscus-detail',
        component: () => import('@/views/integration/widget/WidgetDetailView.vue'),
        props: true,
      },
      {
        path: 'create',
        name: 'qiscus-create',
        component: () => import('@/views/integration/widget/WidgetCreateChannelView.vue'),
      },
    ],
  },
  {
    path: '/custom_channel',
    name: 'custom_channel',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=custom_channel`;
      return false;
    },
  },
  {
    path: '/bot_integration',
    name: 'bot_integration',
    component: () => null,
    beforeEnter: () => {
      window.location.href = `/integration?ch=bot_integration`;
      return false;
    },
  },
];

export default integrationRoutes;
