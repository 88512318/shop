'use strict';
 
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.get('/logout', controller.user.logout);
  router.post('/whoami', controller.user.whoami);
	
	
	router.get('/wxbase', controller.wxlogin.wxbase);
};
