'use strict';

const Controller = require('egg').Controller;


class Book extends Controller {
  async search() {
    const { ctx } = this;
    const result = await ctx.service.book.search(ctx.query.q);
    this.ctx.body = result;
  }
  async detail() {
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.detail(ctx.query.id, user_id);
    this.ctx.body = result;
  }
  async borrow() { // 登陆接口
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.borrow(ctx.query.book_id, user_id);
    ctx.body = result;
  }
}

module.exports = Book;
