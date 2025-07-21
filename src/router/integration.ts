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
    redirect: { name: 'whatsapp-list' },
    children: [
      {
        path: '',
        name: 'whatsapp-list',
        component: () => import('@/views/integration/whatsapp/WhatsappChannelView.vue'),
      },
      // wip
      {
        path: ':id',
        name: 'whatsapp-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=whatsapp&id=${to.params.id}`;
          return false;
        },
      },
      {
        path: 'create',
        name: 'whatsapp-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=whatsapp&act=create`;
          return false;
        },
      },
    ],
  },
  {
    path: '/instagram',
    name: 'instagram',
    redirect: { name: 'instagram-list' },
    children: [
      {
        path: '',
        name: 'instagram-list',
        component: import('@/views/integration/instagram/InstagramChannelView.vue'),
      },
      {
        path: 'create',
        name: 'instagram-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=instagram&act=create`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'instagram-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=instagram&id=${to.params.id}`;
          return false;
        },
      },
    ],
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    redirect: { name: 'tiktok-list' },
    children: [
      {
        path: '',
        name: 'tiktok-list',
        component: () => import('@/views/integration/tiktok/TiktokChannelView.vue'),
      },
      {
        path: 'create',
        name: 'tiktok-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=tiktok&act=create`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'tiktok-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=tiktok&id=${to.params.id}`;
          return false;
        },
      },
    ],
  },
  {
    path: '/facebook',
    name: 'facebook',
    redirect: { name: 'facebook-list' },
    children: [
      {
        path: '',
        name: 'facebook-list',
        component: () => import('@/views/integration/facebook/FbChannelView.vue'),
      },
      {
        path: 'create',
        name: 'facebook-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=facebook&act=create`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'facebook-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=facebook&id=${to.params.id}`;
          return false;
        },
      },
    ],
  },
  {
    path: '/line',
    name: 'line',
    redirect: { name: 'line-list' },
    children: [
      {
        path: '',
        name: 'line-list',
        component: () => import('@/views/integration/line/LineChannelView.vue'),
      },
      {
        path: 'create',
        name: 'line-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=line&act=create`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'line-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=line&id=${to.params.id}`;
          return false;
        },
      },
    ],
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
      {
        path: ':id/preview',
        name: 'qiscus-widget-preview',
        component: () => import('@/features/widget-builder/pages/WidgetPreview.vue'),
        props: false,
      },
    ],
  },
  {
    path: '/custom_channel',
    name: 'custom_channel',
    redirect: { name: 'custom_channel-list' },
    children: [
      {
        path: '',
        name: 'custom_channel-list',
        component: () => import('@/views/integration/custom-channel/CustomChannelView.vue'),
      },
      {
        path: 'create',
        name: 'custom_channel-create',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=custom_channel&act=create`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'custom_channel-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=custom_channel&id=${to.params.id}`;
          return false;
        },
      },
    ],
  },
  {
    path: '/bot-integration',
    name: 'bot-integration',
    component: () => import('@/views/integration/bot/BotView.vue'),
  },
];

export default integrationRoutes;
