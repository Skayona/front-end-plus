const DATASERVICE = require('../../services/data.js');

class Cart {
  constructor(url) {
    this.url = url;
    this.cartBtnId = 'viewCart';
    this.saved = localStorage.getItem('InCart');
    this.body = document.querySelector('body');
    this.render();
    this.renderCartModal();
  }

  render() {
    this.body.innerHTML = `
      <header>
        <button type="button" id="${this.cartBtnId}"></button>
      </header>
    `;
    this.changeCounter();
  }

  renderCartModal() {
    this.body.innerHTML += `
      <div class="overlay hidden" id="fullCart">
        <section class="modal">
          <h2>Goods In Cart</h2>
          <div id="cartContent"></div>
        </section>
      </div>
    `;
    this.updateCart();
  }

  updateCart(path = this.url) {
    let cartContent = document.querySelector(`#cartContent`);
    if (!this.saved) {
      cartContent.innerHTML = `
        <p>Cart is empty</p>
      `;
      return;
    }
    cartContent.innerHTML = `
      <table>
        <thead>
          <th>#</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Total</th>
        </thead>
        <tbody id="savedList">
        </tbody>
        <tfoot>
          <td colspan="4">Total:</td>
          <td id="totalPrice"></td>
        <tfoot>
      <table>
    `;

    DATASERVICE
      .fetch(path)
      .then(json => {
        let savedList = document.querySelector(`#savedList`);
        let totalPrice = document.querySelector(`#totalPrice`);
        let total = 0;
        let goods = json.data.list;;
        goods.forEach(el => {
          let id = `id${el.id}`;
          if (this.saved.indexOf(id) == -1) return;
          let inCart = this.saved.split(',');
          let quantity = 1;
          for (let item of inCart) {
            if (item.indexOf(id) == 0) quantity = +item.replace(`${id}q`, '');
          }
          total += el.price * quantity;
          savedList.innerHTML += `
            <tr id="saved-${el.id}">
              <td>
                <button type="button" class="deleteFromCart" id="delete-${el.id}">Del</button>
              </td>
              <td>${el.title}</td>
              <td>
                <input type="number" class="goodQuantity" data-value="${quantity}" value="${quantity}" id="quantity-${el.id}"step="1" min="1" />
              </td>
              <td>${el.price} UAH</td>
              <td>${el.price * quantity} UAH</td>
            </tr>
          `;
        })
        totalPrice.innerHTML = `${total} UAH`;
      })
      .then(() => {
        this.deleteFromCart();
        this.changeQuantity();
      })
      .catch(err => console.error(err))
  }

  deleteFromCart() {
    let btns = [].slice.call(document.querySelectorAll('.deleteFromCart'));

    btns.forEach((el) => {
      el.addEventListener('click', () => {
        let saved = this.saved.split(',');
        let id = el.id.replace('delete-', '');
        let table = document.querySelector(`#savedList`);
        let row = document.getElementById(`saved-${id}`);
        table.removeChild(row);
        saved.forEach((e,i) => {
          if (e.indexOf(`id${id}`) > -1) saved.splice(i, 1);
        })

        localStorage.setItem('InCart', saved);
        this.saved = localStorage.getItem('InCart');
        this.updateCart();
        this.changeCounter();
      })
    })
  }


  changeQuantity() {
      let inputs = [].slice.call(document.querySelectorAll('.goodQuantity'));

      inputs.forEach((el) => {
        el.addEventListener('focusout', () => {
          if (el.value == el.dataset.value) return;
          let quantity = el.value;
          el.dataset.value = quantity;
          let saved = this.saved.split(',');
          let id = el.id.replace('quantity-', '');
          saved = saved.map(e => {
            if (e.indexOf(`id${id}`) > -1) {
              return `id${id}q${quantity}`;
            };
            return e;
          })
          localStorage.setItem('InCart', saved);
          this.saved = localStorage.getItem('InCart');
          this.updateCart();
        })
      })
  }

  toggleCartModal() {
    let cart = document.querySelector(`#${this.cartBtnId}`);
    let overlay = document.querySelector('#fullCart');
    let modal = document.querySelector('#fullCart .modal');

    function toggleModal() {
      overlay.classList.toggle('hidden');
      document.querySelector('body').classList.toggle('unscroll');
    }
    cart.addEventListener('click', toggleModal);
    overlay.addEventListener('click', toggleModal);
    modal.addEventListener('click', e => e.stopPropagation());
  }


  changeCounter() {
    let cart = document.querySelector(`#${this.cartBtnId}`);
    this.saved = localStorage.getItem('InCart');
    cart.innerHTML = !this.saved ? 'Cart Is Empty' : `View Cart <span>${this.saved.split(',').length}</span>`;
  }
}

module.exports = Cart;