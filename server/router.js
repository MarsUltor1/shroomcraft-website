const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/map', controllers.Shroomcraft.mapPage)

  app.get('/', mid.requiresSecure, controllers.Shroomcraft.homePage);
  app.get('/*', controllers.get404);
};

module.exports = router;
