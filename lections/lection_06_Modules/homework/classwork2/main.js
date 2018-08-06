window.onload = function () {
  const API_URL = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  const currency = 'USD';
  (function (n) {
    const curDate = new Date().valueOf();
    const msInDay = 86400000;
    let dates = [];
    for (let i = 0; i <= n; i++) {
      let date = new Date(curDate - (i * msInDay)).toLocaleDateString('uk-UA');
      dates.push(date);
    }
    Promise.all(dates.map(date =>
        fetch(`${API_URL}${date}`)
        .then(response => response.json())
        .then(result => {
          let exchangeRate;
          for (let exchange of result.exchangeRate) {
            if (exchange.currency === currency) {
              exchangeRate = exchange.saleRateNB;
            }
          }
          return {
            date,
            exchangeRate
          };
        })
      ))
      .then(res => {
        res.reduce((prev, cur, i) => {
          res[i - 1].ratio = ((prev.exchangeRate / cur.exchangeRate) * 100).toFixed(2);
          return cur;
        })
        const secondEx = document.querySelector('#second-example');
        secondEx.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rate, UAH</th>
                <th>Ratio, %</th>
              </tr>
            </thead>
            <tbody>
            ${res.map((e, i) => {
              if (i === n) return;
              return `<tr>
                <td>${e.date}</td>
                <td>${e.exchangeRate}</td>
                <td>${e.ratio}</td>
              </tr>`
              }).join('')
            }
            </tbody>
          </table>
        `;
      })
  })(5);
}