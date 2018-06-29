class ViewController {
  constructor(url) {
    this.url = url;
  }

  getData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
  }

  generateTitle(title, appendTo) {
    const TITLE = document.createElement('h1');
    TITLE.innerHTML = title;
    appendTo.appendChild(TITLE);
  }

  generateLogo(logo, appendTo) {
    const IMAGE = new Image();
    IMAGE.src = logo;
    IMAGE.alt = 'Logo';
    appendTo.appendChild(IMAGE);
  }

  generateReposList(repos, appendTo) {
    this.getData(repos).then(repos => {
      for (let repo of repos) {
        const REPO = document.createElement('li');
        REPO.innerHTML = `
        <p><strong>Repository name</strong>: ${repo.name}</p>
        <p><strong>Default branch</strong>: ${repo.default_branch}</p>
        <p><strong>Last update</strong>: ${(new Date(repo.updated_at).toLocaleString('uk'))}</p>
      `;
        this.generateLanguages(repo.languages_url, REPO);
        appendTo.appendChild(REPO);
      }
    })
  }

  generateLanguages(languages, appendTo) {
    this.getData(languages).then(languages => {
      const LANGUAGES = document.createElement('ul');
      LANGUAGES.className = 'language-list';
      for (let language in languages) {
        const LANGUAGE = document.createElement('li');
        LANGUAGE.innerText = language;
        LANGUAGES.appendChild(LANGUAGE);
      }
      appendTo.appendChild(LANGUAGES);
    })
  }

  generatePage() {
    this.getData(this.url).then(data => {
      let header = document.querySelector('#section-header');
      let content = document.querySelector('#repos-list');
      this.generateTitle(data.name, header);
      this.generateLogo(data.avatar_url, header);
      this.generateReposList(data.repos_url, content);
    })
  }
}

const url = 'https://api.github.com/orgs/hillel-front-end';
const GITHUB_PAGE = new ViewController(url);
GITHUB_PAGE.generatePage();