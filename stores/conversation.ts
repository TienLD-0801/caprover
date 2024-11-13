import { defineStore } from 'pinia';
import type { ApiCreateConversation } from '~/types/apiResponse';

export const useConversationStore = defineStore('conversationStore', {
  state: () => ({
    conversationInfo: null as ApiCreateConversation | null,
  }),
  actions: {
    createConversation(tenant_id: any): Promise<ApiCreateConversation> {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await useAPIFetch<ApiCreateConversation>(
            '/api/conversation/create-conversation',
            {
              method: 'POST',
              params: {
                receiverId: tenant_id,
              },
            }
          );
          this.conversationInfo = res;
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
