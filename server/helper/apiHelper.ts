import { storeGetItem } from '../storage';
import { typeAuthBusiness, typeAuthCustomer } from '../types/typeCookies';
import { Options } from '../types/typeRequest';

const TOKEN = 'MfBKhBYJLFEktmkH';
const config = useRuntimeConfig();

export default class ApiHelper {
  static async getDomain(): Promise<any> {
    try {
      const dns = await storeGetItem('business', 'dns');
      // const tenant_id = await storeGetItem('business', 'tenant_id');
      // if (!dns) {
      //   const params = {
      //     id: 'test4',
      //     type: 'new',
      //   };
      //   const res: any = await $fetch('https://dns.fast-boy.net/site/get-info', { params: params });
      //   if(!res.result.data) return;
      //   return res.result.data;
      // } else {
      return dns;
      //}
    } catch (error) {
      console.error(error);
    }
  }

  static async getApiBase(url: string, option: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res: any = await $fetch(url, {
          method: 'get',
          params: option,
        });
        if (
          res?.status == 'OK' &&
          res?.result?.status == 'OK' &&
          res?.result?.data
        ) {
          resolve(res?.result?.data);
        }
        reject(null);
      } catch (error) {
        reject(null);
      }
    });
  }

  static async getApi(url: string, params?: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { domain, client_id } = await this.getDomain();
        const res: any = await $fetch(domain + url, {
          method: 'get',
          params: params,
          headers: {
            token: TOKEN,
            'g-clientid': client_id,
          },
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  // @Get Access Api Key
  static async get(url: string, params: any, event?: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const authCustomer: typeAuthCustomer = JSON.parse(
          getCookie(event, 'authCustomer') || ''
        );
        const header = {
          Accept: 'application/json',
          'X-Access-Token': authCustomer?.apiKeyPhone || '',
          'X-Phone-Number': authCustomer?.phone || '',
        };
        const res: any = await $fetch(`${config.BE_URL}${url}`, {
          method: 'POST',
          params: params,
          headers: header,
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  //@Post Access ApiKey
  static async post(url: string, option?: Options, event?: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const authCustomer: typeAuthCustomer = JSON.parse(
          getCookie(event, 'authCustomer') || ''
        );

        const header = {
          Accept: 'application/json',
          contentType: 'application/json',
          'X-Access-Token': authCustomer?.apiKeyPhone || '',
          'X-Phone-Number': authCustomer?.phone || '',
        };

        const res: any = await $fetch(`${config.BE_URL}${url}`, {
          method: 'POST',
          headers: Object.assign(header, option?.header),
          body: option?.body || '',
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  // @Post Login
  static async postLogin(url: string, option?: Options, event?: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const header = {
          Accept: 'application/json',
          'X-Access-Token': option?.apiKey,
        };
        console.log('>>>>>>>>>>>>>', header);

        const res: any = await $fetch(`${config.BE_URL}${url}`, {
          method: 'POST',
          headers: header,
          body: option?.body,
        });
        console.log('>>>>>>>>>>>', `${config.BE_URL}${url}`);
        console.log('>>>>>>>>>>>', res);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // For Call APi Business
  // Get conversation
  static async getForBusiness(url: string, params?: any, event?: any) {
    console.log('>> cokie event');
    //const abc = parseCookies(event).authBusiness;
    try {
      // const authBusiness = JSON.parse(abc);
      // console.log("type of", typeof authBusiness);

      // console.log(">>>", authBusiness['apiKeyBusiness']);

      // const header = {
      //   'X-Business-Id': authBusiness?.businessId || '',
      //   'X-Access-Token': authBusiness?.apiKeyBusiness || '',
      // };
      //console.log(">>>>>", header);

      const res: any = await $fetch(`${config.BE_URL}${url}`, {
        method: 'GET',
        //headers: header,
        params: params,
      });
      console.log('>>>>', `${config.BE_URL}${url}`);

      return { age: 1234 };
    } catch (error) {
      console.log('>>>>catch', error);
    }
  }
  static async postForBusiness(url: string, option?: Options, event?: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const authBusiness: typeAuthBusiness = JSON.parse(
          getCookie(event, 'authBusiness') || ''
        );

        const header = {
          Accept: 'application/json',
          contentType: 'application/json',
          'X-Business-Id': authBusiness?.businessId || '',
          'X-Access-Token': authBusiness?.apiKeyBusiness || '',
        };

        const res: any = await $fetch(`${config.BE_URL}${url}`, {
          method: 'POST',
          headers: Object.assign(header, option?.header),
          body: option?.body || '',
          params: option?.params || '',
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
