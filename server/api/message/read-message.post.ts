import ApiHelper from '~/server/helper/apiHelper';
import { URL_READ_MESSAGE } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const query = getQuery(event);      
      const res = await ApiHelper.post(
        `${URL_READ_MESSAGE}?conversationId=${query.conversationId}`,
        {},
        event
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
