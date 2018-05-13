'use strict';

const Controller = require('egg').Controller;


class Books extends Controller {
  async index() { // 登陆接口
    const { ctx } = this;
    const result = await ctx.service.manageBooks.all();
    this.ctx.body = result;
  }
  async add() { // 登陆接口
    const { ctx } = this;
    const result = await ctx.service.manageBooks.add(ctx.request.body);
    this.ctx.body = result;
  }

}

module.exports = Books;
