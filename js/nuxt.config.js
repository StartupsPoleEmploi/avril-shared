export default {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  build: {
    cssSourceMap: false,
    postcss: {
      preset: {
        features: {
          customProperties: false,
        }
      }
    },
    loaders: {
      scss: { sourceMap: false },
    },
    extend (config, ctx) {}
  },
  buildDir: process.env.NUXT_BUILD_DIR,
  env: {
    bookletPath: process.env.NUXT_BOOKLET_PATH,
    profilePath: process.env.NUXT_PROFILE_PATH,
    clientToPhoenixUrl: process.env.CLIENT_TO_PHOENIX_URL,
    serverToPhoenixUrl: process.env.SERVER_TO_PHOENIX_URL,
    crispWebsiteId: process.env.NUXT_CRISP_WEBSITE_ID,
    serverAuthKey: process.env.SECRET_KEY_BASE,
    hotjarId: process.env.HOTJAR_ID,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicons/apple-icon-57x57.png'},
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicons/apple-icon-60x60.png'},
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicons/apple-icon-72x72.png'},
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicons/apple-icon-76x76.png'},
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicons/apple-icon-114x114.png'},
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicons/apple-icon-120x120.png'},
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicons/apple-icon-144x144.png'},
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicons/apple-icon-152x152.png'},
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-icon-180x180.png'},
      { rel: 'icon', type: 'image/png', sizes: '192x192',  href: '/images/favicons/android-icon-192x192.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicons/favicon-96x96.png'},
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png'},
    ],
    script: [
      process.env.TAG_COMMANDER ? {
        src: `https://cdn.tagcommander.com${process.env.TAG_COMMANDER}.js`,
        body: true,
        async: true
      } : null,
    ].filter(v => v)
  },
  mode: 'universal',
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/markdownit',
    '@nuxtjs/sentry',
    'cookie-universal-nuxt',
  ],
  plugins: [
    '~/node_modules/avril/js/plugins/filters.js',
    { src: '~/node_modules/avril/js/plugins/datepicker', mode: 'client' },
  ],
  sentry: {
    config: {
      environment: process.env.NODE_ENV,
      release: process.env.HEROKU_SLUG_COMMIT,
    },
  },
  router: {
    prefetchLinks: false,
    linkActiveClass: 'is-active-parent',
    linkExactActiveClass: 'is-active',
  },
}