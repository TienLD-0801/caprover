export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  console.log('config.feURL', config.feURL);
  console.log('config.beURL', config.beURL);
  console.log('config.keyBusiness', config.keyBusiness);
  console.log('config.keyPhone', config.keyPhone);

  const approvedOrigin = [
    config.feURL,
    'https://example.com',
    'https://another-domain.com',
  ];
  const origin = event.node.req.headers.origin || '';

  const originDomain = approvedOrigin.includes(origin) ? origin : '';

  const headers = {
    'Access-Control-Allow-Origin': originDomain || '',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
  setResponseHeaders(event, headers);
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content.';
    return 'OK';
  }
});
