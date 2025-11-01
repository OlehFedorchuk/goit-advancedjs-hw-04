import axios from 'axios';
// import { hideLoader, renderTemplate, showLoader } from './render-functions';
// import iziToast from 'izitoast';

const galleryEl = document.querySelector('.gallery');

// export function fetchImages(request) {
//   const { url, key, q, image_type, orientation, safesearch } = request;

//   return fetch(
//     `${url}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.total === 0) {
//         galleryEl.innerHTML = '';
//         iziToast.show({
//           position: 'topRight',
//           color: 'red',
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//       } else {
//         renderTemplate(data);
//
//       }
//     })
//     .catch(error => {
//       throw error;
//     })
//     .finally(() => hideLoader());
// }
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const axiosImages = async params => {
  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
