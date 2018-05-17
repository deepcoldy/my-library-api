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

  router.get('/api/search', controller.book.search); // 根据作者或书名查询
  router.get('/api/search/detail', controller.book.detail); // 书籍详情
  router.get('/api/book/borrow', controller.book.borrow); // 书籍详情
  router.get('/api/book/borrowed', controller.book.borrowed); // 借书历史
  router.get('/api/book/renew', controller.book.renew); // 续借
  router.get('/api/book/return', controller.book.return); // 还书
  router.get('/api/book/latest', controller.book.latest); // 新书

  app.get('/api/auth/weixin', app.passport.authenticate('loginByWeixinClient')); // 微信登录
  app.get('/api/auth/weixin/callback', app.passport.authenticate('loginByWeixinClient', { successRedirect: '/#/profile', failureRedirect: '/#/' }) // 微信登录回调
  );

  // 管理后台api
  router.get('/api/books', controller.books.index); // 查询全部书籍
  router.post('/api/books/add', controller.books.add); // 增加书籍
  router.get('/api/books/delete', controller.books.delete); // 删除书籍
  router.post('/api/books/edit', controller.books.edit); // 编辑书籍
};
