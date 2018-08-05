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
        console.log(res);
      })
  })(['01.12.2014', '05.08.2018']);



}