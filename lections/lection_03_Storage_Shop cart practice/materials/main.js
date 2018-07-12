const GOOD_LIST = require('./app/goods-list/goods-list.js');
const GOOD = require('./app/good/good.js');
const CART = require('./app/cart/cart.js');
const GOODS_URL = 'http://localhost:3780/goods';


new GOOD_LIST(GOODS_URL, GOOD, CART);

