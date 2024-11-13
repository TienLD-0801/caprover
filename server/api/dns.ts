import ApiHelper from '../helper/apiHelper';
import {
  storeDeleteItem,
  storeGetItem,
  storeGetKeys,
  storeSetItem,
} from '../storage';

interface Request {
  query: {
    id: string;
  };
}

export default defineEventHandler<Request>((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const query = getQuery(event);
      const dns = await storeGetItem('business', 'dns');
      const tenant_id = await storeGetItem('business', 'tenant_id');
      const isCheckId = tenant_id == query.id;

      if (dns && isCheckId) {
        resolve(dns);
        return;
      }

      const url = 'https://dns.fast-boy.net/site/get-info';
      const params = {
        id: query.id,
        type: 'new',
      };
      const res: any = await ApiHelper.getApiBase(url, params);
      await storeSetItem('business', 'dns', res, 1800);
      await storeSetItem('business', 'tenant_id', query.id, 1800);
      await storeDeleteItem('business', 'businessInfo');
      resolve(res);
    } catch (error) {
      reject(null);
    }
  });
});
