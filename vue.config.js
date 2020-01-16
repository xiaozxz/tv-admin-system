const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.alias.set('assets', resolve('src/assets'))
    config.resolve.alias.set('appStore', resolve('src/appStore'))
    config.resolve.alias.set('api', resolve('src/api'))
    config.resolve.alias.set('util', resolve('src/util'))
  },
  publicPath: './'
}
