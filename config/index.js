const { resolve } = require('path');
const resolvePath = file => resolve(__dirname, '..', file);
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/lebab-ce/favicon.ico' }],
    script: [
      { src: 'https://unpkg.com/babel-standalone/babel.min.js' }
    ]
  },
  css: ['codemirror/lib/codemirror.css', '~/assets/scss/style.scss'],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }], '~/modules/lebabVer', '~/modules/lebabModule', '~/modules/markdownModule', '@nuxtjs/axios'
  ],
  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }],
  build: {
    optimization: {
      concatenateModules: true,
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          vendor: {
            test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|babel-runtime|es6-promise|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|codemirror|nuxt\.js)[\\/]/,
            priority: 10,
            chunks: 'all'
          },
          commons: {
            test: /node_modules[\\/](lodash|esprima|acorn|lebab)[\\/]/,
            priority: 10,
            chunks: 'all'
          }
        }
      }
    },
    extraRules: {
      test: /\.inline$/,
      use: [{
        loader: 'vue-style-loader',
        options: {
          sourceMap: false
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          minimize: true,
          importLoaders: 1,
          alias: {
            '/assets': resolve('assets'),
            '/static': resolve('static')
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false,
          useConfigFile: false
        }
      }
      ]
    }
  }
};
