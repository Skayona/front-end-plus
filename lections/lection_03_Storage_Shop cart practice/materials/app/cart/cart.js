const DATASERVICE = require('../../services/data.js');
const DataBase = require('../../services/dataBase.js');

class Cart {
  constructor(url) {
    this.url = url;
    this.showBtnId = 'js-show-cart';
    this.contentId = 'js-cart-content';
    this.savedListId = 'js-saved-list';
    this.deleteItemId = 'js-delete-';
    this.quantityId = 'js-quantity-';
    this.overlayId = 'js-overlay-card';
    this.modalCloseId = 'js-close-modal';
    this.rowId = 'js-row-';
    this.saved = localStorage.getItem('InCart');
  }

  render() {
    const body = document.querySelector('body');
    body.innerHTML = `
      <header class="fw-header">
        <h1 class="h1 fw-header__title">Fresh&nbsp;Water</h1>
        <button type="button" class="btn btn--cart fw-header__btn" id="${this.showBtnId}"></button>
      </header>
    `;
    this.changeCounter();
  }

  renderModal() {
    const main = document.querySelector('main');
    main.innerHTML += `
      <div class="fw-overlay hidden" id="${this.overlayId}">
        <section class="fw-modal">
          <button type="button" class="fw-modal__close" id="${this.modalCloseId}" aria-label="close cart"></button>
          <h2 class="h2 fw-modal__title">Selected Lemonades</h2>
          <div class="fw-modal__content" id="${this.contentId}"></div>
          <button class="fw-modal__order btn btn--order" id="js-order-goods" type="button">Order</button>
        </section>
      </div>
    `;
    this.toggleCartModal();
    this.updateCart();
  }

  updateCart(path = this.url) {
    let cartContent = document.querySelector(`#${this.contentId}`);
    if (!this.saved) {
      cartContent.innerHTML = `
        <p>Cart is empty</p>
      `;
      return;
    }
    cartContent.innerHTML = `
      <table class="fw-table">
        <thead class="fw-table__header">
          <th></th>
          <th></th>
          <th>Title</th>
          <th>Amount</th>
          <th>Price, UAH</th>
          <th>Total, UAH</th>
        </thead>
        <tbody class="fw-table__body" id="${this.savedListId}">
        </tbody>
        <tfoot class="fw-table__footer">
          <td colspan="5"></td>
          <td id="totalPrice"></td>
        </tfoot>
      </table>
    `;

    DATASERVICE
      .fetch(path)
      .then(json => {
        let savedList = document.querySelector(`#${this.savedListId}`);
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
            <tr id="${this.rowId}${el.id}">
              <td>
                <button type="button" class="deleteFromCart" id="${this.deleteItemId}${el.id}"></button>
              </td>
              <td>
                <img class="fw-table__img" src="${el.img}" alt="${el.title}" />
              </td>
              <td>${el.title}</td>
              <td>
                <input type="number" class="goodQuantity" data-value="${quantity}" value="${quantity}" id="${this.quantityId}${el.id}" step="1" min="1" />
              </td>
              <td>${el.price}</td>
              <td>${el.price * quantity}</td>
            </tr>
          `;
        })
        totalPrice.innerText = `${total}`;
        return goods;
      })
      .then(data => {
        this.deleteFromCart();
        this.changeQuantity();
        this.orderGoods(data);
      })
      .catch(err => console.error(err))
  }

  deleteFromCart() {
    let btns = [].slice.call(document.querySelectorAll('.deleteFromCart'));

    btns.forEach((el) => {
      el.addEventListener('click', () => {
        let saved = this.saved.split(',');
        let id = el.id.replace(this.deleteItemId, '');
        let table = document.querySelector(`#${this.savedListId}`);
        let row = document.getElementById(`${this.rowId}${id}`);
        table.removeChild(row);

        saved.forEach((e,i) => {
          if (e.indexOf(`id${id}`) == -1) return;
          saved.splice(i, 1);
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
          let id = el.id.replace(this.quantityId, '');
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
    let cart = document.querySelector(`#${this.showBtnId}`);
    let overlay = document.querySelector(`#${this.overlayId}`);
    let modal = document.querySelector(`#${this.overlayId} .fw-modal`);
    let close = document.querySelector(`#${this.modalCloseId}`);

    function toggleModal() {
      overlay.classList.toggle('hidden');
      document.querySelector('body').classList.toggle('unscroll');
    }
    cart.addEventListener('click', toggleModal);
    overlay.addEventListener('click', toggleModal);
    close.addEventListener('click', toggleModal);
    modal.addEventListener('click', e => e.stopPropagation());
  }

  changeCounter() {
    let cart = document.querySelector(`#${this.showBtnId}`);
    this.saved = localStorage.getItem('InCart');
    cart.innerHTML = !this.saved ? 'Cart Is Empty' : `View Cart <span>${this.saved.split(',').length}</span>`;
  }

  orderGoods (data) {
    const order = document.querySelector('#js-order-goods');
    let list = this.saved.split(',');
    list = list.map(e => {
      e = e.replace('id', '');
      let id = e.slice(0, e.indexOf('q'))
      e = e.replace(`${id}q`, '');
      let q = e;
      return {id, q};
    })

    console.log(list);


    order.addEventListener('click', ()=> {
      DATASERVICE
        .fetch('http://localhost:3780/order')
        .then(res => console.log(res))
        .catch(() => {
          DataBase(list);
          console.log(indexedDB.open("InCart", 3).result);

        })
    })
  }
}

module.exports = Cart;