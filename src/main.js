import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more-btn');

let query = '';
let page = 1;
let totalImages = 0;

form.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const currentForm = event.currentTarget;
  const newQuery = currentForm.elements['search-text'].value.trim();

  if (!newQuery) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  query = newQuery;
  page = 1;
  totalImages = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalImages += data.hits.length;

    if (isEndOfCollection(data.totalHits)) {
      showEndOfCollectionMessage();
      return;
    }

    showLoadMoreButton();
  } catch {
    showRequestError();
  } finally {
    hideLoader();
    currentForm.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    totalImages += data.hits.length;
    scrollByGalleryCardHeight();

    if (isEndOfCollection(data.totalHits)) {
      showEndOfCollectionMessage();
      return;
    }

    showLoadMoreButton();
  } catch {
    page -= 1;
    showRequestError();
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

function isEndOfCollection(totalHits) {
  return totalImages >= totalHits;
}

function showEndOfCollectionMessage() {
  hideLoadMoreButton();
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

function showRequestError() {
  iziToast.error({
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}

function scrollByGalleryCardHeight() {
  const galleryCard = document.querySelector('.gallery-item');

  if (!galleryCard) {
    return;
  }

  const cardHeight = galleryCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}