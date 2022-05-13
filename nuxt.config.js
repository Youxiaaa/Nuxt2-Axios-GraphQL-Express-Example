export default {
  head: {
    title: 'graphql-nuxt',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/main.css'
  ],

  serverMiddleware: [
    '~/server/index.js'
  ],

  plugins: [
    '~/plugins/api'
  ],

  components: true,

  buildModules: [
    '@nuxt/postcss8'
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: '/',
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
  }
}
