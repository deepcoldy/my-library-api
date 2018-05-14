'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

class user extends Service {
  async bindWeixin(account, open_id) {
    if (open_id) {
      await this.app.mysql.update('User', {
        open_id,
      }, {
        where: { account },
      }); // 绑定微信openid
    }
    return await this.app.mysql.get('User', {
      account,
    });
  }
  async login({
    account,
    password,
    open_id = '',
  }) {
    const result = await this.app.mysql.get('User', {
      account,
    });
    if (result && result.password === md5(password)) {
      this.ctx.session.user = await this.bindWeixin(account, open_id);
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
  async profile({ user: { id }, passport }) {
    let result = await this.app.mysql.get('User', {
      id,
    });
    if (!result.open_id && passport && passport.user && passport.user.id) { // profile页面直接点击 绑定微信
      result = await this.bindWeixin(result.account, passport.user.id);
    }
    console.log(result);
    if (result) {
      this.ctx.session.user = result;
      return result;
    }
  }
  async selectUserByOpenid(open_id) { // 通过openid查询用户
    const result = await this.app.mysql.get('User', {
      open_id,
    });
    if (result) {
      this.ctx.session.user = result; // 如果有账号密码，则存入session
      return result;
    }
    return {
      status: 'unbind', // 未绑定账号密码
      open_id,
    };
  }
  async unbind({ user, passport }) { // 解绑
    const result = await await this.app.mysql.update('User', {
      open_id: '',
    }, {
      where: { account: user.account },
    });
    this.ctx.session.user.session = '';
    this.ctx.session.passport = undefined;
    return result;
  }
}

module.exports = user;
