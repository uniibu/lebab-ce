const path = require('path')

module.exports = function nuxtLebab (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, 'lebabPlugin.template.js'),
    fileName: 'lebab.js',
    options: moduleOptions
  })
}
