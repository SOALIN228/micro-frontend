const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const packageName = 'vue3'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 9005

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  publicPath: 'http://localhost:9005',
  devServer: {
    hot: false,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}`,
      libraryTarget: 'umd',
    },
  },
})
