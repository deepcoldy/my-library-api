'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/login', controller.user.login); // 登录
  router.post('/api/register', controller.user.register); // 注册
  router.get('/api/profile', controller.user.profile); // 个人信息
  router.get('/api/unbind', controller.user.unbind); // 解绑微信
  router.get('/api/search', controller.search.index); // 根据作者或书名查询
  router.get('/api/search/detail', controller.search.detail); // 书籍详情

  app.get('/api/auth/weixin', app.passport.authenticate('loginByWeixinClient')); // 微信登录
  app.get('/api/auth/weixin/callback', app.passport.authenticate('loginByWeixinClient', { successRedirect: '/#/profile', failureRedirect: '/#/' }) // 微信登录回调
  );
};
