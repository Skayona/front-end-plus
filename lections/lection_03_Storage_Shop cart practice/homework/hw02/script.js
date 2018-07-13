const DATASERVICE = require('./services/data.js');
const body = document.querySelector('body');

DATASERVICE
  .fetch('http://localhost:3000/users')
  .then(json => body.innerHTML += `'users': ${JSON.stringify(json)} <br />`)

DATASERVICE
  .fetch('http://localhost:3000/users/:first')
  .then(json => body.innerHTML += `'users/:first': ${JSON.stringify(json)} <br />`)

DATASERVICE
  .fetch('http://localhost:3000/users/:last')
  .then(json => body.innerHTML += `'users/:last': ${JSON.stringify(json)} <br />`)

DATASERVICE
  .fetch('http://localhost:3000/users/:all')
  .then(json => body.innerHTML += `'users/:all': ${JSON.stringify(json)} <br />`)

DATASERVICE
  .fetch('http://localhost:3000/user/:user002')
  .then(json => body.innerHTML += `'user/:user002': ${JSON.stringify(json)} <br />`)

