'use strict';

const Controller = require('egg').Controller;


class User extends Controller {
  async login() {
    // const { ctx } = this;

    this.ctx.body = 'u need login';
  }
  async register() {
    const { ctx } = this;
    const result = await ctx.service.searchBooks.find(ctx.query.q);
    console.log(result);
    this.ctx.body = result;
  }
  async wechatLogin() {

  }
}

module.exports = User;
