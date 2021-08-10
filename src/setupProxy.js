/** 多代理配置文件 */

const  {createProxyMiddleware}  = require('http-proxy-middleware');

module.exports = function (app) {
  // 代理地址1
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
      "^/api": "/"
      },
    }),
  )

  // 代理地址
  app.use(
    '/apc',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
      "^/apc": "/"
      },
    }), 
  )
}
  