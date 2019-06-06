import conf from './config';
import fetch from 'node-fetch';
import consola from 'consola';
import fs from 'fs';

const getLebab = async () => {
  consola.info('Fetching latest Lebab version');
  const { message: msg } = await fetch('https://umdfied.herokuapp.com/umdfied/lebab/latest').then(r => r.json());
  if (!msg || !msg.url || !msg.semver) {
    throw new Error('Could not fetch lebab');
  }
  consola.info(`Using lebab@${msg.semver}`);
  return msg;
};

const nuxtConfig = {
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
    babel: {
      presets({ isServer }) {
        return [ [ '@nuxt/babel-preset-app',
          {
            buildTarget: isServer ? 'server' : 'client',
            debug: false,
            targets: {
              chrome: '45',
              opera: '32',
              edge: '12',
              firefox: '34',
              safari: '9',
              ios: '9',
              android: '5'
            }
          } ] ];
      }
    },
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
  hooks: {
    generate: {
      page(ctx) {
        const r = /(\.css" rel="preload" as=")(script)/gm;
        ctx.html = ctx.html.replace(r, '$1style');
        return ctx;
      },
      done() {
        fs.writeFileSync('docs/CNAME', 'lebab.unibtc.me');
      }
    }
  }
};

export default async function nuxt() {
  const { url, semver } = await getLebab();
  nuxtConfig.env = Object.assign(nuxtConfig.env || {}, { lebab: semver });
  nuxtConfig.head.link.push({ href: url, rel: 'preload', as: 'script' });
  nuxtConfig.head.script.push({ src: url, type: 'text/javascript', body: true });
  return nuxtConfig;
}

