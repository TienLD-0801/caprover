import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin((def) => {
  const storage = useStorage();
  const config = useRuntimeConfig();

  const driver = redisDriver({
    base: 'redis',
    host: config.redis.host,
    port: Number(config.redis.port),
    username: config.redis.username,
    password: config.redis.password,
  });

  // Mount driver
  storage.mount('redis', driver);
});
