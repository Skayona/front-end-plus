const DATASERVICE = require('../services/data.js');
const API_URL = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';

let ratesList = (function(date) {
  DATASERVICE
    .fetch(`${API_URL}${date}`)
    .then(json => console.log(json))
})('01.12.2014');
