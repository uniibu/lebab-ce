module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'lebabnuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://unpkg.com/babel-standalone@6.25.0/babel.min.js' },
      { src: 'https://unpkg.com/babili-standalone@0.0.10/babili.min.js' },
      { src: 'https://cdn.rawgit.com/umdfied/a1781297dcfb57ca176551b44757d545/raw/9fda6d14d5a7eb980df21bcd8c632bdacedcd1a9/lebab.min.js' }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: '~/components/loading.vue',
  /*
   ** Build configuration
   */
  dev: true,
  build: {
    maxChunkSize: 244000,
    generate: {
      workers: 4,
      workerConcurrency: 500,
      concurrency: 500,
      done ({ duration, errors, workerInfo }) {
        if (errors.length) {
          console.log(done)
        }
      }
    },
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!isDev) {
        config.output.publicPath = './_nuxt/'
      }
    }
  },
  css: [
    '~/assets/scss/style.scss',
    'codemirror/lib/codemirror.css',
    'codemirror/addon/merge/merge.css',
    '~/assets/css/dracula-theme.css',
    '~/assets/css/main.css'
  ],
  modules: [
    'bootstrap-vue/nuxt', '~/modules/lebabVer'
  ],
  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }]
}
