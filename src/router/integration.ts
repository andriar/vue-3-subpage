import type { RouteRecordRaw } from 'vue-router';

import ChannelView from '@/views/integration/ChannelView.vue';

// Ensure RouteRecordRaw is imported

// This array explicitly defines your integration routes.
// It is correctly typed as RouteRecordRaw[].
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
        path: '', // Full path: /qiscus
        name: 'whatsapp-list',
        component: () => import('@/views/integration/whatsapp/WhatsappChannelView.vue'),
      },
      // wip
      {
        path: ':id', // Full path: /qiscus/:id
        name: 'whatsapp-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=whatsapp&id=${to.params.id}`;
          return false;
        },
      },
      {
        path: 'create', // Full path: /qiscus/create
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
  // {
  //   path: '/telegram',
  //   name: 'telegram',
  //   component: () => TelegramView, // This route is a placeholder for custom channel integration
  // beforeEnter: () => {
  //   window.location.href = `/integration?ch=telegram`;
  //   return false;
  // },
  // },
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
        path: 'create', // Full path: /telegram/create
        name: 'telegram-create',
        component: () => import('@/views/integration/telegram/TelegramCreateChannelView.vue'),
      },
    ],
  },
  {
    path: '/qiscus',
    name: 'qiscus',
    // This is an internal Vue Router redirect, staying within the SPA.
    redirect: { name: 'qiscus-list' },
    children: [
      {
        path: '', // Full path: /qiscus
        name: 'qiscus-list',
        component: () => import('@/views/integration/widget/WidgetChannelView.vue'),
      },
      {
        path: ':id', // Full path: /qiscus/:id
        name: 'qiscus-detail',
        component: () => import('@/views/integration/widget/WidgetDetailView.vue'),
        props: true, // Pass route params as props to the component
      },
      {
        path: 'create', // Full path: /qiscus/create
        name: 'qiscus-create',
        component: () => import('@/views/integration/widget/WidgetCreateChannelView.vue'),
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
