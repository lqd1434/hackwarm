module.exports = {
  devServer: {
    port: 8080,
    host:'0.0.0.0',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://116.62.185.115:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
