export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/components', '~/plugins/dayjs', '~/plugins/status'],
  modules: ['@pinia/nuxt'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['@/assets/styles/index.scss'],
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    keyPhone: process.env.NUXT_API_KEY_PHONE,
    keyBusiness: process.env.NUXT_API_KEY_BUSINESS,
    beURL: process.env.NUXT_BE_URL,
    feURL: process.env.NUXT_FE_URL,
    public: {
      feURL: process.env.NUXT_FE_URL,
    },
    redis: {
      host: process.env.NUXT_REDIS_HOST,
      port: process.env.NUXT_REDIS_PORT,
      username: process.env.NUXT_REDIS_USERNAME,
      password: process.env.NUXT_REDIS_PASSWORD,
    },
  },
  ssr: false,
  nitro: {
    // storage: {
    //   business: {
    //     driver: 'redis',
    //     password: process.env.NUXT_REDIS_PASSWORD,
    //   },
    // },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  routeRules: {
    '/api/**': {
      cors: true,
    },
  },
});
