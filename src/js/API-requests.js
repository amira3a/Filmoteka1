import axios from 'axios';
import {
  API_KEY,
  BASE_URL,
  TRENDING_PATH,
  MOVIE_SEARCHES,
  MOVIE_INFO,
} from './API-params.js';
import { createPagination } from '../index.js';

// PAGINATION VARIBALES
let page = 1;
let totalPages;
let currentPage;

// DOM ELEMENTS
const loadingAnimation = document.querySelector('.loading-animation');

export function showLoadingAnimation() {
  loadingAnimation.style.display = 'inline-block';
}

export function hideLoadingAnimationWithDelay(delayTime) {
  setTimeout(() => {
    loadingAnimation.style.display = 'none';
  }, delayTime);
}

// HTTP Request for trending films - per day
export async function fetchTrendingMovies(page) {
  showLoadingAnimation();
  try {
    const response = await axios.get(
      `${BASE_URL}${TRENDING_PATH}?api_key=${API_KEY}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log('Trending Movies API error', error.message);
  }
}

// HTTP Request for movies by keyword search
export async function getSearchMovies(movie, page) {
  showLoadingAnimation();
  try {
    const response = await axios.get(
      `${BASE_URL}${MOVIE_SEARCHES}?api_key=${API_KEY}&query=${movie}&page=${page}`
    );
    page = response.data.page;
    totalPages = response.data.total_pages;
    createPagination(totalPages, page);
    return response.data;
  } catch (error) {
    console.log('Search Movies API error', error.message);
  }
}

// HTTP Request for movie information by movie Id
export async function getMovieInfo(movie_id) {
  showLoadingAnimation();
  try {
    const response = await axios.get(
      `${BASE_URL}${MOVIE_INFO}${movie_id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.log('Movie Info API error', error.message);
  }
}

