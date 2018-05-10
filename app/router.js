'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/search', controller.search.index);
  router.get('/search/detail', controller.search.detail);
};
