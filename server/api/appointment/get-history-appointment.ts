import ApiHelper from '~/server/helper/apiHelper';
import { URL_APPOINTMENT_HISTORY } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const query = getQuery(event);
      const res = await ApiHelper.getApi(URL_APPOINTMENT_HISTORY, query);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
