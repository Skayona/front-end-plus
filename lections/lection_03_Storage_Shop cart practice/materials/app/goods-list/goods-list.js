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
            <div class="goods-wrap">
              ${data.map(item => {
                let good = new Good(item);
                return good.create();
              }).join('')}
            </div>
          </section>
        `;


      })
      .catch(err => console.error(err))
  }
}

module.exports = GoodList;