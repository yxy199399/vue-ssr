const ServerPlugin = require('vue-server-renderer/server-plugin'),//生成服务端清单
   ClientPlugin = require('vue-server-renderer/client-plugin'),//生成客户端清单
   nodeExternals = require('webpack-node-externals'),//忽略node_modules文件夹中的所有模块
   merge = require("lodash.merge"),
   TARGET_NODE = process.env.WEBPACK_TARGET === 'node',
   target = TARGET_NODE ? 'server' : 'client';//根据环境变量来指向入口
   console.log(target)
 
module.exports = {
  css: {
    extract: false//关闭提取css,不关闭 node渲染会报错
  },
  outputDir: "./dist/" + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    output: {
      // filename: 'js/[name].js',
      // chunkFilename: 'js/[name].js',
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    devtool: "source-map",
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    externals: TARGET_NODE ? nodeExternals({
      //设置白名单
      allowlist: /\.css$/
    }) : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [//根据环境来生成不同的清单。
      TARGET_NODE ? new ServerPlugin() : new ClientPlugin()
    ]
  }),
  chainWebpack: config => {
    // config.resolve
    //   .alias
    //     .set('vue$', 'vue/dist/vue.esm.js')
    config.module
      .rule('vue')
        .use('vue-loader')
          .tap(options => {
            merge(options, {
              optimizeSSR: false
            })
            // options.optimizeSSR = false;
            // return options;
          });
    // config.module
    //   .rule('images')
    //     .use('url-loader')
    //       .tap(options => {
    //         options = {
    //           limit: 1024,
    //           fallback:'file-loader?name=img/[path][name].[ext]'
    //         }
    //         return options;
    //       });
  }
}