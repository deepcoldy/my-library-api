'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class Book extends Service {
  async search(q) {
    const result = await this.app.mysql.query("select * from Book WHERE CONCAT(IFNULL(`name`,''),IFNULL(`writer`,'')) LIKE ?", `%${q}%`);
    return result;
  }
  async detail(book_id, user_id) {
    const mysql = this.app.mysql;
    const result = await mysql.query('select * from Book WHERE id = ?', book_id);
    let status = 1 // 可借
    if (user_id) {
      const history = await mysql.select('Borrow', {
        where: {
          user_id,
          book_id,
        },
      });
      if (history && history.length !== 0) {
        history.map((item) => {
          if (dayjs(item.borrow_date).isBefore(new dayjs()) && dayjs(item.return_date).isAfter(new dayjs())) status = 0
        });
      }
    } else {
      status = 2 // 未登录
    }

    return {
      ...result[0],
      status
    };
  }
  async borrow(book_id, user_id) {
    const mysql = this.app.mysql;
    let result = await mysql.insert('Borrow', {
      user_id,
      book_id,
      borrow_date: new dayjs().format('YYYY-MM-DD HH:mm:ss'),
      return_date: new dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
    });
    const book = await mysql.select('Book', {
      where: { id: book_id }
    });
    const user = await mysql.select('User', {
      where: { id: user_id }
    });
    if(book && book[0]){
      if(book[0].available_number){
        result = await mysql.update('User', {
          borrow_times: user[0].borrow_times + 1,
        }, {
            where: { id: user_id }
        });
        if (result.affectedRows !== 1)  return result
        result = await mysql.update('Book', {
          available_number: book[0].available_number - 1,
        }, {
            where: { id: book_id }
        });
        
      }
    }
    return result;
  }
  async borrowed(user_id) {
    const mysql = this.app.mysql;
    const history = await mysql.query('select *, Borrow.id as record_id from Borrow JOIN Book ON Borrow.book_id = Book.id WHERE Borrow.user_id = ? ORDER BY record_id DESC', user_id);
    //  
    history.map((item) => {
      item.borrow_date = dayjs(item.borrow_date).format('YYYY-MM-DD')
      item.return_date = dayjs(item.return_date).format('YYYY-MM-DD')
      item.date = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
      item.due = dayjs(new dayjs()).isAfter(new dayjs(item.return_date))
    })
    return history;
  }
  async renew(record_id, user_id) {
    const mysql = this.app.mysql;

    const history = await mysql.select('Borrow', {
      where: { id: record_id }
    })
    if (history[0].renew < 3) {
      const result = await mysql.update('Borrow', {
        renew: history[0].renew + 1,
        return_date: new dayjs(history[0].return_date).add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
      }, {
          where: { id: record_id }
        })
      return result;
    } else {
      return false
    }
  }
  async return(record_id, user_id) {
    const mysql = this.app.mysql;
    const history = await mysql.select('Borrow', {
      where: { id: record_id }
    })
    if (history[0].renew < 3) {
      const result = await mysql.update('Borrow', {
        returned: 1,
        return_date: new dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        where: { id: record_id }
      })
      return result;
    } else {
      return false
    }
  }
  async latest() {
    const mysql = this.app.mysql;
    const latest = await mysql.select('Book', {
      orders: [['id', 'desc']],
      limit: 10,
    })
    latest.map((item) => {
      item.date = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
    })
    return latest
  }
}

module.exports = Book;
