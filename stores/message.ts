import { defineStore } from 'pinia';
import type { paramsGetMessage } from '~/types/apiRequest';
import type {
  MessageInfo,
  PaginationInfo,
  paramsReadMessage,
  ResponseMessage,
} from '~/types/messageResponse';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    dataMessage: [] as MessageInfo[],
    pagination: {} as PaginationInfo,
  }),
  actions: {
    getMessage(params: paramsGetMessage): Promise<ResponseMessage> {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await useFetchCustom<ResponseMessage>(
            '/api/message/get-message',
            {
              method: 'GET',
              params: params,
            }
          );
          // this.pagination = res?.data.value?.pagination;
          // if (res?.messages) {
          //   this.dataMessage.push(...res.messages);
          // }
          // resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },

    addMessage(newMessage: MessageInfo) {
      if (this.dataMessage) this.dataMessage.unshift(newMessage);
    },

    sendMessage(req: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await useFetchCustom('/api/message/send-message', {
            method: 'POST',
            body: req,
          });
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
    async readMessage(params: paramsReadMessage) {
      try {
        const res = await useFetchCustom(
          `/api/message/read-message?conversationId=${params.conversationId}`,
          {
            method: 'POST',
            body: params,
          }
        );
        return res;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
