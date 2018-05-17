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
  async borrow() { // 借书
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.borrow(ctx.query.book_id, user_id);
    ctx.body = result;
  }
  async borrowed() { // 借书历史
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.borrowed(user_id);
    this.ctx.body = result;
  }
  async renew() { // 续借
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.renew(ctx.query.id, user_id);
    if (!result) this.ctx.status = 500;
    this.ctx.body = result;
  }
  async return() { // 还书
    const { ctx } = this;
    let user_id = '';
    const session = this.ctx.session;
    if (session.user && session.user.id) {
      user_id = this.ctx.session.user.id;
    }
    const result = await ctx.service.book.return(ctx.query.id, user_id);
    this.ctx.body = result;
  }
  async latest() {
    const { ctx } = this;
    const result = await ctx.service.book.latest();
    this.ctx.body = result;
  }
}

module.exports = Book;
