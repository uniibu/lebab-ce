import path from 'path'
export default {
  mode: 'spa',
  head: {
    title: 'Lebab Modernizing Javascript Code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Lebab Modernizing Javascript Code' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://unpkg.com/babel-standalone@6/babel.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/babili-standalone/0.0.8/babili.min.js' }
    ]
  },

  css: ['codemirror/lib/codemirror.css', '~/assets/scss/style.scss'],

  modules: [
    ['bootstrap-vue/nuxt', { css: false }], '~/modules/lebabVer', '~/modules/lebabModule'
  ],

  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }],
  /*
   ** Customize the progress bar color
   */
  loading: false,
  loadingIndicator: {
    name: 'cube-grid',
    color: '#323330',
    background: 'white'
  },
  render: {
    bundleRenderer: {
      shouldPreload: file => {
        return ['js'].includes(file)
      }
    }
  },
  dev: process.env.NODE_ENV === 'development',
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    analyze: true,
    generate: {
      workers: 4,
      workerConcurrency: 500,
      concurrency: 500,
      done ({ duration, errors, workerInfo }) {
        if (errors.length) {
          console.log('done')
        }
      }
    },
    filenames: {
      chunk: '[name].[chunkhash].js'
    },
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
    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isClient) {
        config.performance.maxEntrypointSize = 1510000
        config.performance.maxAssetSize = 500000
        config.module.rules.push({
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
                '/assets': path.resolve(__dirname, 'assets'),
                '/static': path.resolve(__dirname, 'static')
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
        })
      }
    }
  }
}
