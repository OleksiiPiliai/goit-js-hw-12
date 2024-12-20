'use strict';
import { fetchImages } from './js/pixabay-api';
import { renderImages, setupImageLoadHandlers } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const container = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let lightbox = null;
let page = 1;
let totalLoaded = 0;
let totalHits = 0;

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  const { textRow } = event.target.elements;
  const searchQuery = textRow.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'The search field cannot be empty.',
      color: 'red',
    });
    return;
  }

  query = searchQuery;
  page = 1;
  totalLoaded = 0;
  container.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);

    loader.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'yellow',
      });
    } else {
      totalHits = data.totalHits;
      totalLoaded = data.hits.length;
      container.innerHTML = renderImages(data.hits);
      setupImageLoadHandlers(container);

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery .galleries a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh();
      }

      toggleLoadMoreButton();
    }
  } catch (error) {
    loader.style.display = 'none';
    console.error('Error during image fetching:', error);
  }

  form.reset();
}

async function handleLoadMore() {
  page++;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);

    loader.style.display = 'none';
    totalLoaded += data.hits.length;
    container.insertAdjacentHTML('beforeend', renderImages(data.hits));
    setupImageLoadHandlers(container);

    if (lightbox) {
      lightbox.refresh();
    }

    toggleLoadMoreButton();
    scrollPage();
  } catch (error) {
    loader.style.display = 'none';
    console.error('Помилка при завантаженні додаткових зображень:', error);
  }
}

function toggleLoadMoreButton() {
  if (totalLoaded >= totalHits || totalHits < 15) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Інформація',
      message: 'Were sorry, but youve reached the end of search results.',
    });
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function scrollPage() {
  const firstCard = container.querySelector('.galleries');
  if (firstCard) {
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}