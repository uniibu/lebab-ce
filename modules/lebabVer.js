const path = require('path')
const lebab = require.resolve('lebab')
const lebabpkg = require(path.join(path.dirname(lebab), 'package.json'))

module.exports = function lebabVer () { this.options.env = { lebab: lebabpkg.version } }
