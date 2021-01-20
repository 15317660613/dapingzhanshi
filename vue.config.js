// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

// eslint-disable-next-line no-unused-vars
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     // eslint-disable-next-line
    //     jQuery: "jquery",
    //     'windows.jQuery': 'jquery'
    //   })
    // ]
  },

  runtimeCompiler: true,

  // 设置打包文件相对路径
  // publicPath: '/devWeb',
  publicPath: '/devBi',

  // 放置静态资源的地方 (js/css/img/font/...)
  // assetsDir: '',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  // 取消EsLint代码检测
  lintOnSave: false,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
    /* string or regex */
  ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  chainWebpack: config => {
    /** 全局less文件注册**/
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

    config.entry.app = ['babel-polyfill', './src/main.js']
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },

  // CSS 相关选项
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},

  devServer: {
    open: true,
    https: false,
    hotOnly: false,
    port: 9091,
    useLocalIp: true,
    // host: 'localhost',
    host: '0.0.0.0',
    proxy: {
      // 配置跨域
      '/api': {
        // target: "http://192.168.13.233:50001",
        // target: "http://192.168.144.163:8080",
        // target: "http://192.168.144.196:8080",
        // target: 'http://192.168.110.20:8080',
        target: 'http://192.168.144.246:8080',
        // target: 'http://10.10.10.45:8080',
        ws: false, // 关闭不断出现的socketjs-node
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api-server'
        },
        cookiePathRewrite: {
          '/api-server': '/'
        }

      }
    }
  },

  // 第三方插件的选项
  pluginOptions: {}
}
/**
 * 时间:2019/10/15
 * 作者:yuanbotao
 * 功能:全局less文件注册
 */
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/theme/whiteSkin/less/common.less'),
        path.resolve(__dirname, 'src/assets/theme/redSkin/less/common.less')
      ]
    })
}
