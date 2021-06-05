import i18n from './config/i18n'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'connect',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/app.scss', 'swiper/css/swiper.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/swiper.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg-sprite',
    '@nuxtjs/eslint-module',
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'en',
        strategy: 'no_prefix',
        locales: [
          {
            code: 'en',
            name: 'English',
          },
          {
            code: 'de',
            name: 'Deutsch',
          },
          {
            code: 'ru',
            name: 'Russian',
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyAMVQ_Y3dNO4zb0-ddTFRYPWxfILMhD9iA',
      authDomain: 'connect-651e9.firebaseapp.com',
      projectId: 'connect-651e9',
      storageBucket: 'connect-651e9.appspot.com',
      messagingSenderId: '192049796776',
      appId: '1:192049796776:web:06c9bdf7cebd87e029149d',
    },
    services: {
      storage: true,
      firestore: true,
    },
  },

  svgSprite: {
    input: '~/assets/svg/',
    output: '~/assets/sprite/gen',
  },

  styleResources: {
    scss: ['~/assets/scss/app.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
}
