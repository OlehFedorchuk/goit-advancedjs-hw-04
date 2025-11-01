import { axiosImages } from './js/pixabay-api';
import { hideLoader, renderTemplate, showLoader } from './js/render-functions';

const formEl = document.querySelector('.form');
const inputFieldEl = document.querySelector('.inputFild');
const btnSearchImgEl = document.querySelector('.btnSearchImg');
const btnLoadMoreEl = document.querySelector('.btnLoadMore');

btnSearchImgEl.disabled = true;
let page = 1;

hideLoader();
const params = {
  key: '52935594-c28acfca0b14dad36f3e3eac1',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 3,
  page: page,
};

let searchImg = '';
inputFieldEl.addEventListener('input', event => {
  searchImg = event.target.value.trim();
  if (searchImg === '') {
    btnSearchImgEl.disabled = true;
    return;
  }
  btnSearchImgEl.disabled = false;
  params.q = searchImg;
});
formEl.addEventListener('click', event => {
  event.preventDefault();

  if (searchImg === '') {
    btnSearchImgEl.disabled = true;
    console.log('Enetr some text!');
    return;
  }

  showLoader();
  axiosImages(params)
    .then(data => {
      console.log('Images:', data);
      renderTemplate(data);
      hideLoader();
      btnLoadMoreEl.classList.remove('active');
    })
    .catch(error => {
      console.error('Failed to load images:', error);
    });
});
btnLoadMoreEl.addEventListener('click', () => {
  params.page += 1;
  console.log('page', params.page);
  axiosImages(params)
    .then(data => {
      console.log('Images:', data);
      renderTemplate(data);
      hideLoader();
      btnLoadMoreEl.classList.remove('active');
    })
    .catch(error => {
      console.error('Failed to load images:', error);
    });
});
