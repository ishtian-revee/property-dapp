const routes = require('next-routes')();

routes
  .add('/properties/add', '/properties/add')
  .add('/properties/owned', '/properties/owned')
  .add('/properties/history', '/properties/history')
  .add('/tokens/purchase', '/tokens/purchase')

module.exports = routes;
