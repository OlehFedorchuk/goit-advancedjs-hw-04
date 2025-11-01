import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const loaderEl = document.querySelector('.loader');

const galleryEl = document.querySelector('.gallery');
let lightbox;

export function renderTemplate(data) {
  const done = data.hits

    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
      </a>
      <ul class="description">
        <li><p>Likes</p><span>${likes}</span></li>
        <li><p>View</p><span>${views}</span></li>
        <li><p>Comments</p><span>${comments}</span></li>
        <li><p>Download</p><span>${downloads}</span></li>
      </ul>
    </li>
  `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', done);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt' });
  } else {
    lightbox.refresh();
  }
}
export function hideLoader() {
  loaderEl.style.display = 'none';
}
export function showLoader() {
  loaderEl.style.display = 'block';
}
