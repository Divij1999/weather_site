const top = (() => {
  const header = document.createElement('div');
  header.classList.add('header');
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('searchContainer');
  const searchBar = document.createElement('input');
  searchBar.classList.add('locationInput');
  const searchBtn = document.createElement('button');
  searchBtn.classList.add('searchBtn');

  searchContainer.appendChild(searchBar);
  searchContainer.appendChild(searchBtn);

  header.appendChild(searchContainer);

  const body = document.querySelector('body');
  body.appendChild(header);

  return {
    searchBar,
    searchBtn,
  };
})();

export default top;
