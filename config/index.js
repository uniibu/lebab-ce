const babelUrl = 'https://cdn.staticaly.com/gist/umdfied/60b10ac1ece9bf6fa16c672d8be22440/raw/b834a928249b77ee38ecfdcb85b96381055f2d11/babel-standalone.min.js';
export default {
  isDev: process.env.NODE_ENV === 'development',
  mode: 'spa',
  head: {
    title: 'Lebab Modernizing Javascript Code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Lebab Modernizing Javascript Code' }
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { href: babelUrl, rel: 'preload', as: 'script' } ],
    script: [ { src: babelUrl, body: true } ]
  },
  css: [ '~/assets/scss/style.scss' ],
  modules: [
    [ 'bootstrap-vue/nuxt', { css: false } ], '~/modules/markdownModule', '@nuxtjs/axios'
  ],
  plugins: [ { src: '~plugins/nuxt-codemirror-plugin.js', ssr: false } ]
};
