'use strict';

const Controller = require('egg').Controller;


class User extends Controller {
  async login() { // 登陆接口
    const { ctx } = this;
    const result = await ctx.service.user.login(ctx.request.body);
    this.ctx.body = result;
  }
  async register() { // 注册接口
    const { ctx } = this;
    const result = await ctx.service.user.register(ctx.request.body);
    this.ctx.body = result;
  }
  async profile() { // 获取个人资料接口
    const { ctx } = this;
    console.log(ctx.session);
    if (ctx.session.user && ctx.session.user.id) { // 账号密码登录->获取用户信息
      const result = await ctx.service.user.profile(ctx.session);
      this.ctx.body = result;
    } else if (ctx.session.passport && ctx.session.passport.user && ctx.session.passport.user.id) { // 微信登录->获取用户信息
      const result = await ctx.service.user.selectUserByOpenid(ctx.session.passport.user.id);
      this.ctx.body = result;
    } else {
      this.ctx.status = 500;
    }

  }
  async unbind() {
    const { ctx } = this;
    console.log(ctx.session);
    const result = await ctx.service.user.unbind(ctx.session);
    this.ctx.body = result;
  }
}

module.exports = User;
