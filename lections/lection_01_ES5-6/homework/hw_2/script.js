const url = 'https://jsonplaceholder.typicode.com/users';

let users;

fetch(url)
  .then(response => response.json())
  .then(json => users = json);

let container = document.querySelector('#users');

class ViewController {

}

class Users extends ViewController {

}