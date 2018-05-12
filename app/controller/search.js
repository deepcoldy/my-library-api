'use strict';

const Controller = require('egg').Controller;

class Search extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.searchBooks.find(ctx.query.q);
    this.ctx.body = result;
  }
  async detail() {
    const { ctx } = this;
    const result = await ctx.service.searchBooks.findDetail(ctx.query.id);
    this.ctx.body = result;
  }
}

module.exports = Search;
