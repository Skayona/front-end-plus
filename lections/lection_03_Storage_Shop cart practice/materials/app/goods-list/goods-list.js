let DataService = require('../../services/data.js');
let Good = require('../good/good.js');
class GoodList {
  constructor(path) {
    this.genereateGoodList(path);
  }

  genereateGoodList(path) {
    DataService
      .fetch(path)
      .then(json => {
        let data = json.data.list;
        let body = document.querySelector('body');
        body.innerHTML = `
          <section class="goods">
            <h1>Goods</h1>
            <div class="goods-wrap" id="goods-list">
            </div>
          </section>
        `;

        data.forEach(item => {
          let good = new Good(item);
          Promise
            .resolve(good.render())
            .then(() => good.addToCart(item.id))
        })
      })
      .catch(err => console.error(err))
  }
}

module.exports = GoodList;