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
    if (ctx.session.user && ctx.session.user.id) {
      const result = await ctx.service.user.profile(ctx.session.user.id);
      this.ctx.body = result;
    } else {
      this.ctx.status = 500;
    }
  }
}

module.exports = User;
