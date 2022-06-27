const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '',
    createProxyMiddleware(
      '/v1',
      {
        target: 'https://api.coinpaprika.com/'
      },
    ),
  );
};