import ApiHelper from '~/server/helper/apiHelper';
import { storeDeleteItem, storeGetItem, storeGetKeys, storeSetItem } from '~/server/storage';
import { URL_BUSINESS_INFO } from '~/server/url';

export default defineEventHandler((event) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const businessInfo = await storeGetItem('business', 'businessInfo');
      if (businessInfo){
        resolve(businessInfo);
        return;
      }      
      const res = await ApiHelper.getApi(URL_BUSINESS_INFO); 
      await storeSetItem('business', 'businessInfo', res, 1800);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
});
