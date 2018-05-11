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
    cors: {
      origin: '*',
    },
    passportWeiXin: {
      clientID: 'wx75bd6c02e0a73d49',
      secret: '4075e8037a4334847fb2c5b7c113cf6d',
      callbackURL: '/auth/weixin/callback',
      scope: 'snsapi_userinfo',
    },
    security: {
      csrf: false,
      domainWhiteList: [
        'http://localhost:8080',
        'http://library.iscode.cn',
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
