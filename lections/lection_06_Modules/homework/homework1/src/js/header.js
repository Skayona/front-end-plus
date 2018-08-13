const menu = ['home', 'events', 'total'];

(function (menu) {
  const header = document.querySelector('header');
  let currentPage = new URL(document.URL);
  currentPage = currentPage.pathname.match(/[^\/].+/);
  currentPage = currentPage ? currentPage[0].replace('.html', '') : 'index';

  header.innerHTML = `
    <ul class="container">
      ${menu.map(e => {
        if (e === currentPage) {
          return `<li><a href="${e}.html" class="active">${e}</a></li>`
        }
        return `<li><a href="${e}.html">${e}</a></li>`;
      }).join('')}
    </ul>
  `;

}(menu));