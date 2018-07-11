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
      let saved = goodsInCart ? goodsInCart.split(',') : [];
      let id = `id${good.id}`;
      if (goodsInCart && goodsInCart.indexOf(id) > -1) {
        saved = saved.map(item=> {
          if (item.indexOf(`id${good.id}`) == 0)  {
            let quantity = +item.replace(`${id}q`, '')+1;
            item = `${id}q${quantity}`;
          }
          return item;
        })
      } else {
        saved.push(`${id}q1`);
      }
      localStorage.setItem('InCart', saved);
      cart.changeCounter();
      cart.updateCart();
    })
  }

}


module.exports = {Good, cart};