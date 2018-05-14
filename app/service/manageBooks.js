'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class manageBooks extends Service {
  async all() {
    const result = await this.app.mysql.query('select * from Book order by id DESC');
    result.map(item => {
      item.date = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss');
      return item;
    });
    return result;
  }
  async add({
    name,
    writer,
    publisher,
    total_number,
    price,
  }) {
    let result = await this.app.mysql.insert('Book', {
      name,
      writer,
      publisher,
      total_number,
      available_number: total_number,
      price,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    if (result.affectedRows === 1) {
      result = await this.app.mysql.select('Book', {
        where: { id: result.insertId },
      });
      result.map(item => {
        item.date = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss');
        return item;
      });
    }
    return result;
  }
  async delete(id) {
    const result = await this.app.mysql.delete('Book', {
      id,
    });
    return result;
  }
  async edit({
    id,
    valueKey,
    value,
  }) {
    const result = await this.app.mysql.update('Book', {
      [valueKey]: value,
    }, {
      where: { id },
    }); // 更新字段
    return result;
  }
}

module.exports = manageBooks;
