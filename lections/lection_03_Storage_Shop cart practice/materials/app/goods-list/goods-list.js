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
              ${
                data.map(item => {
                  let good = new Good(item);
                  return good.create();
                }).join('')
              }
            </div>
          </section>
        `;
      })
      .catch(err => console.error(err))
  }

  
}

const GOODS_URL = 'http://localhost:3780/goods';
new GoodList(GOODS_URL);