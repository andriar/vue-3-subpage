import { useAppConfigStore } from '@/stores/app-config';
import { useAuthStore } from '@/stores/auth';

export const isAuthenticated = (roles: number[]) => {
  const authStore = useAuthStore();
  const appConfigStore = useAppConfigStore();
  const user = authStore.user;

  if (user && roles?.length > 0) {
    return roles.includes(user.type) && appConfigStore.userToken;
  } else if (user && roles?.length === 0) {
    return appConfigStore.userToken;
  }

  return false;
};