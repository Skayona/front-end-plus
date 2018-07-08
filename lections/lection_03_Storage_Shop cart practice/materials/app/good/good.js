class Good {
  constructor(data) {
    this.good = data;
    this.addToCart(data.id)
  }

  create(good = this.good) {
    return `
      <article class="goods__item">
        <h2>${good.title}</h2>
        <div class="goods__price">Price: ${good.price} UAH</div>
        <button type="button id="${good.id}">Add</button>
      </article>
    `
  }

  addToCart(id) {
    let el = document.querySelector(id);

    el.addEventListener('click', ()=> {
      console.log('clicked');
    })
  }

}


module.exports = Good;