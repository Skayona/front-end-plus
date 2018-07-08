let GoodList = require('./app/goods-list/goods-list.js');

const GOODS_URL = 'http://localhost:3780/goods';
new GoodList(GOODS_URL);