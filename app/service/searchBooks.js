'use strict';

const Service = require('egg').Service;

class searchBooks extends Service {
  async find(q) {
    const result = await this.app.mysql.query("select * from Book WHERE CONCAT(IFNULL(`name`,''),IFNULL(`writer`,'')) LIKE ?", `%${q}%`);
    return result;
  }
  async findDetail(id) {
    const result = await this.app.mysql.query('select * from Book WHERE id = ?', id);
    return result[0];
  }
}

module.exports = searchBooks;
