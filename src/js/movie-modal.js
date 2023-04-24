import { getMovieInfo } from './API-requests.js';
import {
  MOVIE__POSTERS__URL,
  updateMovieModalPosterDimension,
  updateMoviePosterUrl,
  movieModalPosterWidth,
  movieModalPosterHeight,
} from './movie-poster-data.js';

class Queue {
  constructor(id, title, genres, release_date, poster_path) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.release_date = release_date;
    this.poster_path = poster_path;
  }
}

const movieGallery = document.querySelector('.card-gallery'); // my-library-update
const myLibaryGallery = document.querySelector('.mylibrary-gallery');
let mylibID = ""
let mylibtitle = ""
let mylibgenres = ""
let mylibrelease_date = ""
let mylibposter_path = ""

let checkArrary = -1;
let checkclass;
movieGallery.addEventListener('click', e => {
  //get movie id
  const parent = e.target.closest('div');
  const movieId = parent.getAttribute('data');
  mylibID = movieId;
  // show modal after html is rendered. Image is rendering after
  renderModal(movieId).then(() => modal.classList.toggle('is-hidden'));
});

myLibaryGallery.addEventListener('click', e => {
  //get movie id
  
  console.log('image clicked')
  const parent = e.target.closest('div');
  const movieId = parent.getAttribute('data');
  mylibID = movieId;
//  renderModal(movieId);
    renderModal(movieId).then(() => modal.classList.toggle('is-hidden'));

});

const modal = document.querySelector('.movie-modal__overlay');

let watchArray = [];
let queueArray = [];
let currentMovie;
const movieWatched = document.querySelector('#watchedButton');
const movieQueued = document.querySelector('#queuedButton');
movieWatched.addEventListener('click', watchedProcess);
movieQueued.addEventListener('click', queueProcess);

async function renderModal(movieID) {
  //close modal
  const closeBtn = document.querySelector('.close-button');
  closeBtn.addEventListener('click', () => modal.classList.add('is-hidden'));

  const movieName = document.querySelector('.movie-name');
  const movieInfo = document.querySelector('.movie-info-block');
  const moviePoster = document.querySelector('.modal-movie-poster');
  const movieAbout = document.querySelector('.movie-about-description');

  moviePoster.style.display = 'block';

  const movie = await getMovieInfo(movieID);

  // round average vote like 7.5975
  function roundVotes(vote) {
    if (vote.toString().length > 3) {
      return vote.toFixed(2);
    } else return vote;
  }

  // MOVIE IMAGE SPECS
  updateMovieModalPosterDimension();
  updateMoviePosterUrl();

  //movie info
  movieName.textContent = movie.title;
  moviePoster.src = '';
  moviePoster.src = `${MOVIE__POSTERS__URL}${movie.poster_path}`;
  moviePoster.alt = `${movie.title}`;
  moviePoster.width = `${movieModalPosterWidth}`;
  moviePoster.height = `${movieModalPosterHeight}`;

  //movie details
  movieInfo.innerHTML = `
  <p class='movie-info'>Vote / Votes</p> <p><span class='modal-movie-rate'>${roundVotes(
    movie.vote_average
  )}</span> /  ${movie.vote_count}</p>
  <p  class='movie-info'>Popularity</p> <p>${movie.popularity}</p>
  <p  class='movie-info'>Original Title</p> <p>${movie.original_title.toUpperCase()}</p>
  <p  class='movie-info'>Genre</p> <p>${movie.genres.map(
    gen => ' ' + gen.name
  )}</p>
  `;

  movieAbout.textContent = movie.overview;

  mylibtitle = movie.title;
  mylibgenres = movie.genres.map(gen => ' ' + gen.name);
  mylibrelease_date = movie.release_date;
  mylibposter_path = movie.poster_path;

  const watchSet = localStorage.getItem('watch') !== null;
  if (watchSet) {
    const getWatch = localStorage.getItem('watch');
    watchArray = JSON.parse(getWatch);
  } else {
    watchArray = [];
  }
  const queueSet = localStorage.getItem('queue') !== null;

  if (queueSet) {
    const getqueue = localStorage.getItem('queue');
    queueArray = JSON.parse(getqueue);
  } else {
    queueArray = [];
  }
  const watchresult = watchArray.findIndex(item => item.id === mylibID);
  if (watchresult !== -1) {
    movieWatched.innerText = 'REMOVE FROM WATCHED';
    checkclass = movieWatched.matches('.add-to-queue');
    if (checkclass) {
      movieWatched.classList.toggle('add-to-queue');
      movieWatched.classList.toggle('add-to-watched');
    }
  } else {
    movieWatched.innerText = 'ADD TO WATCHED';
    checkclass = movieWatched.matches('.add-to-watched');

    if (checkclass) {
      movieWatched.classList.toggle('add-to-watched');
      movieWatched.classList.toggle('add-to-queue');
    }
  }

  const queueresult = queueArray.findIndex(item => item.id === mylibID);

  if (queueresult !== -1) {
    movieQueued.innerText = 'REMOVE FROM QUEUE';
    checkclass = movieQueued.matches('.add-to-queue');
    if (checkclass) {
      movieQueued.classList.toggle('add-to-queue');
      movieQueued.classList.toggle('add-to-watched');
    }
  } else {
    movieQueued.innerText = 'ADD TO QUEUE';
    checkclass = movieQueued.matches('.add-to-watched');

    if (checkclass) {
      movieQueued.classList.toggle('add-to-queue');
      movieQueued.classList.toggle('add-to-watched');
    }
  }
}

function queueProcess() {
  const queueSet = localStorage.getItem('queue') !== null;
  if (queueSet) {
    const getqueue = localStorage.getItem('queue');
    queueArray = JSON.parse(getqueue);
  } else {
    queueArray = [];
  }

  checkArrary = queueArray.findIndex(item => item.id === mylibID);
  if (checkArrary === -1) {
    const queue = new Queue(
      mylibID,
      mylibtitle,
      mylibgenres,
      mylibrelease_date,
      mylibposter_path
    );
    queueArray.push(queue);
    localStorage.setItem('queue', JSON.stringify(queueArray));
    movieQueued.innerText = 'REMOVE FROM QUEUE';
    checkclass = movieQueued.matches('.add-to-queue');
    if (checkclass) {
      movieQueued.classList.toggle('add-to-queue');
      movieQueued.classList.toggle('add-to-watched');
    }
  } else {
    queueArray.splice(checkArrary, 1);
    localStorage.setItem('queue', JSON.stringify(queueArray));
    movieQueued.innerText = 'ADD TO QUEUE';
    checkclass = movieQueued.matches('.add-to-watched');

    if (checkclass) {
      movieQueued.classList.toggle('add-to-queue');
      movieQueued.classList.toggle('add-to-watched');
    }
  }
}

function watchedProcess() {
  const queueSet = localStorage.getItem('watch') !== null;
  if (queueSet) {
    const getwatch = localStorage.getItem('watch');
    watchArray = JSON.parse(getwatch);
  } else {
    watchArray = [];
  }
  console.log(watchArray);
  checkArrary = watchArray.findIndex(item => item.id === mylibID);
  console.log(checkArrary);
  if (checkArrary === -1) {
    const queue = new Queue(
      mylibID,
      mylibtitle,
      mylibgenres,
      mylibrelease_date,
      mylibposter_path
    );
    console.log;
    watchArray.push(queue);
    localStorage.setItem('watch', JSON.stringify(watchArray));
    movieWatched.innerText = 'REMOVE FROM WATCHED';
    checkclass = movieWatched.matches('.add-to-queue');
    if (checkclass) {
      movieWatched.classList.toggle('add-to-queue');
      movieWatched.classList.toggle('add-to-watched');
    }
  } else {
    watchArray.splice(checkArrary, 1);
    localStorage.setItem('watch', JSON.stringify(watchArray));
    movieWatched.innerText = 'ADD TO WATCHED';
    checkclass = movieWatched.matches('.add-to-watched');

    if (checkclass) {
      movieWatched.classList.toggle('add-to-queue');
      movieWatched.classList.toggle('add-to-watched');
    }
  }
}
