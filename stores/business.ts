import { defineStore } from 'pinia';

export const useBusinessStore = defineStore('businessStore', {
  state: () => ({
    businessInfo: null as any,
  }),
  actions: {
    async getBusinessInfo() {
      return new Promise(async (resolve, reject) => {
        try {
          const {data , error } = await useFetch('/api/business/get-business');
          if(error.value){
            reject(error.value);
          }       
          this.businessInfo = data.value?.result?.data;          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
