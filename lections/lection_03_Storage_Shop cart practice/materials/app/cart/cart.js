const DATASERVICE = require('../../services/data.js');

class Cart {
  constructor(url) {
    this.url = url;
    this.id = 'viewCart';
    this.saved = localStorage.getItem('InCart');
    this.body = document.querySelector('body');
    this.render();
    this.renderFullCart();
  }

  render() {
    this.body.innerHTML = `
      <header>
        <button type="button" id="${this.id}"></button>
      </header>
    `;
    this.changeCounter();
  }

  renderFullCart() {
    this.body.innerHTML += `
      <div class="overlay hidden" id="fullCart">
        <section class="modal">
          <h2>Goods In Cart</h2>
          <ul id="savedList">
          </ul>
        </section>
      </div>
    `;


    this.updateCart();
  }

  updateCart(path = this.url) {
    let savedList = document.querySelector(`#savedList`);
    if (!this.saved) {
      savedList.innerHTML = `
        <p>Cart is empty</p>
      `;
      return;
    }
    savedList.innerHTML = '';

    DATASERVICE
      .fetch(path)
      .then(json => {
        let goods = json.data.list;
        goods.forEach(item => {
          if (this.saved.indexOf(item.id) > -1) {
            savedList.innerHTML += `
              <li>Title: ${item.title}, price: ${item.price}</li>
            `;
          }
        })
      })
      .catch(err => console.error(err))
  }

  toggleFullCart() {
    let cart = document.querySelector(`#${this.id}`);
    let modal = document.querySelector('#fullCart');
    function toggleModal() {
      modal.classList.toggle('hidden');
      document.querySelector('body').classList.toggle('unscroll');
    }
    cart.addEventListener('click', toggleModal);
    modal.addEventListener('click', toggleModal);
  }

  changeCounter() {
    let cart = document.querySelector(`#${this.id}`);
    this.saved = localStorage.getItem('InCart');
    cart.innerHTML = !this.saved ? 'Cart Is Empty' : `View Cart <span>${this.saved.split(',').length}</span>`;
  }
}

module.exports = Cart;