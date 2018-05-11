'use strict';

const passport = require('passport');
const WeixinStrategy = require('passport-weixin');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login); // 登录
  router.post('/register', controller.user.register); // 注册
  router.get('/profile', controller.user.profile); // 个人信息
  router.get('/search', controller.search.index); // 根据作者或书名查询
  router.get('/search/detail', controller.search.detail); // 书籍详情

  app.get('/auth/weixin', app.passport.authenticate('loginByWeixinClient')); // 微信登录
  app.get('/auth/weixin/callback', app.passport.authenticate('loginByWeixinClient', { successRedirect: 'http://library.iscode.cn/#/profile', failureRedirect: 'http://library.iscode.cn/#/login' }) // 微信登录回调
  );
};
