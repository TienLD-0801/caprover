import ApiHelper from '~/server/helper/apiHelper';
import { URL_MESSAGE_SEND } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const body = await readFormData(event);
      const res = await ApiHelper.post(
        URL_MESSAGE_SEND,
        {
          body: body,
          header: { contentType: 'multipart/form-data' },
        },
        event
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
