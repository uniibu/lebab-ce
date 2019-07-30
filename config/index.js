const babelUrl = 'https://unpkg.com/babel-standalone@6.26.0/babel.min.js';
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
  modules: [ [ 'bootstrap-vue/nuxt', { css: false } ], '~/modules/markdownModule' ],
  plugins: [ { src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }, { src: '~plugins/fetch.js', ssr: false } ]
};
