const conf = require('./config');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  mode: conf.mode,
  head: conf.head,
  css: conf.css,
  modules: conf.modules,
  markdownit: {
    injected: true
  },
  plugins: conf.plugins,
  env: conf.env,
  loadingIndicator: {
    name: 'cube-grid',
    color: '#323330',
    background: 'white'
  },
  render: {
    bundleRenderer: {
      shouldPreload: file => {
        return [ 'js' ].includes(file);
      }
    }
  },
  dev: conf.isDev,
  generate: {
    dir: 'docs'
  },
  build: {
    extractCSS: true,
    optimization: conf.build.optimization,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (isClient) {
        config.performance.maxEntrypointSize = 1510000;
        config.performance.maxAssetSize = 500000;
        config.module.rules.push(conf.build.extraRules);
      }
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: [ 
              'html', 'body', 'nuxt-progress' 
            ],
            whitelistPatterns: [ 
              /page-enter/, /page-leave/, '/cm/', '/Codemirror/' 
            ]
          })
        );
      }
      config.output.publicPath = conf.isDev ? '/_nuxt/' : '/lebab-ce/_nuxt/';
    }
  },
  router: {
    base: conf.isDev ? '/' : '/lebab-ce/'
  }
};
