const DATASERVICE = require('../../services/data.js');
const method = require('../good/good.js');
const GOOD = method.Good;
const cart = method.cart;

class GoodList {
  constructor(path) {
    this.render(path);
  }

  render(path) {
    DATASERVICE
      .fetch(path)
      .then(json => {
        let data = json.data.list;
        let body = document.querySelector('body');

        body.innerHTML += `
          <section class="goods" id="goods-list">
            <h1>Goods</h1>
          </section>
        `;

        let goodsList = document.querySelector(`#goods-list`);


        data.forEach(item => {
          let good = new GOOD(item);
          Promise
            .resolve(goodsList.innerHTML += good.render())
            .then(() => {
              good.addToCart()
            })
        })
        cart.toggleFullCart();
        cart.updateCart()
      })
      .catch(err => console.error(err))
  }
}

module.exports = GoodList;