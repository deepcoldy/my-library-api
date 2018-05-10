'use strict';

const Controller = require('egg').Controller;

class Search extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.searchBooks.find(ctx.query.q);
    console.log(result);
    this.ctx.body = result;
  }
  async detail() {
    const { ctx } = this;
    const result = await ctx.service.searchBooks.findDetail(ctx.query.id);
    console.log(result);
    this.ctx.body = result;
  }
}

module.exports = Search;
