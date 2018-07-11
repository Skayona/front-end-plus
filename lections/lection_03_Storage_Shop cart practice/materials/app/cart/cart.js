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
        goods.forEach((el,i) => {
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
              <td>${i+1}</td>
              <td>${el.title}</td>
              <td>
                <input type="number" value="${quantity}" step="1" min="1"/>
                <button type="button" class="deleteFromCart" id="delete-${el.id}">Del</button>
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
      })
      .catch(err => console.error(err))
  }

  deleteFromCart() {
    let btns = [].slice.call(document.querySelectorAll('.deleteFromCart'));
    btns.forEach((el) => {
      el.addEventListener('click', () => {
        console.log('+');
        let id = el.id.replace('delete-', '');
        let table = document.querySelector(`#savedList`);
        let row = document.getElementById(`saved-${id}`);
        table.removeChild(row);
      })
    })


  }

  toggleFullCart() {
    let cart = document.querySelector(`#${this.id}`);
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
    let cart = document.querySelector(`#${this.id}`);
    this.saved = localStorage.getItem('InCart');
    cart.innerHTML = !this.saved ? 'Cart Is Empty' : `View Cart <span>${this.saved.split(',').length}</span>`;
  }
}

module.exports = Cart;