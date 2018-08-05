window.onload = function () {
  const API_URL = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';
  const currency = 'USD';
  (function (n) {
    const curDate = new Date().valueOf();
    const msInDay = 86400000;
    let dates = [];
    for (let i = 0; i < n; i++) {
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
        console.log(res);
        let ratio = [];
        res.reduce((prev, cur) => {
          console.log(cur);

          // ratio.push(Math.floor((cur.exchangeRate / prev.exchangeRate) * 100));
        })

        const firstEx = document.querySelector('#first-example');
        // firstEx.innerHTML = `
        //   <table>
        //     <thead>
        //       <tr>
        //         <th>
        //           Date
        //         </th>
        //         ${res.map(e => `<th>${e.date}</th>`).join('')}
        //         <th>
        //           Ratio, %
        //         </th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <tr>
        //         <td>
        //           1 USD
        //         </td>
        //           ${res.map(e => `<td>${e.exchangeRate}</td>`).join('')}
        //         <td>
        //           ${ratio}
        //         </td>
        //       </tr>
        //     </tbody>
        //   </table>
        // `;
      })
  })(5);
}