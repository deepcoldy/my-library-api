'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class manageBooks extends Service {
  async all() {
    const result = await this.app.mysql.query('select * from Book order by id DESC');
    console.log(result);
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
    const result = await this.app.mysql.insert('Book', {
      name,
      writer,
      publisher,
      total_number,
      available_number: total_number,
      price,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    console.log(result);
    return result;
  }
}

module.exports = manageBooks;
