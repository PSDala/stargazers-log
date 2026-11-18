const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');
const loadError = document.querySelector('#load-error');

const formatStars = (stars) => new Intl.NumberFormat().format(stars);

function createRepositoryItem(repository, index) {
  const item = document.createElement('li');
  item.className = 'repository-item';
  item.style.animationDelay = `${index * 70}ms`;

  const link = document.createElement('a');
  link.className = 'repository-link';
  link.href = repository.url;
  link.target = '_blank';
  link.rel = 'noreferrer';

  const owner = document.createElement('span');
  owner.className = 'repository-owner';
  owner.textContent = repository.owner;

  const name = document.createElement('span');
  name.className = 'repository-name';
  name.textContent = repository.name;

  const description = document.createElement('p');
  description.className = 'repository-description';
  description.textContent = repository.description;

  link.append(owner, name, description);

  const meta = document.createElement('div');
  meta.className = 'repository-meta';

  const language = document.createElement('span');
  language.className = 'repository-language';
  language.textContent = repository.language;

  const date = document.createElement('span');
  date.className = 'repository-date';
  date.textContent = `★ ${formatStars(repository.stars)} · ${repository.starredAt}`;

  meta.append(language, date);
  item.append(link, meta);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch('./events.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const repositories = await response.json();
    repositoryList.replaceChildren(
      ...repositories.map((repository, index) => createRepositoryItem(repository, index))
    );
    repositoryCount.textContent = `${repositories.length} repos`;
  } catch (error) {
    repositoryCount.textContent = 'Unavailable';
    loadError.hidden = false;
    console.error('Could not load starred repositories:', error);
  }
}

loadRepositories();