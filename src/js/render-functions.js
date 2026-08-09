import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-btn');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images.map(createGalleryCard).join('')
  );
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}

function createGalleryCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
      </a>
      <ul class="image-stats">
        <li class="image-stat">
          <span class="image-stat-label">Likes</span>
          <span class="image-stat-value">${likes}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Views</span>
          <span class="image-stat-value">${views}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Comments</span>
          <span class="image-stat-value">${comments}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Downloads</span>
          <span class="image-stat-value">${downloads}</span>
        </li>
      </ul>
    </li>
  `;
}