import axios from 'axios';

const galleryEl = document.querySelector('.gallery');

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
