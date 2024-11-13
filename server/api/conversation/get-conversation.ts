import { hashApiKey } from '~/server/helper/cryptoKey';

interface IQuery {
  business_id: string;
}

interface IAuthBusiness {
  apiKeyBusiness: string;
  businessId: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  let getBusinessId = getCookie(event, 'businessId');
  let getApiKeyBusiness = getCookie(event, 'apiKeyBusiness');

  try {
    const query = getQuery<IQuery>(event);

    const authBusiness: IAuthBusiness = {
      apiKeyBusiness: hashApiKey(query.business_id, 'keyBusiness') || '',
      businessId: query.business_id || '',
    };

    for (const [key, value] of Object.entries(authBusiness)) {
      const valueCookie: string = value as string;
      setCookie(event, key, valueCookie, {
        httpOnly: true,
        sameSite: true,
      });
    }

    const header = {
      'X-Business-Id': getBusinessId || '',
      'X-Access-Token': getApiKeyBusiness || '',
    };

    const res = await $fetch(
      `${config.BE_URL}/v1/chat/conversation/get-conversations?business_id=test4&page=1`,
      {
        method: 'GET',
        headers: header,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
});
