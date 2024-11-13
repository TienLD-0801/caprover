import { defineStore } from 'pinia';


export const useDnsStore = defineStore('dnsStore', {
  state: () => ({
    domain: '',
  }),
  actions: {
    getDns(tenant_id: string | string[] ) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data, error } = await useFetch('/api/dns', {
            params: { id: tenant_id },
          });

          if (error.value) {
            reject(error.value);
          }

          if (data.value) {
            this.domain = data.value?.domain;
            resolve(data.value);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
