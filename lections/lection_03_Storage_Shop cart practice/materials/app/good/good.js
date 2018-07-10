const CART = require('../cart/cart.js');
let cart = new CART('http://localhost:3780/goods');
class Good {
  constructor(data) {
    this.good = data;
  }

  render(good = this.good) {
    return `
      <article class="goods__item" id="good-${good.id}">
        <h2>${good.title}</h2>
        <div class="goods__price">Price: ${good.price} UAH</div>
        <button type="button" id="btn-${good.id}">Add</button>
      </article>
    `;
  }

  addToCart(good = this.good) {
    let btn = document.querySelector(`#btn-${good.id}`);
    btn.addEventListener('click', () => {
      let goodsInCart = localStorage.getItem('InCart');
      if (goodsInCart && goodsInCart.indexOf(good.id) > -1) return;
      goodsInCart = goodsInCart ? [goodsInCart, good.id] : good.id;
      localStorage.setItem('InCart', goodsInCart);
      cart.changeCounter();
      cart.updateCart();
    })
  }

}


module.exports = {Good, cart};