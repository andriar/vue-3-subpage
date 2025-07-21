import { ref } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';



import { isAuthenticated } from '@/utils/authValidation';
import NotFound from '@/views/NotFound.vue';

import integrationRoutes from './integration';

declare global {
  interface Window {
    vueAppBaseId?: string | number;
  }
}

export const navigationDirection = ref<'back' | 'forward' | 'replace' | 'initial'>('initial');

export function createRouter(appId?: string | number): Router {
  const routes: RouteRecordRaw[] = [
    ...integrationRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ];

  let dynamicAppId: string | undefined;

  if (appId) {
    dynamicAppId = String(appId);
  } else if (
    typeof window !== 'undefined' &&
    typeof window.vueAppBaseId !== 'undefined' &&
    window.vueAppBaseId !== null
  ) {
    dynamicAppId = String(window.vueAppBaseId);
  }

  const VUE_ROUTER_BASE_PATH = dynamicAppId ? `/web/${dynamicAppId}/channels/` : '/';

  const router = createVueRouter({
    history: createWebHistory(VUE_ROUTER_BASE_PATH),
    routes: routes,
  });

  if (typeof window !== 'undefined') {
    router.options.history.listen((_to, _from, info) => {
      navigationDirection.value = info.direction as 'back' | 'forward' | 'replace' | 'initial';
    });
  }

  router.beforeEach((to, _from, next) => {
    const isAuth = isAuthenticated(to.meta.roles as number[]);

    if (to.meta.requiresAuth) {
      if (isAuth) {
        // User is authenticated, proceed to the route
        next();
      } else {
        // User is not authenticated, redirect to login
        router.push('/redirect-logout');
      }
    } else {
      next();
    }
  });
  return router;
}