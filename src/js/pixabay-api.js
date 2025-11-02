import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const axiosSearchImg = async params => {
  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
