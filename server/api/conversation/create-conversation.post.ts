import ApiHelper from '~/server/helper/apiHelper';
import { URL_CREATE_CONVERSATION, URL_GET_CONVERSATION } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const query = getQuery(event);
      const res = await ApiHelper.post(
        URL_CREATE_CONVERSATION + `?receiverId=${query?.receiverId}`,
        {},
        event
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
