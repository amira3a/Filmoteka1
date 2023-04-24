import {
  fetchTrendingMovies,
  getMovieInfo,
  getSearchMovies,
  hideLoadingAnimationWithDelay,
  showLoadingAnimation,
} from './API-requests.js';
import genreList from './genre-list.js';
import { createPagination } from '../index.js';
import {
  movieGalleryPosterDimension,
  MOVIE__POSTERS__URL,
  updateMovieGalleryPosterDimension,
  updateMoviePosterUrl,
} from './movie-poster-data.js';

import { search, userInput } from './search-fn.js';

// DOM elements
const movieList = document.querySelector('.card-gallery');
const loadingAnimation = document.querySelector('.loading-animation');

// PAGINATION VARIABLES
let page = 1;
let totalPages;
let currentPage;

// fuction that returns trending movies
export const showTrendingMovies = async page => {
  showLoadingAnimation();
  const list = await fetchTrendingMovies(page);
  totalPages = list.data.total_pages;
  currentPage = list.data.page;
  createPagination(totalPages, currentPage);
  const movie = list.data.results;
  renderInfo(movie);
};

export function onPaginationItemClick(e) {
  showLoadingAnimation();
  function renderMore(page) {
    if (!userInput) {
      showTrendingMovies(page);
    } else {
      search(page);
    }
  }

  if (!e.target.closest('LI').classList.contains('pagination__item')) {
    return;
  }
  if (e.target.closest('LI').classList.contains('next-page')) {
    page++;
    renderMore(page);
  }
  if (e.target.closest('LI').classList.contains('previous-page')) {
    page--;
    renderMore(page);
  }
  if (e.target.closest('LI').classList.contains('page-number')) {
    page = Number(e.target.textContent);
    renderMore(page);
  }
}

showTrendingMovies(page);

//Function to get genre names
function getGenres(genreList, genreIds) {
  const arrOfGenresName = genreIds.map(currentId => {
    const genre = genreList.find(elem => elem.id === currentId);
    return genre.name;
  });

  // console.log(arrOfGenresName)
  const str = arrOfGenresName.reduce((acc, genre, index, arr) => {
    if (arr.length > 2) {
      acc = `${arr[0]}, ${arr[1]}, Other`;
    } else {
      acc = arr.join(', ');
    }
    return acc;
  }, '');
  return str;
}

// function that renders movie info to the dom
export async function renderInfo(movies) {
  updateMoviePosterUrl();
  updateMovieGalleryPosterDimension();
  // loadingAnimation.style.display = 'none';

  function moviePosterFn(movie) {
    if (movie.poster_path) {
      return `<img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="movie-poster" ${movieGalleryPosterDimension} alt="${movie.title}"/>`;
    } else
      return `<img src='https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'class="movie-poster" ${movieGalleryPosterDimension}/>`;
  }

  movieList.innerHTML = '';

  movies.map(movie => {
    const card = document.createElement('div');
    card.setAttribute('data', movie.id);
    card.classList.add('movie-card');
    card.innerHTML = `${moviePosterFn(movie)}
                <ul class="movie_info">
                    <li class="movie_title">
                        ${movie.title}
                    </li>
                    <li class="movie_genre">
                        ${getGenres(genreList, movie.genre_ids)}
                    </li>
                    <li class="movie_release-date">
                        ${new Date(movie.release_date).getFullYear()}
                    </li>
                </ul>`;
    movieList.appendChild(card);
  });
  hideLoadingAnimationWithDelay(500);
}
