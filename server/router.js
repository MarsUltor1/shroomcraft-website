const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getTweets', controllers.Tweet.getTweets);
  app.get('/getAllTweets', controllers.Tweet.getAllTweets);

  app.get('/login', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, controllers.Account.signup);

  app.get('/logout', controllers.Account.logout);

  app.post('/changePassword', mid.requiresSecure, controllers.Account.changePassword);

  app.get('/account', controllers.Account.accountPage);
  app.get('/accountInfo', controllers.Account.getInfo);

  app.post('/getPremium', controllers.Account.makePremium);
  app.post('/cancelPremium', controllers.Account.cancelPremium);

  app.get('/tweet', controllers.Tweet.writingPage);
  app.post('/tweet', controllers.Tweet.writeTweet);

  app.post('/togglePrivacy', controllers.Tweet.togglePrivacy);
  app.post('/deleteTweet', controllers.Tweet.deleteTweet);

  app.get('/', mid.requiresSecure, controllers.Account.loginPage);
  app.get('/*', controllers.get404);
};

module.exports = router;
