'use strict';

const Controller = require('egg').Controller;

class Search extends Controller {
  async index() {
    const { ctx } = this;
    this.ctx.body = '1';
    console.log(ctx);
  }
}

module.exports = Search;
