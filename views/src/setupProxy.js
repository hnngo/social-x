const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/auth', '/image'], { target: 'http://localhost:5000/' }));
};
