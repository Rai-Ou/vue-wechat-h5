module.exports = {
  outputDir: "gas-station",
  publicPath: "/gas-station/",
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 8080,
    proxy: {
      // "/api/ipcshopping": {
      //   target: `http://192.168.5.158:14558/`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "/"
      //     // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
      //     // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
      //   }
      // }
      "/api/*": {
        target: `https://dev.xzwechat.hebeiwanteng.com`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
          // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      }
    }
  }
};
