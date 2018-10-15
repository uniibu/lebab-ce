import path from 'path';
export default function nuxtMarkdownit(options) {
  const _options = Object.assign({}, options, this.options.markdownit);
  const markDownItLoader = {
    loader: '@nuxtjs/markdownit-loader',
    options: _options
  };
  this.extendBuild(config => {
    // Vue template support
    const vueLoader = config.module.rules.find(rule => rule.test.toString() === '/\\.vue$/');
    // Checks for query loaders first (<= rc5)
    if (vueLoader.query && vueLoader.query.loaders) {
      vueLoader.query.loaders['md'] = markDownItLoader;
    } else {
      // Sets options loaders (>= rc6)
      if (!vueLoader.options.loaders) {
        vueLoader.options.loaders = {};
      }
      vueLoader.options.loaders['md'] = markDownItLoader;
    }
    // .md Loader
    config.module.rules.push({
      test: /\.md$/,
      use: [ 'raw-loader', markDownItLoader ]
    });
  });
  if (_options.injected === true) {
    delete _options.injected;
    // Register plugin
    this.addPlugin({
      src: path.resolve(__dirname, 'markdownPlugin.template.js'),
      fileName: 'markdown-it.js',
      options: _options
    });
  }
};