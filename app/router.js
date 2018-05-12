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
  router.get('/api/search', controller.search.index); // 根据作者或书名查询
  router.get('/api/search/detail', controller.search.detail); // 书籍详情

  router.get('/api/auth/profile', controller.user.weixin); // 微信登陆成功回调
  app.get('/api/auth/weixin', app.passport.authenticate('loginByWeixinClient')); // 微信登录
  app.get('/api/auth/weixin/callback', app.passport.authenticate('loginByWeixinClient', { failureRedirect: '/api/profile' }, (res, user) => {
    console.log(res, user);
    res.redirect('/api/auth/profile', user);
  }) // 微信登录回调
  );
};
