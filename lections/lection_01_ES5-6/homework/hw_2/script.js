const url = 'https://jsonplaceholder.typicode.com/users';

class ViewController {
  constructor() {}

  generateCard(user) {
    const card = document.createElement('li');
    card.className = 'users-list__item';
    card.innerHTML = `
      <p><strong>Name:</strong> <span>${user.name}</span></p>
      <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></p>
      <p><strong>Website:</strong> <a href="http:${user.website}" target="_blank" rel="noopener">${user.website}</a></p>
    `;
    return card;
  }

  generateList(url) {
    fetch(url)
      .then(response => response.json())
      .then(users => {
        const container = document.createElement('ul');
        container.className = 'users-list';
        users.forEach(user => container.appendChild(this.generateCard(user)));
        document.body.appendChild(container);
      })
      .catch(error => console.error(error))
  }
}

let usersList = new ViewController;
usersList.generateList(url);