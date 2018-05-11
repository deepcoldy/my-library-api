'use strict';

const Service = require('egg').Service;

class user extends Service {
  async login(q) {
    const result = await this.app.mysql.query("select * from Book WHERE CONCAT(IFNULL(`name`,''),IFNULL(`writer`,'')) LIKE ?", `%${q}%`);
    return result;
  }
  async register(id) {
    const result = await this.app.mysql.query('select * from Book WHERE id = ?', id);
    return result[0];
  }
}

module.exports = user;
