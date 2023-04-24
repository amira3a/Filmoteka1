
export let movieModalPosterWidth;
export let movieModalPosterHeight;
export let movieGalleryPosterDimension;
export let MOVIE__POSTERS__URL;

export function updateMoviePosterUrl() {
  if (window.innerWidth < 1024) {
    MOVIE__POSTERS__URL = `https://image.tmdb.org/t/p/w300`;
  } else {
    MOVIE__POSTERS__URL = `https://image.tmdb.org/t/p/w342`;
  }
};

export function updateMovieModalPosterDimension() {
  if (window.innerWidth < 1024) {
    movieModalPosterWidth = 300;
    movieModalPosterHeight = 400;
  } else {
    movieModalPosterWidth = 396;
    movieModalPosterHeight = 477;
  };
};

export function updateMovieGalleryPosterDimension() {
  if (window.innerWidth < 768) {
    movieGalleryPosterDimension = `width="280" height="398"`;
  } else if (window.innerWidth < 1024) {
    movieGalleryPosterDimension = `width="294" height="398"`;
  } else {
    movieGalleryPosterDimension = `width="274" height="398"`;
  };
};