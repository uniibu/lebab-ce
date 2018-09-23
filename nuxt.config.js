const conf = require('./config');
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
  dev: conf.isDev,
  generate: {
    dir: 'docs'
  },
  build: {
    extractCSS: true,
    parallel: true,
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
  }
};