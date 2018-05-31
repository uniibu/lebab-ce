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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }],
  css: [
    '~/css/main.css',
    'codemirror/lib/codemirror.css',
    'codemirror/addon/merge/merge.css',
    '~/css/dracula-theme.css'
  ],
  modules: ['bootstrap-vue/nuxt']
};
