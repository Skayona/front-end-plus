class Good {
  constructor(url) {
    this.good = url;
    this.articleId = 'js-good-';
    this.addId = 'js-btn-';
  }

  render(good = this.good) {
    return `
      <article class="fw-good" id="${this.articleId}${good.id}">
        <h3 class="h3 fw-good__title">${good.title}</h3>
        <img class="fw-good__img" src="${good.src}" alt="${good.title}" />
        <div class="fw-good__price">Price: ${good.price} UAH</div>
        <button type="button" class="btn btn--add fw-good__btn" id="${this.addId}${good.id}" aria-label="Add to cart">+</button>
      </article>
    `;
  }

  addToCart(cart, good = this.good) {
    let btn = document.querySelector(`#${this.addId}${good.id}`);
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

module.exports = Good;