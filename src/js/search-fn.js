import debounce from 'lodash.debounce';
import { getSearchMovies, showLoadingAnimation } from './API-requests.js';
import { renderInfo, showTrendingMovies } from './movie-gallery';

const searchInput = document.querySelector('.header__input');
const failedSearchText = document.querySelector('.header__no-match');

export let userInput = '';

//prevent reload after pressing 'return' button
document
  .querySelector('.header__form')
  .addEventListener('submit', e => e.preventDefault());

export async function search(page) {
  const searchResults = await getSearchMovies(userInput, page); // default page 1
  if (searchResults.results.length !== 0) {
    failedSearchText.style.display = 'none';
    renderInfo(searchResults.results);
  } else if (userInput === '') {
    failedSearchText.style.display = 'none';
    showTrendingMovies(1);
  } else failedSearchText.style.display = 'block';
}

//search fn
searchInput.addEventListener(
  'input',
  debounce(e => {
    userInput = e.target.value;
    search(1);
  }, 500)
);
