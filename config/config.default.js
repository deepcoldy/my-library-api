'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '111.231.79.136',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'KeYpZrZx',
        // 数据库名
        database: 'chuchukiko',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    // cors: {
    //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    //   withCredentials: true,
    // },
    passportWeiXin: {
      clientID: 'wx75bd6c02e0a73d49',
      secret: '4075e8037a4334847fb2c5b7c113cf6d',
      callbackURL: '/api/auth/weixin/callback',
      scope: 'snsapi_userinfo',
    },
    security: {
      csrf: false,
      domainWhiteList: [
        'http://localhost',
        'http://library.iscode.cn',
        'http://mp.weixin.qq.com',
        'http://127.0.0.1:7001',
        'http://127.0.0.1:8080',
      ],
    },
    session: {
      renew: true,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525875286535_2061';

  // add your config here
  config.middleware = [];

  return config;
};
