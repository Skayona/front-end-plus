const url = 'https://jsonplaceholder.typicode.com/users';

class ViewController {
  constructor() {}

  generateCard(name = 'no data', email = 'no data', phone = 'no data', website = 'no data') {
    const card = document.createElement('li');
    card.className = 'users-list__item';
    card.innerHTML = `
      <p><strong>Name:</strong> <span>${name}</span></p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
      <p><strong>Website:</strong> <a href="http:${website}" target="_blank" rel="noopener">${website}</a></p>
    `;
    return card;
  }

  generateList(url) {
    fetch(url)
      .then(response => response.json())
      .then(users => {
        const container = document.createElement('ul');
        container.className = 'users-list';
        users.forEach(user => container.appendChild(this.generateCard(user.name, user.email, user.phone, user.website)));
        document.body.appendChild(container);
      })
      .catch(error => console.error(error))
  }
}

let usersList = new ViewController;
usersList.generateList(url);