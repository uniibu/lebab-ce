const babelUrl = 'https://cdn.rawgit.com/umdfied/90094bc737a35d6256c0795a64ebced1/raw/27b402aa52aa8ab5eb5b5e3008d5109aa75f27bc/babel-standalone.min.js';
module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  mode: 'spa',
  head: {
    title: 'Lebab Modernizing Javascript Code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Lebab Modernizing Javascript Code' }
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/lebab-ce/favicon.ico' }, { href: babelUrl, rel: 'preload', as: 'script' } ],
    script: [ { src: babelUrl, body: true } ]
  },
  css: [ '~/assets/scss/style.scss' ],
  modules: [
    [ 'bootstrap-vue/nuxt', { css: false } ], '~/modules/markdownModule', '@nuxtjs/axios'
  ],
  plugins: [ { src: '~plugins/nuxt-codemirror-plugin.js', ssr: false } ]
};
