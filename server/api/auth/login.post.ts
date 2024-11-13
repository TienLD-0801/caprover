import ApiHelper from '~/server/helper/apiHelper';
import { hashApiKey } from '~/server/helper/cryptoKey';
import { URL_LOGIN } from '~/server/url';
import { ApiLogin, ApiResponse } from '~/types/apiResponse';

export default defineEventHandler((event) => {
  return new Promise<ApiResponse<ApiLogin>>(async (resolve, reject) => {
    try {
      const body = await readBody(event);
      const apiKey = hashApiKey(body?.phone, 'keyPhone');
      const res = await ApiHelper.postLogin(
        URL_LOGIN,
        {
          apiKey: apiKey,
          body: body,
        },
        event
      );

      const authCustomer = JSON.stringify({
        apiKeyPhone: apiKey,
        phone: body?.phone,
      });
      setCookie(event, 'authCustomer', authCustomer, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: true,
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
