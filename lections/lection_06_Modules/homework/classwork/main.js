window.onload = function () {
  const API_URL = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  const currency = 'USD';


  (function(dates) {
    const body = document.querySelector('body');
    body.innerHTML = `
      <table>
        <thead>
          <tr id="header">
            <th>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="data">
              USD
            </td>
          </tr>
        </tbody>
      </table>
    `;
    for (let date of dates) {
      fetch(`${API_URL}${date}`)
        .then(response => response.json())
        .then(result => {
          let exchangeRate;
          for (let exchange of result.exchangeRate) {
            if (exchange.currency === currency) {
              exchangeRate = exchange.saleRateNB;
            }
          }
          const header = document.querySelector('#header');

          const data = document.querySelector('#data');
          header.innerHTML = `
            <th>
              ${date}
            </th>
          `;
          console.log(date, exchangeRate);
        })
    }
  })(['01.12.2014', '05.08.2018']);



}