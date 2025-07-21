import { defineStore } from 'pinia';
import { ref } from 'vue';



import type { ISdkUser, IUser } from '@/types/user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const sdkUser = ref<ISdkUser | null>(null);

  const setUser = (data: IUser) => {
    user.value = data;
  };

  const setSdkUser = (data: ISdkUser) => {
    sdkUser.value = data;
  };

  return { user, setUser, sdkUser, setSdkUser };
});