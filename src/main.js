import { axiosSearchImg } from './js/pixabay-api';
import {
  hideLoader,
  messageError,
  renderTemplate,
  showLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputFieldEl = document.querySelector('.inputFild');
const btnSearchImgEl = document.querySelector('.btnSearchImg');
const btnLoadMoreEl = document.querySelector('.btnLoadMore');
const galleryEl = document.querySelector('.gallery');

btnLoadMoreEl.hidden = true;
btnSearchImgEl.disabled = true;

hideLoader();

let page = 1;
let searchImg = '';
let totalHits = 0;

const params = {
  key: '52935594-c28acfca0b14dad36f3e3eac1',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: 1,
};

inputFieldEl.addEventListener('input', event => {
  searchImg = event.target.value.trim();
  btnSearchImgEl.disabled = searchImg === '';
});

formEl.addEventListener('submit', async event => {
  event.preventDefault();

  page = 1;
  params.page = 1;
  params.q = searchImg;
  galleryEl.innerHTML = '';
  btnSearchImgEl.disabled = true;
  btnLoadMoreEl.hidden = true;
  showLoader();

  try {
    const data = await axiosSearchImg(params);

    totalHits = Number(data?.totalHits ?? 0);

    if (!totalHits) {
      hideLoader();
      messageError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderTemplate(data);
    hideLoader();

    const hasMore =
      page * params.per_page < totalHits &&
      data.hits.length === params.per_page;
    btnLoadMoreEl.hidden = !hasMore;
  } catch (error) {
    console.error('Failed to load images:', error);
    hideLoader();
    btnLoadMoreEl.hidden = true;
  } finally {
    inputFieldEl.value = '';
    btnSearchImgEl.disabled = false;
  }
});

btnLoadMoreEl.addEventListener('click', async () => {
  btnLoadMoreEl.hidden = true;
  showLoader();

  try {
    page += 1;
    params.page = page;

    const data = await axiosSearchImg(params);

    if (!data?.hits?.length) {
      hideLoader();
      messageError(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    renderTemplate(data);
    const reachedEnd =
      page * params.per_page >= totalHits || data.hits.length < params.per_page;

    btnLoadMoreEl.hidden = reachedEnd;

    if (reachedEnd) {
      messageError(
        "We're sorry, but you've reached the end of search results."
      );
    }

    hideLoader();

    const { height } = galleryEl.getBoundingClientRect();
    window.scrollBy({ top: height - 100, behavior: 'smooth' });
  } catch (error) {
    console.error('Failed to load images:', error);
    hideLoader();
    btnLoadMoreEl.hidden = true;
  }
});
