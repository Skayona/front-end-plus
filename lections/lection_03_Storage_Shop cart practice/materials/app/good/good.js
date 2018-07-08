class Good {
  constructor(data) {
    this.good = data;
  }

  render(good = this.good) {
    let goodsList = document.querySelector(`#goods-list`);

    goodsList.innerHTML += `
      <article class="goods__item" id="good-${good.id}">
        <h2>${good.title}</h2>
        <div class="goods__price">Price: ${good.price} UAH</div>
        <button type="button" id="btn-${good.id}">Add</button>
      </article>
    `;
  }

  addToCart(id) {
    let el = document.querySelector(`#btn-${id}`);

    el.addEventListener('click', () => {
      console.log(el);
    })
  }

}


module.exports = Good;