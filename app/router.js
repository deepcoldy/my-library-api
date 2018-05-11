'use strict';

const passport = require('passport');
const WeixinStrategy = require('passport-weixin');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.user.login);
  router.get('/register', controller.user.register);
  router.get('/search', controller.search.index);
  router.get('/search/detail', controller.search.detail);

  app.get('/auth/weixin', app.passport.authenticate('loginByWeixinClient'));
  app.get('/auth/weixin/callback', app.passport.authenticate('loginByWeixinClient', { successRedirect: '/search', failureRedirect: '/login' })
  );
};
