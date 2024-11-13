import ApiHelper from '~/server/helper/apiHelper';
import { URL_GET_CONVERSATION_TOTAL } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      // const res = await ApiHelper.getForBusiness(
      //   URL_GET_CONVERSATION_TOTAL, {}, event
      // );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
