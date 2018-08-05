window.onload = function () {
  const API_URL = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  const currency = 'USD';

  (function (dates) {
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
        let ratio;
        res.reduce((prev, cur) => {
          ratio = Math.floor((cur.exchangeRate / prev.exchangeRate) * 100);
        })
        const body = document.querySelector('body');
        body.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>
                  Date
                </th>
                ${res.map(e => `<th>${e.date}</th>`).join('')}
                <th>
                  Ratio, %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1 USD
                </td>
                  ${res.map(e => `<td>${e.exchangeRate}</td>`).join('')}
                <td>
                  ${ratio}
                </td>
              </tr>
            </tbody>
          </table>
        `;
      })
  })(['01.12.2014', '05.08.2018']);



}