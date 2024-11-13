import ApiHelper from '~/server/helper/apiHelper';
import { URL_GET_MESSAGE } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const query = getQuery(event);
      const res = await ApiHelper.get(
        URL_GET_MESSAGE,
        query,
        event
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
