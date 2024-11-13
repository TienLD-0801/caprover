import { defineStore } from 'pinia';
import type { ApiLogin } from '~/types/apiResponse';
import type { userInfo } from '~/types/apiResponse';

export interface typeBodyLogin {
  phone: string;
  business_id: string;
  username: string | null;
}
export const loginChannel = new BroadcastChannel('login_channel');
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    secretKey: '',
    infoUser: null as userInfo | null,
  }),
  actions: {
    login(body: typeBodyLogin) {
      try {
        const { data } = useFetchCustom<ApiLogin>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        console.log('res', data.value || null);
        const userInfo: userInfo = getLocalStorage('user_info') || null;
        if (userInfo && userInfo.phone != body.phone) {
          loginChannel.postMessage('change_user');
        }

        if (data.value) {
          setLocalStorage('user_info', data.value.user);
          this.infoUser = data.value.user;
        }
        return data;
      } catch (error) {
        console.log('error', error);
      }
    },
    logout() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = useFetchCustom<ApiLogin>('/api/auth/logout', {
            method: 'POST',
          });
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
