'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

class user extends Service {
  async login({
    account,
    password,
    open_id,
  }) {
    let result = await this.app.mysql.get('User', {
      account,
    });
    if (result && result.password === md5(password)) {
      console.log(result);
      if (open_id) {
        await this.app.mysql.update('User', {
          open_id,
        }, {
          where: { account },
        }); // 绑定微信openid
        result = await this.app.mysql.get('User', {
          account,
        });
      }
      this.ctx.session.user = result;
      console.log(this.ctx.session);
      return {
        login: 'success',
      };
    }
    this.ctx.status = 500;
    return {
      login: 'failed',
    };
  }
  async register({
    name,
    account,
    password,
    number: student_number,
  }) {
    const result = await this.app.mysql.insert('User', {
      name,
      account,
      password: md5(password),
      student_number,
    });
    return result;
  }
  async profile(id) {
    const result = await this.app.mysql.get('User', {
      id,
    });
    if (result) {
      this.ctx.session.user = result;
      return result;
    }
  }
  async selectUserByOpenid(open_id) {
    const result = await this.app.mysql.get('User', {
      open_id,
    });
    if (result) {
      this.ctx.session.user = result;
      return result;
    }
    // const newWechatUser = await this.app.mysql.insert('User', {
    //   open_id,
    // });
    return {
      status: 'unbind',
      open_id,
    };
  }
}

module.exports = user;
