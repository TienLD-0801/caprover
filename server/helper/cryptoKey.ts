import CryptoJS from 'crypto-js';

const hashApiKey = (value: string, type: 'keyPhone' | 'keyBusiness') => {
  const hmac = CryptoJS.HmacSHA256(value, type === 'keyPhone' ? useRuntimeConfig().keyPhone : useRuntimeConfig().keyBusiness);
  return CryptoJS.enc.Base64.stringify(hmac);
};

export { hashApiKey };
