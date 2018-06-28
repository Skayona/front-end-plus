class Response {
  constructor(url) {
    this.url = url;
  }

  getData(url = this.url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }
}

class ViewController {
  constructor(url){
    this.page = (new Response(url)).getData();
    this.title = this.page.then(data => data.name);
    this.logo = this.page.then(data => data.avatar_url);
    this.repos = this.page.then(data => (new Response(data.repos_url)).getData());
    this.header = document.querySelector('#repos-header');
    this.list = document.querySelector('#repos-list')
  }

  generateTitle(title = this.title) {
    return title
      .then(title => {
        const TITLE = document.createElement('h1');
        TITLE.innerHTML = title;
        this.header.appendChild(TITLE);
      })
  }

  generateLogo(logo = this.logo) {
    logo
      .then(img => {
        const IMAGE = new Image();
        IMAGE.src = img;
        IMAGE.alt = 'Logo';
        this.header.appendChild(IMAGE);
      })
  }

  generateLanguages(repo, languages) {
    const LANGUAGE_LIST = document.createElement('ul');
    LANGUAGE_LIST.className = 'language-list';
    (new Response(languages))
      .getData()
      .then(languages => {
        for (let language in languages) {
          const LANGUAGE = document.createElement('li');
          LANGUAGE.innerText = language;
          LANGUAGE_LIST.appendChild(LANGUAGE);
        }
        repo.appendChild(LANGUAGE_LIST);
      })
  }

  generateReposList(repos = this.repos) {
    repos
      .then(repos => {
        for (let repo of repos) {
          const REPO = document.createElement('li');
          REPO.innerHTML = `
            <p><strong>Repository name</strong>: ${repo.name}</p>
            <p><strong>Default branch</strong>: ${repo.default_branch}</p>
            <p><strong>Last update</strong>: ${(new Date(repo.updated_at).toLocaleString('uk'))}</p>
          `;
          this.generateLanguages(REPO, repo.languages_url);
          this.list.appendChild(REPO);
        }

      })
  }

  generatePage() {
    this.generateTitle();
    this.generateLogo();
    this.generateReposList();
  }
}

const GITHUB_PAGE = new ViewController('https://api.github.com/orgs/hillel-front-end');
GITHUB_PAGE.generatePage();