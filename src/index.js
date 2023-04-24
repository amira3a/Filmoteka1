const apiParams = require('./js/API-params');
const apiRequests = require('./js/API-requests');
const movieGallery = require('./js/movie-gallery');


const refs = {
  userMovieSearch: document.querySelector('.header__form'),
  userMovieSearchContainer: document.querySelector('.header__form-container'),
  homeLink: document.querySelector('.home-link'),
  libraryLink: document.querySelector('.library-link'),
  headerBtnContainer: document.querySelector('.header__buttons-container'),
  queueBtn: document.querySelector('.library__button-queue'),
  watchedBtn: document.querySelector('.library__button-watched'),
  logoLink: document.querySelector('.logo-link'),
  goitLink: document.querySelector('.footer-link'),
  paginationContainer: document.querySelector('.pagination__container'),
  paginationList: document.querySelector('.pagination__list'),
 cardsDiv: document.querySelector('.card-gallery'),
  mylibDiv: document.querySelector('.mylibrary-gallery'),
  pagePagination: document.querySelector('.pagination__container'),

};

export let page = 1;

function onHomeLinkClick(e) {
  if (e.target !== refs.homeLink) {
    return;
  }
  // refs.moviePosterGallery.innerHTML = '';  //CLEAR GALLERY
  refs.userMovieSearch.value = '';
  refs.homeLink.classList.add('active');
  refs.libraryLink.classList.remove('active');
  document.body.classList.remove('my-library');
  refs.headerBtnContainer.style.display = 'none';
  refs.userMovieSearchContainer.style.display = 'flex';
  refs.cardsDiv.style.removeProperty('display');
  refs.cardsDiv.style.display ='grid';
  refs.mylibDiv.style.removeProperty('display');
  refs.mylibDiv.style.display = 'none';
  refs.pagePagination.style.removeProperty('display');
  
  // fetchMovies(); //FETCH AND RENDER TRENDING MOVIES
}

function onLibraryLinkClick(e) {
  if (e.target !== refs.libraryLink) {
    return;
  }
  // refs.moviePosterGallery.innerHTML = '';  //CLEAR GALLERY
  refs.userMovieSearch.value = '';
  refs.libraryLink.classList.add('active');
  refs.homeLink.classList.remove('active');
  refs.userMovieSearchContainer.style.display = 'none';
  refs.headerBtnContainer.style.display = 'flex';
   refs.cardsDiv.style.removeProperty('display');
  refs.cardsDiv.style.display ='none';
  refs.mylibDiv.style.removeProperty('display');
  refs.mylibDiv.style.display ='grid';
  refs.pagePagination.style.display = 'none';
  document.body.classList.add('my-library');
    


};

function onQueueBtnClick(e) {
  if (e.target !== refs.queueBtn) {
    return;
  }
  refs.watchedBtn.classList.remove('active-btn');
  refs.queueBtn.classList.add('active-btn');
  // refs.moviePosterGallery.innerHTML = '';  //CLEAR GALLERY
  refs.userMovieSearch.value = '';
};

function onWatchedBtnClick(e) {
  if (e.target !== refs.watchedBtn) {
    return;
  }
  refs.queueBtn.classList.remove('active-btn');
  refs.watchedBtn.classList.add('active-btn');
  // refs.moviePosterGallery.innerHTML = '';  //CLEAR GALLERY
  refs.userMovieSearch.value = '';
};

export function createPagination(totalPages, page) {
  let paginationItem = '';
  let active;
  let firstLiPage = (page >= 6) ? page - 5 : 1;
  let beforePage = page - 2;
  let afterPage = page + 2;
  if (window.innerWidth > 767) {

    if (page > 1) { //show the previous button if the page value is greater than 1
      paginationItem += ` 
      <li class="pagination__item previous-page page-control">
        <svg class="previous-icon pagination-icon" width="16" height="16" viewBox="0 0 32 32">
          <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
        </svg>
      </li>`;
    }

    if (page > 3) { //if page value is greater than 3 then add first li or page
      paginationItem += `<li class="pagination__item page-number page-control">${firstLiPage}</li>`;
      if (page > 4) { //if page value is greater than 5 then add this (...) after the first li or page
        paginationItem += `<li class="pagination__item pagination-dots"><span class="page-dots">...</span></li>`;
      }
    }

    // how many pages or li show before the current li
    if (beforePage < 1) {
      beforePage = 1;
    }

    // how many pages or li show after the current li
    if (afterPage > totalPages) {
      afterPage = totalPages;
    }

    for (let pageCount = beforePage; pageCount <= afterPage; pageCount++) {
      if (pageCount > totalPages) { //if pageCount is greater than totalPage length then continue
        continue;
      }
      if (pageCount == 0) { //if pageCount is 0 than add +1 in pageCount value
        pageCount = pageCount + 1;
      }
      if (page == pageCount) { //if page is equal to pageCount than assign active string in the active variable
        active = "current-page";
      } else { //else leave empty to the active variable
        active = "";
      }
      paginationItem += `<li class="pagination__item page-number page-control ${active}">${pageCount}</li>`;
    }

    if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      if (page < totalPages - 4) {
        paginationItem += `<li class="pagination__item pagination-dots"><span class="page-dots">...</span></li>`;
      }
      paginationItem += `<li class="pagination__item page-number page-control">${page + 5}</li>`;
    }

    if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
      paginationItem += `
      <li class="pagination__item next-page page-control">
        <svg class="next-icon pagination-icon" width="16" height="16" viewBox="0 0 32 32">
          <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
        </svg>
      </li>`;
    }
    refs.paginationList.innerHTML = paginationItem;
    //add li tag inside ul tag
    return paginationItem; //return the li tag
  } else if (window.innerWidth < 768) {
    beforePage = page - 1;
    afterPage = page + 1;

    if (page > 1) { //show the previous button if the page value is greater than 1
      paginationItem += ` 
      <li class="pagination__item previous-page page-control">
        <svg class="previous-icon pagination-icon" width="16" height="16" viewBox="0 0 32 32">
          <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
        </svg>
      </li>`;
    }

    if (page > 2) {
      paginationItem += `<li class="pagination__item page-number page-control">${firstLiPage}</li>`;
    }

    if (page == totalPages) {
      beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
      beforePage = beforePage - 1;
    }
    // how many pages or li show after the current li
    if (page == 1) {
      afterPage = afterPage + 2;
    } else if (page == 2) {
      afterPage = afterPage + 1;
    }

    for (let pageCount = beforePage; pageCount <= afterPage; pageCount++) {
      if (pageCount > totalPages) { //if pageCount is greater than totalPage length then continue
        continue;
      }
      if (pageCount == 0) { //if pageCount is 0 than add +1 in pageCount value
        pageCount = pageCount + 1;
      }
      if (page == pageCount) { //if page is equal to pageCount than assign active string in the active variable
        active = "current-page";
      } else { //else leave empty to the active variable
        active = "";
      }
      paginationItem += `<li class="pagination__item page-number page-control ${active}">${pageCount}</li>`;
    }

    if (page < totalPages - 1) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      paginationItem += `<li class="pagination__item page-number page-control">${page + 5}</li>`;
    }

    if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
      paginationItem += `
      <li class="pagination__item next-page page-control">
        <svg class="next-icon pagination-icon" width="16" height="16" viewBox="0 0 32 32">
          <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
        </svg>
      </li>`;
    }
    refs.paginationList.innerHTML = paginationItem;
    return paginationItem; //reurn the li tag
  }
};

refs.paginationContainer.addEventListener('click', movieGallery.onPaginationItemClick);





refs.libraryLink.addEventListener('click', onLibraryLinkClick);
refs.homeLink.addEventListener('click', onHomeLinkClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
