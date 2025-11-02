import { axiosImages } from './js/pixabay-api';
import { hideLoader, renderTemplate, showLoader } from './js/render-functions';
import iziToast from 'izitoast';

const formEl = document.querySelector('.form');
const inputFieldEl = document.querySelector('.inputFild');
const btnSearchImgEl = document.querySelector('.btnSearchImg');
const btnLoadMoreEl = document.querySelector('.btnLoadMore');
const galleryEl = document.querySelector('.gallery');

btnSearchImgEl.disabled = true;

let page = 1;
let secondSearch = '';
let count = 0;
let searchImg = '';

hideLoader();

const params = {
  key: '52935594-c28acfca0b14dad36f3e3eac1',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: page,
};

inputFieldEl.addEventListener('input', event => {
  searchImg = event.target.value.trim();
  if (searchImg === '') {
    btnSearchImgEl.disabled = true;
    return;
  }
  btnSearchImgEl.disabled = false;
  params.q = searchImg;
  params.page = 1;
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  inputFieldEl.value = '';

  btnSearchImgEl.disabled = true;
  btnLoadMoreEl.classList.add('active');

  secondSearch = searchImg;
  if (searchImg === '') {
    return;
  } else if (secondSearch === searchImg) {
    galleryEl.innerHTML = '';
  }

  showLoader();

  axiosImages(params)
    .then(data => {
      if (data.totalHits === 0) {
        btnLoadMoreEl.classList.add('active');
        hideLoader();
        iziToast.show({
          position: 'topRight',
          color: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });

        return;
      }
      renderTemplate(data);
      hideLoader();
      btnLoadMoreEl.classList.remove('active');
    })
    .catch(error => {
      console.error('Failed to load images:', error);
    });
});

btnLoadMoreEl.addEventListener('click', () => {
  btnLoadMoreEl.classList.add('active');
  showLoader();
  params.page += 1;

  axiosImages(params)
    .then(data => {
      count += params.per_page;

      if (count >= data.totalHits) {
        btnLoadMoreEl.classList.add('active');
        iziToast.show({
          position: 'topRight',
          color: 'red',
          message: "We're sorry, but you've reached the end of search results.",
        });
        hideLoader();
        console.log(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      renderTemplate(data);
      btnLoadMoreEl.classList.remove('active');
      hideLoader();
      const { height } = galleryEl.getBoundingClientRect();
      window.scrollBy({
        top: height - 100,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.error('Failed to load images:', error);
    });
});
