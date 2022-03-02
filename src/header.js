const top = (() => {
  const header = document.createElement('div');
  header.classList.add('header');

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('searchContainer');

  const searchBar = document.createElement('input');
  searchBar.classList.add('locationInput');

  const searchBtn = document.createElement('button');
  searchBtn.classList.add('searchBtn');
  searchBtn.textContent = 'Search';

  const div = document.createElement('div');
  div.classList.add('search');
  div.appendChild(searchBar);
  div.appendChild(searchBtn);

  const searchOptions = document.createElement('div');
  searchOptions.classList.add('searchOptions');

  searchContainer.appendChild(div);
  searchContainer.appendChild(searchOptions);

  header.appendChild(searchContainer);

  const body = document.querySelector('body');
  body.appendChild(header);

  return {
    searchBar,
    searchBtn,
    searchOptions,
    searchContainer,
  };
})();

export default top;
