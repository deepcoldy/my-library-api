'use strict';

const Controller = require('egg').Controller;


class User extends Controller {
  async login() {
    const { ctx } = this;
    const result = await ctx.service.user.login(ctx.request.body);
    this.ctx.body = result;
  }
  async register() {
    const { ctx } = this;
    const result = await ctx.service.user.register(ctx.request.body);
    this.ctx.body = result;
  }
  async profile() {
    const { ctx } = this;
    console.log(ctx.session);
    if (ctx.session.user && ctx.session.user.id) {
      const result = await ctx.service.user.profile(ctx.session.user.id);
      this.ctx.body = result;
    } else if (ctx.session.passport && ctx.session.passport.user && ctx.session.passport.user.id) {
      const result = await ctx.service.user.selectUserByOpenid(ctx.session.passport.user.id);
      this.ctx.body = result;
    } else {
      this.ctx.status = 500;
    }
  }
  async weixin() {
    const { ctx } = this;
    this.ctx.body = '1';
  }
}

module.exports = User;
