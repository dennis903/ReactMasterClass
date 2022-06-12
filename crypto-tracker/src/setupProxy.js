const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '',
    createProxyMiddleware({
      target: 'https://api.coinpaprika.com/v1/coins'
    }),
  );
};