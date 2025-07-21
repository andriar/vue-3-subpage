import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const sdkUser = ref<any>(null);

  const setUser = (data: any) => {
    user.value = data;
  };

  const setSdkUser = (data: any) => {
    sdkUser.value = data;
  };

  return { user, setUser, sdkUser, setSdkUser };
});