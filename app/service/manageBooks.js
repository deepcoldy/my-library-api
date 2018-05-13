'use strict';

const Service = require('egg').Service;

class manageBooks extends Service {
  async all() {
    const result = await this.app.mysql.query('select * from Book order by id DESC');
    return result;
  }
}

module.exports = manageBooks;
