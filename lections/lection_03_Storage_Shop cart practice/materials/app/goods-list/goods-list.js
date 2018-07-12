const DATASERVICE = require('../../services/data.js');
// const method = require('../good/good.js');
// const GOOD = method.Good;
// const cart = method.cart;


class GoodList {
  constructor(path, GOOD, CART) {
    this.cart = new CART(path);
    this.listId = 'js-goods-list';
    this.render(path, GOOD, this.cart);
  }

  render(path, GOOD, cart) {
    DATASERVICE
      .fetch(path)
      .then(json => {
        const data = json.data.list;
        const body = document.querySelector('body');

        cart.render();

        body.innerHTML += `
          <main>
            <section class="fw-goods" id="${this.listId}">
              <h2 class="h2 fw-goods__title">Lemonade</h2>
            </section>
          </main>
          <footer class="fw-footer">
            <span class="fw-footer__copy">&copy;KM ${(new Date()).getFullYear()}</span>
          </footer>
        `;

        const list = document.querySelector(`#${this.listId}`);

        data.forEach(item => {
          let good = new GOOD(item, cart);
          Promise
          .resolve(list.innerHTML += good.render())
          .then(() => good.addToCart(cart))
        });

        cart.renderModal();

      })
      .catch(err => console.error(err))
  }
}

module.exports = GoodList;