# my-library-api

api for my library

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 技术架构

[egg.js](https://eggjs.org/zh-cn/)

###插件
[egg-mysql](https://github.com/eggjs/egg-mysql) 为了连接mysql数据库
[egg-cors](https://github.com/eggjs/egg-cors) 为了允许跨域请求