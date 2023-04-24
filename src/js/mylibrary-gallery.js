import { showLoadingAnimation, hideLoadingAnimationWithDelay } from "./API-requests";

const movieList = document.querySelector('.mylibrary-gallery');
const watchPress = document.querySelector('#mylibWat');
const queuePress = document.querySelector('#mylibqueue');
const mylibClicked = document.querySelector('.library-link');
const loadingAnimation = document.querySelector('.loading-animation');


watchPress.addEventListener('click', setUpWatch);
queuePress.addEventListener('click', setUpqueue);
let libType = 'queue';
let checkclass;
let acc = '';
const modelCloseBtn = document.querySelector('.close-button');
modelCloseBtn.addEventListener('click', setupMyLib);
mylibClicked.addEventListener('click', setupMyLib);


function setupMyLib() {
  showLoadingAnimation();
  const mylibList = (localStorage.getItem('libtype') !== null);
  if (mylibList) {
    libType = localStorage.getItem('libtype')
    if (libType === 'watch') {

      checkclass = watchPress.matches('.active-btn');
      if (!checkclass) {
        watchPress.classList.toggle("active-btn");
        queuePress.classList.toggle("active-btn");
      }
    } else {
      checkclass = queuePress.matches('.active-btn');
      if (!checkclass) {
        watchPress.classList.toggle("active-btn");
        queuePress.classList.toggle("active-btn");
      }
    }
  } else {
    libType = 'queue'

  }
  renderInfo()
}


function setUpWatch() {
  showLoadingAnimation();
  if (libType === 'watch') {
    return
  }
  libType = 'watch'

  localStorage.setItem('libtype', 'watch')
  if (libType === 'watch') {
    checkclass = watchPress.matches('.active-btn');
    if (!checkclass) {
      watchPress.classList.toggle("active-btn");
      queuePress.classList.toggle("active-btn");
    }
  }
  renderInfo()
}

function setUpqueue() {
  showLoadingAnimation();
  loadingAnimation.style.display = 'inline-block';
  if (libType === 'queue') {
    return
  }
  libType = 'queue'
  localStorage.setItem('libtype', 'queue')
  if (libType === 'queue') {
    checkclass = queuePress.matches('.active-btn');
    if (!checkclass) {
      watchPress.classList.toggle("active-btn");
      queuePress.classList.toggle("active-btn");
    }
  }
  renderInfo()
}




function renderInfo() {
  let movies;
  if (libType === 'queue') {
    localStorage.setItem('libtype', 'queue')
    const queueSet = (localStorage.getItem('queue') !== null);
    if (queueSet) {
      const moviesStorage = localStorage.getItem('queue')
      movies = JSON.parse(moviesStorage)

    } else {
      movies = []
    }
  } else {
    localStorage.setItem('libtype', 'watch')

    const watchSet = (localStorage.getItem('watch') !== null);
    if (watchSet) {
      const moviesStorage = localStorage.getItem('watch')
      movies = JSON.parse(moviesStorage)

    } else {
      movies = []
    }
  }
  movieList.innerHTML = '';

  if (movies.length > 0) {
    movies.map(movie => {

      if (movie.genres.length === 1) {
        acc = movie.genres[0]
      } else if (movie.genres.length === 2) {
        acc = `${movie.genres[0]}, ${movie.genres[1]}`;
      } else {
        acc = `${movie.genres[0]}, ${movie.genres[1]}, Other`;
      }

      const card = document.createElement('div');
      card.setAttribute('data', movie.id);
      card.classList.add('movie-card');
      card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="movie-poster" width="500px"/>
                <ul class="movie_info">
                    <li class="movie_title">
                        ${movie.title}
                    </li>
                    <li class="movie_genre">
                        ${acc}
                    </li>
                    <li class="movie_release-date">
                        ${new Date(movie.release_date).getFullYear()}
                    </li>
                </ul>`;
      movieList.appendChild(card);
    });
  } else {
    let nomovie = ''
    if (libType === 'queue') {
      nomovie = 'Queue List'
    } else {
      nomovie = 'Watched List'
    }
    const card = document.createElement('div');
    card.classList.add('no-storage');
    card.innerHTML = `<h3>No movies saved in ${nomovie}</h3>`
    movieList.appendChild(card);
  }
  hideLoadingAnimationWithDelay(500);
}

renderInfo()

// const showMovieCard = (movies) => {
//     const
// }
