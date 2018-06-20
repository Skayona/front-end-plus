class ViewController {
  generateCard() {
    return `
      <p><strong>Name:</strong> <span>${this.name}</span></p>
      <p><strong>Email:</strong> <a href="mailto:${this.email}">${this.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${this.phone}">${this.phone}</a></p>
      <p><strong>Website:</strong> <a href="http:${this.website}" target="_blank" rel="noopener">${this.website}</a></p>
    `
  }
  generateList(container, className = 'item') {
    let item = document.createElement('li');
    item.className = className;
    item.innerHTML = this.generateCard();
    return container.appendChild(item);
  }
}

class User extends ViewController {
 constructor(user) {
    super();
    let noData = 'no data';

    this.name = user.name || noData;
    this.email = user.email || noData;
    this.phone = user.phone || noData;
    this.website = user.website || noData;
  }
}

// used json file
const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url)
.then(response => response.json())
.then(data => {
    const container = document.createElement('ul');
    container.className = 'users-list';
    const title = document.createElement('h2');
    title.innerHTML = 'used json file';
    let users = data.map((e) => new User(e));
    users.forEach(e => e.generateList(container, 'users-list__item'));
    document.body.insertBefore(title, document.body.nextSibling);
    document.body.insertBefore(container, title.nextSibling);
  })
  .catch(error => console.error(error))


// used array in js
const data = [{
    "name": "Search Man",
    "email": "search@google.com.ua",
    "phone": "1-770-736-8031 x56442",
    "website": "google.com.ua",
  },
  {
    "name": "Email Man",
    "email": "email@meta.ua",
    "phone": "1-770-736",
    "website": "meta.ua",
  },
  {
    "name": "News Man",
    "email": "News@ukr.net",
    "phone": "123-46-89",
    "website": "ukr.net",
  },
  {
    "name": "Forecast Man",
    "email": "forecast@gistmeteo.ua",
    "phone": "1323-5646",
    "website": "gismeteo.ua",
  }
];

const container = document.createElement('ul');
container.className = 'users-list';
const title = document.createElement('h2');
title.innerHTML = 'used array in js';
let users = data.map((e) => new User(e));
users.forEach(e => e.generateList(container, 'users-list__item'));
window.onload = () => {
  document.body.insertBefore(title, document.body.nextSibling);
  document.body.insertBefore(container, title.nextSibling);
}